'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Shuffle, Copy, Check, ChevronRight, RefreshCw, Sparkles, Zap, Cpu, Layers, Loader2 } from 'lucide-react';
import { getPromptsByCategory, getSubCategories, Prompt } from '@/lib/data';

// 6个槽位配置
const SLOTS = [
  { key: 'quality', label: 'Quality · 画质', categoryIds: ['quality'], gradient: 'from-slate-50 to-white', border: 'border-slate-200', color: '#475569', icon: Layers },
  { key: 'style', label: 'Style · 风格', categoryIds: ['style'], gradient: 'from-indigo-50 to-white', border: 'border-indigo-200', color: '#6366f1', icon: Sparkles },
  { key: 'charType', label: 'Character · 人物', categoryIds: ['appearance'], gradient: 'from-violet-50 to-white', border: 'border-violet-200', color: '#8b5cf6', icon: Cpu },
  { key: 'clothing', label: 'Outfit · 服饰', categoryIds: ['clothing'], gradient: 'from-amber-50 to-white', border: 'border-amber-200', color: '#d97706', icon: Layers },
  { key: 'pose', label: 'Pose · 姿势', categoryIds: ['pose'], gradient: 'from-rose-50 to-white', border: 'border-rose-200', color: '#e11d48', icon: Zap },
  { key: 'expression', label: 'Mood · 表情', categoryIds: ['expression'], gradient: 'from-emerald-50 to-white', border: 'border-emerald-200', color: '#059669', icon: Sparkles },
];

interface SlotResult {
  title: string;
  prompt: string;
  promptCn?: string;
}

// 缓存机制
const promptsCache = new Map<string, Prompt[]>();
const CACHE_DURATION = 5 * 60 * 1000; // 5分钟

function getCachedPrompts(key: string): Prompt[] | null {
  const cached = promptsCache.get(key);
  if (cached && Date.now() - (cached as unknown as { timestamp: number }).timestamp < CACHE_DURATION) {
    return cached;
  }
  return null;
}

// 优化后的并行加载函数
async function loadSlotPrompts(slot: typeof SLOTS[0]): Promise<Prompt[]> {
  const cacheKey = `slot_${slot.key}`;
  const cached = getCachedPrompts(cacheKey);
  if (cached) return cached;

  let allPrompts: Prompt[] = [];

  if (slot.key === 'charType') {
    // 人物类型：获取所有子分类的经典形象
    const subCategories = await getSubCategories('appearance');
    // 并行获取所有子分类的提示词
    const results = await Promise.all(
      subCategories.map(sub => getPromptsByCategory(sub.id))
    );
    // 合并并过滤
    allPrompts = results.flat().filter(p => 
      p.title.includes('经典') && 
      p.title.includes('形象') &&
      !p.title.includes('女王')
    );
  } else if (slot.key === 'pose') {
    // 姿势：获取所有子分类，排除战斗姿势
    const subCategories = await getSubCategories(slot.categoryIds[0]);
    const nonCombatSubs = subCategories.filter(s => s.id !== 'pose-combat');
    // 并行获取所有子分类的提示词
    const results = await Promise.all(
      nonCombatSubs.map(sub => getPromptsByCategory(sub.id))
    );
    allPrompts = results.flat();
  } else {
    // 其他：获取子分类或直接获取
    const subCategories = await getSubCategories(slot.categoryIds[0]);
    if (subCategories.length > 0) {
      const results = await Promise.all(
        subCategories.map(sub => getPromptsByCategory(sub.id))
      );
      allPrompts = results.flat();
    } else {
      allPrompts = await getPromptsByCategory(slot.categoryIds[0]);
    }
  }

  // 存入缓存
  promptsCache.set(cacheKey, allPrompts);
  return allPrompts;
}

// 骨架屏
function SlotSkeleton({ index }: { index: number }) {
  return (
    <div className="w-[140px] h-[100px] rounded-lg border border-slate-200 bg-slate-50 p-3 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer" />
      <div className="flex items-center justify-between mb-3">
        <div className="h-2.5 w-16 bg-slate-200 rounded animate-pulse" />
      </div>
      <div className="space-y-2">
        <div className="h-3.5 bg-slate-200 rounded w-full animate-pulse" />
        <div className="h-2.5 bg-slate-200 rounded w-4/5 animate-pulse" />
        <div className="h-2.5 bg-slate-200 rounded w-3/5 animate-pulse" />
      </div>
    </div>
  );
}

// 加载动画
function LoadingState({ progress }: { progress: number }) {
  return (
    <div className="flex flex-col items-center gap-4 py-6">
      <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
      <div className="text-center">
        <div className="text-sm font-medium text-slate-600 mb-1">正在加载提示词...</div>
        <div className="text-xl font-semibold text-slate-800 tabular-nums">{progress}%</div>
      </div>
      <div className="w-64 h-2 bg-slate-100 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export default function PromptRandomizer() {
  const [promptsMap, setPromptsMap] = useState<Record<string, Prompt[]>>({});
  const [slots, setSlots] = useState<Record<string, SlotResult>>({});
  const [loading, setLoading] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [initialized, setInitialized] = useState(false);
  const [copied, setCopied] = useState(false);
  const [spinningSlots, setSpinningSlots] = useState<Set<string>>(new Set());
  const [showSuccess, setShowSuccess] = useState(false);
  const [revealIndex, setRevealIndex] = useState(-1);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [activeSlotIndex, setActiveSlotIndex] = useState(-1);
  const loadPromiseRef = useRef<Promise<Record<string, Prompt[]>> | null>(null);

  // CSS动画
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes shimmer {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(200%); }
      }
      @keyframes pop {
        0% { transform: scale(0.95); opacity: 0; }
        100% { transform: scale(1); opacity: 1; }
      }
      .animate-shimmer {
        animation: shimmer 1.5s infinite;
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  // 优化后的并行加载
  const loadAllPrompts = useCallback(async (): Promise<Record<string, Prompt[]>> => {
    if (loadPromiseRef.current) {
      return loadPromiseRef.current;
    }

    loadPromiseRef.current = (async () => {
      setLoading(true);
      setLoadProgress(0);
      const map: Record<string, Prompt[]> = {};

      // 并行加载所有槽位的数据
      const loadPromises = SLOTS.map(async (slot, index) => {
        setActiveSlotIndex(index);
        setLoadProgress(Math.floor((index / SLOTS.length) * 80)); // 显示进度
        
        const prompts = await loadSlotPrompts(slot);
        return { slot, prompts };
      });

      // 等待所有槽位加载完成
      const results = await Promise.all(loadPromises);
      
      // 构建结果映射
      for (const { slot, prompts } of results) {
        map[slot.key] = prompts;
      }

      setLoadProgress(100);
      setPromptsMap(map);
      setLoading(false);
      setInitialized(true);
      setActiveSlotIndex(-1);
      
      return map;
    })();

    return loadPromiseRef.current;
  }, []);

  // 填充随机结果
  const fillSlotsFromMap = useCallback((map: Record<string, Prompt[]>) => {
    const allKeys = SLOTS.map(s => s.key);
    setSpinningSlots(new Set(allKeys));
    setRevealIndex(-1);

    SLOTS.forEach((slot, index) => {
      const prompts = map[slot.key];
      if (prompts && prompts.length > 0) {
        const shuffleCount = isFirstLoad ? 5 : 2;
        const shuffleInterval = isFirstLoad ? 50 : 80;
        const baseDelay = index * (isFirstLoad ? 200 : 100);

        for (let i = 0; i < shuffleCount; i++) {
          setTimeout(() => {
            const randomPick = prompts[Math.floor(Math.random() * prompts.length)];
            setSlots(prev => ({
              ...prev,
              [slot.key]: {
                title: randomPick.title,
                prompt: randomPick.prompt,
                promptCn: randomPick.promptCn,
              },
            }));
          }, baseDelay + i * shuffleInterval);
        }

        setTimeout(() => {
          const picked = prompts[Math.floor(Math.random() * prompts.length)];
          setSlots(prev => ({
            ...prev,
            [slot.key]: {
              title: picked.title,
              prompt: picked.prompt,
              promptCn: picked.promptCn,
            },
          }));
          setSpinningSlots(prev => {
            const next = new Set(prev);
            next.delete(slot.key);
            return next;
          });
          setRevealIndex(index);
        }, baseDelay + shuffleCount * shuffleInterval + 80);
      }
    });

    const totalTime = SLOTS.length * (isFirstLoad ? 200 : 100) + (isFirstLoad ? 5 : 2) * (isFirstLoad ? 50 : 80) + 150;
    setTimeout(() => {
      setShowSuccess(true);
      setIsFirstLoad(false);
      setTimeout(() => {
        setShowSuccess(false);
        setRevealIndex(-1);
      }, 1200);
    }, totalTime);
  }, [isFirstLoad]);

  // 随机选一个
  const pickRandom = useCallback((key: string) => {
    const prompts = promptsMap[key];
    if (!prompts || prompts.length === 0) return;

    setSpinningSlots(prev => new Set(prev).add(key));

    for (let i = 0; i < 2; i++) {
      setTimeout(() => {
        const randomPick = prompts[Math.floor(Math.random() * prompts.length)];
        setSlots(prev => ({
          ...prev,
          [key]: {
            title: randomPick.title,
            prompt: randomPick.prompt,
            promptCn: randomPick.promptCn,
          },
        }));
      }, i * 60);
    }

    setTimeout(() => {
      const picked = prompts[Math.floor(Math.random() * prompts.length)];
      setSlots(prev => ({
        ...prev,
        [key]: {
          title: picked.title,
          prompt: picked.prompt,
          promptCn: picked.promptCn,
        },
      }));
      setSpinningSlots(prev => {
        const next = new Set(prev);
        next.delete(key);
        return next;
      });
    }, 2 * 60 + 60);
  }, [promptsMap]);

  // 全部随机
  const randomizeAll = useCallback(async () => {
    if (!initialized) {
      const map = await loadAllPrompts();
      fillSlotsFromMap(map);
    } else {
      fillSlotsFromMap(promptsMap);
    }
  }, [loadAllPrompts, fillSlotsFromMap, initialized, promptsMap]);

  // 复制
  const copyCombined = () => {
    const parts = SLOTS.map(slot => slots[slot.key]?.prompt).filter(Boolean);
    const combined = parts.join(', ');
    navigator.clipboard.writeText(combined);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-12 border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-6">
        {/* 标题栏 */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Prompt Mixer · 提示词混合器</h2>
            <p className="text-sm text-slate-500 mt-1">随机组合不同类别的提示词</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={randomizeAll}
              disabled={loading}
              className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                loading
                  ? 'bg-slate-700 text-white cursor-wait'
                  : 'bg-slate-900 text-white hover:bg-slate-800 active:scale-[0.98]'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  加载中...
                </>
              ) : (
                <>
                  <Shuffle className="w-4 h-4" />
                  全部随机
                </>
              )}
            </button>
            <button
              onClick={copyCombined}
              disabled={!initialized}
              className={`flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : initialized
                    ? 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 active:scale-[0.98]'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? '已复制!' : '复制全部'}
            </button>
          </div>
        </div>

        {/* 加载状态 - 显示进度 */}
        {loading && (
          <>
            <div className="flex items-center justify-center gap-3 overflow-x-auto pb-4">
              {SLOTS.map((slot, index) => (
                <div key={index} className="flex items-center gap-2 flex-shrink-0">
                  <SlotSkeleton index={index} />
                  {index < SLOTS.length - 1 && (
                    <ChevronRight className={`w-5 h-5 ${activeSlotIndex > index ? 'text-indigo-400' : 'text-slate-300'}`} />
                  )}
                </div>
              ))}
            </div>
            <LoadingState progress={loadProgress} />
          </>
        )}

        {/* 槽位 */}
        {!loading && (
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4">
            {SLOTS.map((slot, index) => {
              const isSpinning = spinningSlots.has(slot.key);
              const hasResult = !!slots[slot.key];
              const isRevealed = revealIndex === index;

              return (
                <div key={slot.key} className="flex items-center gap-2 flex-shrink-0">
                  <div
                    className={`relative w-[150px] rounded-lg border p-4 transition-all duration-200 bg-gradient-to-br ${slot.gradient} ${
                      isSpinning
                        ? 'scale-[0.97] opacity-60 border-slate-300'
                        : hasResult
                          ? 'opacity-100 scale-100 shadow-sm border-slate-200'
                          : 'opacity-80 scale-100 border-slate-200'
                    } ${isRevealed ? 'animate-[pop_0.3s_ease-out]' : ''} ${
                      showSuccess && hasResult 
                        ? 'ring-2 ring-indigo-400 ring-offset-1' 
                        : ''
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3 relative z-10">
                      <span 
                        className="text-[11px] font-semibold uppercase tracking-wide"
                        style={{ color: slot.color }}
                      >
                        {slot.label}
                      </span>
                      {initialized && (
                        <button
                          onClick={() => pickRandom(slot.key)}
                          disabled={isSpinning}
                          className={`w-6 h-6 flex items-center justify-center rounded-md transition-all duration-150 ${
                            isSpinning 
                              ? 'opacity-30' 
                              : 'opacity-60 hover:opacity-100 hover:bg-white/80'
                          }`}
                        >
                          <RefreshCw className={`w-3.5 h-3.5 text-slate-500 ${isSpinning ? 'animate-spin' : ''}`} />
                        </button>
                      )}
                    </div>

                    {hasResult ? (
                      <div className={`space-y-1 relative z-10 transition-all duration-150 ${
                        isSpinning ? 'opacity-30' : 'opacity-100'
                      }`}>
                        <p className="text-sm font-semibold text-slate-800 leading-tight truncate">
                          {slots[slot.key].title}
                        </p>
                        <p className="text-xs text-slate-500 leading-snug line-clamp-2">
                          {slots[slot.key].prompt}
                        </p>
                      </div>
                    ) : (
                      <div className="h-12 flex items-center justify-center relative z-10">
                        <span className="text-xs text-slate-300 font-medium">点击开始</span>
                      </div>
                    )}
                  </div>

                  {index < SLOTS.length - 1 && (
                    <ChevronRight className={`w-5 h-5 flex-shrink-0 ${
                      isRevealed ? 'text-indigo-400' : 'text-slate-200'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* 组合预览 */}
        {initialized && (
          <div className={`mt-5 p-4 bg-slate-50 border border-slate-200 rounded-lg transition-all duration-300 ${
            showSuccess ? 'border-indigo-300 shadow-sm' : ''
          }`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-md transition-all duration-200 ${
                  showSuccess ? 'bg-indigo-600' : 'bg-slate-200'
                }`}>
                  <Sparkles className={`w-4 h-4 ${showSuccess ? 'text-white' : 'text-slate-500'}`} />
                </div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Combined · 组合结果</span>
              </div>
              <button
                onClick={copyCombined}
                className="text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors px-3 py-1.5 rounded-md hover:bg-white border border-transparent hover:border-slate-200"
              >
                {copied ? '已复制!' : '复制'}
              </button>
            </div>
            <p className="text-xs text-slate-600 font-mono leading-relaxed break-all bg-white p-3 rounded border border-slate-100">
              {SLOTS.map(slot => slots[slot.key]?.prompt).filter(Boolean).join(', ')}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
