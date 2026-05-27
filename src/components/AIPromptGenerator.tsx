'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Sparkles, Wand2, Eye, Loader2, Copy, Check, Upload, X, ChevronDown, ChevronRight, RotateCcw, AlertCircle } from 'lucide-react';
import { generatePrompt, optimizePrompt, analyzeImage, isAIConfigured } from '@/lib/ai';

interface AIPromptGeneratorProps {
  onGenerated?: (prompt: {
    title: string;
    prompt: string;
    promptCn?: string;
    negativePrompt?: string;
    negativePromptCn?: string;
    description?: string;
  }) => void;
}

export default function AIPromptGenerator({ onGenerated }: AIPromptGeneratorProps) {
  const [mode, setMode] = useState<'generate' | 'optimize' | 'analyze'>('generate');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    title?: string;
    prompt?: string;
    promptCn?: string;
    negativePrompt?: string;
    negativePromptCn?: string;
    description?: string;
    suggestions?: string[];
    optimizedPrompt?: string;
    optimizedPromptCn?: string;
  } | null>(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [analyzeResult, setAnalyzeResult] = useState<Record<string, unknown> | null>(null);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const progressTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const configured = isAIConfigured();

  // 模拟进度条
  const startProgress = useCallback(() => {
    setProgress(0);
    setProgressText('正在连接AI服务...');
    let current = 0;
    const stages = [
      { at: 10, text: '正在上传图片...' },
      { at: 25, text: 'AI正在分析图像...' },
      { at: 45, text: '正在解析构图与光影...' },
      { at: 60, text: '正在分析色彩与风格...' },
      { at: 75, text: '正在生成提示词...' },
      { at: 88, text: '正在整理分析结果...' },
    ];
    let stageIndex = 0;

    progressTimerRef.current = setInterval(() => {
      // 随机递增，越靠后越慢
      const increment = Math.random() * (current < 60 ? 3 : 1.2);
      current = Math.min(current + increment, 95);
      setProgress(Math.round(current));

      while (stageIndex < stages.length && current >= stages[stageIndex].at) {
        setProgressText(stages[stageIndex].text);
        stageIndex++;
      }
    }, 500);
  }, []);

  const stopProgress = useCallback((success: boolean) => {
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current);
      progressTimerRef.current = null;
    }
    if (success) {
      setProgress(100);
      setProgressText('分析完成');
    }
  }, []);

  // 组件卸载时清理定时器
  useEffect(() => {
    return () => {
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
      }
    };
  }, []);

  const handleSubmit = async () => {
    if (mode === 'analyze') {
      if (!imageBase64) return;
    } else {
      if (!input.trim()) return;
    }

    setLoading(true);
    setError('');
    setResult(null);
    setAnalyzeResult(null);

    // 识图模式启动进度条
    if (mode === 'analyze') {
      startProgress();
    }

    try {
      if (mode === 'generate') {
        const response = await generatePrompt({ description: input });
        if (response.success) {
          setResult({
            title: response.title,
            prompt: response.prompt,
            promptCn: response.promptCn,
            negativePrompt: response.negativePrompt,
            negativePromptCn: response.negativePromptCn,
            description: response.description,
          });
          onGenerated?.({
            title: response.title,
            prompt: response.prompt,
            promptCn: response.promptCn,
            negativePrompt: response.negativePrompt,
            negativePromptCn: response.negativePromptCn,
            description: response.description,
          });
        } else {
          setError(response.error || '生成失败');
        }
      } else if (mode === 'optimize') {
        const response = await optimizePrompt({ prompt: input });
        if (response.success) {
          setResult({
            optimizedPrompt: response.optimizedPrompt,
            optimizedPromptCn: response.optimizedPromptCn,
            suggestions: response.suggestions,
          });
        } else {
          setError(response.error || '优化失败');
        }
      } else if (mode === 'analyze') {
        const response = await analyzeImage(imageBase64!);
        if (response.success) {
          stopProgress(true);
          setAnalyzeResult(response.analysis);
          // 如果分析结果包含正向/反向提示词，也设置到result中
          const analysis = response.analysis as Record<string, unknown>;
          if (analysis['正向提示词']) {
            setResult({
              prompt: analysis['正向提示词'] as string,
              negativePrompt: (analysis['反向提示词'] as string) || undefined,
            });
          }
          // 默认展开所有section
          setExpandedSections(new Set(Object.keys(analysis)));
        } else {
          stopProgress(false);
          // 检查是否有 rawContent
          const errorMsg = (response as { error?: string; rawContent?: string }).error || '分析失败';
          const rawContent = (response as { rawContent?: string }).rawContent;
          if (rawContent) {
            setError(`${errorMsg}\n\n原始返回内容:\n${rawContent}`);
          } else {
            setError(errorMsg);
          }
        }
      }
    } catch (err) {
      if (mode === 'analyze') stopProgress(false);
      setError(err instanceof Error ? err.message : '发生错误');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(''), 2000);
  };

  // 压缩图片到指定最大宽度
  const compressImage = (file: File, maxWidth: number = 1024): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };

      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        // 等比例缩放
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('无法创建 canvas context'));
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);

        // 压缩为 JPEG，质量 0.8
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.8);
        resolve(compressedDataUrl);
      };

      img.onerror = () => reject(new Error('图片加载失败'));
      reader.readAsDataURL(file);
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('请上传图片文件');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('图片大小不能超过10MB');
      return;
    }

    setError('');
    setLoading(true);

    try {
      // 压缩图片到最大 1024px 宽度
      const compressedDataUrl = await compressImage(file, 1024);
      setImagePreview(compressedDataUrl);
      setImageBase64(compressedDataUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : '图片处理失败');
    } finally {
      setLoading(false);
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageBase64(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => {
      const next = new Set(prev);
      if (next.has(section)) {
        next.delete(section);
      } else {
        next.add(section);
      }
      return next;
    });
  };

  const renderValue = (value: unknown): string => {
    if (typeof value === 'string') return value;
    if (Array.isArray(value)) return value.join('、');
    if (typeof value === 'object' && value !== null) {
      return Object.entries(value as Record<string, unknown>)
        .map(([k, v]) => `${k}：${renderValue(v)}`)
        .join('\n');
    }
    return String(value);
  };

  const isObject = (value: unknown): value is Record<string, unknown> => {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
  };

  const sectionIcons: Record<string, string> = {};

  if (!configured) {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
        <div className="flex items-center gap-3 text-amber-800">
          <Sparkles className="w-5 h-5" />
          <p className="text-sm">
            AI功能未配置。请在环境变量中设置 <code className="bg-amber-100 px-2 py-1 rounded">NEXT_PUBLIC_BAZAARLINK_API_KEY</code>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      {/* 头部 */}
      <div className="bg-gradient-to-r from-gray-700 to-gray-900 px-6 py-4">
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-white" />
          <h3 className="text-lg font-semibold text-white">AI 提示词助手</h3>
        </div>
        <p className="text-gray-300 text-sm mt-1">
          智能生成、优化或识图分析你的AI绘图提示词
        </p>
      </div>

      {/* 模式切换 */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setMode('analyze')}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
            mode === 'analyze'
              ? 'text-gray-800 border-b-2 border-gray-800 bg-gray-50'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <Eye className="w-4 h-4" />
            图片提示词反推
          </div>
        </button>
        <button
          onClick={() => setMode('generate')}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
            mode === 'generate'
              ? 'text-gray-800 border-b-2 border-gray-800 bg-gray-50'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4" />
            提示词智能生成
          </div>
        </button>
        <button
          onClick={() => setMode('optimize')}
          className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
            mode === 'optimize'
              ? 'text-gray-800 border-b-2 border-gray-800 bg-gray-50'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <div className="flex items-center justify-center gap-2">
            <Wand2 className="w-4 h-4" />
            提示词优化扩写
          </div>
        </button>
      </div>

      {/* 输入区域 */}
      <div className="p-6 space-y-4">
        {mode === 'analyze' ? (
          /* 识图模式 - 图片上传 */
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              上传图片进行深度分析
            </label>
            {!imagePreview ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-colors"
              >
                <Upload className="w-10 h-10 text-gray-400 mb-3" />
                <p className="text-sm text-gray-500">点击或拖拽上传图片</p>
                <p className="text-xs text-gray-400 mt-1">支持 JPG、PNG、WebP，最大 10MB</p>
              </div>
            ) : (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="上传的图片"
                  className="w-full max-h-64 object-contain rounded-lg border border-gray-200 bg-gray-50"
                />
                <button
                  onClick={removeImage}
                  className="absolute top-2 right-2 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>
        ) : (
          /* 生成/优化模式 - 文本输入 */
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {mode === 'generate' ? '描述你想要的图像' : '输入你的提示词'}
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                mode === 'generate'
                  ? '例如：一个穿着汉服的女孩在樱花树下，古风唯美风格...'
                  : '例如：a girl, beautiful, standing...'
              }
              className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 resize-none text-sm"
            />
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={
            loading ||
            (mode === 'analyze' ? !imageBase64 : !input.trim())
          }
          className="w-full py-3 px-4 bg-gray-800 hover:bg-gray-900 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {mode === 'analyze' ? 'AI分析中，请耐心等待...' : mode === 'generate' ? '生成中...' : '优化中...'}
            </>
          ) : (
            <>
              {mode === 'analyze' ? <Eye className="w-4 h-4" /> : mode === 'generate' ? <Sparkles className="w-4 h-4" /> : <Wand2 className="w-4 h-4" />}
              {mode === 'analyze' ? '开始识图分析' : mode === 'generate' ? '生成提示词' : '优化提示词'}
            </>
          )}
        </button>

        {/* 进度条 - 仅在识图加载时显示 */}
        {loading && mode === 'analyze' && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">{progressText}</span>
              <span className="text-xs text-gray-400">{progress}%</span>
            </div>
            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-gray-400 to-gray-700 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-red-800">分析遇到问题</p>
                <pre className="text-xs text-red-600 whitespace-pre-wrap font-sans mt-1">{error}</pre>
                <p className="text-xs text-red-400 mt-2">
                  提示：AI模型偶尔不稳定，如遇报错请重试。
                </p>
              </div>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-700 bg-red-100 hover:bg-red-200 rounded-lg transition-colors disabled:opacity-50"
              >
                <RotateCcw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                重试
              </button>
            </div>
          </div>
        )}

        {/* 识图分析结果 */}
        {mode === 'analyze' && analyzeResult && (
          <div className="space-y-3 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-gray-900">图像深度分析结果</h4>
              <button
                onClick={() => copyToClipboard(JSON.stringify(analyzeResult, null, 2), 'json')}
                className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800"
              >
                {copied === 'json' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied === 'json' ? '已复制' : '复制JSON'}
              </button>
            </div>

            {/* 提示词区域（如果有的话） */}
            {((analyzeResult['正向提示词'] as string | undefined) || (analyzeResult['反向提示词'] as string | undefined)) && (
              <div className="space-y-3">
                {(analyzeResult['正向提示词'] as string | undefined) && (
                  <div>
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-medium text-gray-500 uppercase">正向提示词（英文）</label>
                      <button
                        onClick={() => copyToClipboard(analyzeResult['正向提示词'] as string, 'pos')}
                        className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700"
                      >
                        {copied === 'pos' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        {copied === 'pos' ? '已复制' : '复制'}
                      </button>
                    </div>
                    <div className="mt-1 p-3 bg-gray-50 rounded-lg text-sm text-gray-800 font-mono break-all">
                      {analyzeResult['正向提示词'] as string}
                    </div>
                  </div>
                )}
                {(analyzeResult['反向提示词'] as string | undefined) && (
                  <div>
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-medium text-gray-500 uppercase">反向提示词（英文）</label>
                      <button
                        onClick={() => copyToClipboard(analyzeResult['反向提示词'] as string, 'neg')}
                        className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700"
                      >
                        {copied === 'neg' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        {copied === 'neg' ? '已复制' : '复制'}
                      </button>
                    </div>
                    <div className="mt-1 p-3 bg-gray-100 rounded-lg text-sm text-gray-800 font-mono break-all">
                      {analyzeResult['反向提示词'] as string}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 11维度分析详情 - 可折叠手风琴 */}
            <div className="border border-gray-200 rounded-lg overflow-hidden divide-y divide-gray-200">
              {Object.entries(analyzeResult)
                .filter(([key]) => key !== '正向提示词' && key !== '反向提示词')
                .map(([sectionKey, sectionValue]) => {
                  const isExpanded = expandedSections.has(sectionKey);
                  const hasSubItems = isObject(sectionValue);
                  return (
                    <div key={sectionKey}>
                      <button
                        onClick={() => toggleSection(sectionKey)}
                        className="w-full px-4 py-3 flex items-center gap-2 text-left hover:bg-gray-50 transition-colors"
                      >
                        {hasSubItems && (
                          isExpanded
                            ? <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            : <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        )}
                        <span className="text-sm font-medium text-gray-800">{sectionKey}</span>
                      </button>
                      {isExpanded && hasSubItems && (
                        <div className="px-4 pb-3 pl-12 space-y-2">
                          {Object.entries(sectionValue).map(([key, value]) => (
                            <div key={key} className="text-sm">
                              <span className="text-gray-500">{key}：</span>
                              <span className="text-gray-800">
                                {Array.isArray(value) ? (
                                  <span className="inline-flex flex-wrap gap-1 mt-0.5">
                                    {value.map((item, i) => (
                                      <span key={i} className="inline-block px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-700">
                                        {String(item)}
                                      </span>
                                    ))}
                                  </span>
                                ) : (
                                  renderValue(value)
                                )}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                      {isExpanded && !hasSubItems && (
                        <div className="px-4 pb-3 pl-12">
                          <p className="text-sm text-gray-800">{renderValue(sectionValue)}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* 生成结果 */}
        {mode === 'generate' && result?.title && (
          <div className="space-y-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-gray-900">{result.title}</h4>
              <button
                onClick={() => copyToClipboard(result.prompt || '', 'gen')}
                className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800"
              >
                {copied === 'gen' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied === 'gen' ? '已复制' : '复制'}
              </button>
            </div>

            {result.description && (
              <p className="text-sm text-gray-600">{result.description}</p>
            )}

            <div className="space-y-3">
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase">正向提示词（英文）</label>
                <div className="mt-1 p-3 bg-gray-50 rounded-lg text-sm text-gray-800 font-mono break-all">
                  {result.prompt}
                </div>
              </div>

              {result.promptCn && (
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase">正向提示词（中文）</label>
                  <div className="mt-1 p-3 bg-gray-50 rounded-lg text-sm text-gray-800">
                    {result.promptCn}
                  </div>
                </div>
              )}

              {result.negativePrompt && (
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase">反向提示词（英文）</label>
                  <div className="mt-1 p-3 bg-gray-100 rounded-lg text-sm text-gray-800 font-mono break-all">
                    {result.negativePrompt}
                  </div>
                </div>
              )}

              {result.negativePromptCn && (
                <div>
                  <label className="text-xs font-medium text-gray-500 uppercase">反向提示词（中文）</label>
                  <div className="mt-1 p-3 bg-gray-100 rounded-lg text-sm text-gray-800">
                    {result.negativePromptCn}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 优化结果 */}
        {mode === 'optimize' && result?.optimizedPrompt && (
          <div className="space-y-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-gray-900">优化结果</h4>
              <button
                onClick={() => copyToClipboard(result.optimizedPrompt || '', 'opt')}
                className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800"
              >
                {copied === 'opt' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied === 'opt' ? '已复制' : '复制'}
              </button>
            </div>

            <div>
              <label className="text-xs font-medium text-gray-500 uppercase">优化后的提示词（英文）</label>
              <div className="mt-1 p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800 font-mono break-all">
                {result.optimizedPrompt}
              </div>
            </div>

            {result.optimizedPromptCn && (
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase">优化后的提示词（中文）</label>
                <div className="mt-1 p-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-800">
                  {result.optimizedPromptCn}
                </div>
              </div>
            )}

            {result.suggestions && result.suggestions.length > 0 && (
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase">优化建议</label>
                <ul className="mt-2 space-y-2">
                  {result.suggestions.map((suggestion, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="flex-shrink-0 w-5 h-5 bg-gray-200 text-gray-700 rounded-full flex items-center justify-center text-xs font-medium">
                        {index + 1}
                      </span>
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
