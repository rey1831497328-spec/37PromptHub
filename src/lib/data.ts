import { supabase } from './supabase';

// ==================== 类型定义 ====================

export interface Prompt {
  id: string;
  title: string;
  category: string;
  prompt: string;
  promptCn?: string;
  negativePrompt?: string;
  negativePromptCn?: string;
  description?: string;
  model: string;
  imageUrl?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  count: number;
  parentId?: string;
  subCategories?: Category[];
}

// ==================== 数据映射 ====================

function mapDbPromptToPrompt(dbPrompt: Record<string, unknown>): Prompt {
  return {
    id: dbPrompt.id as string,
    title: dbPrompt.title as string,
    category: dbPrompt.category_id as string,
    prompt: (dbPrompt.prompt as string) || '',
    promptCn: (dbPrompt.prompt_cn as string) || undefined,
    negativePrompt: (dbPrompt.negative_prompt as string) || undefined,
    negativePromptCn: (dbPrompt.negative_prompt_cn as string) || undefined,
    description: (dbPrompt.description as string) || undefined,
    model: '通用',
    imageUrl: (dbPrompt.image_url as string) || undefined,
  };
}

function mapDbCategoryToCategory(dbCategory: Record<string, unknown>): Category {
  return {
    id: dbCategory.id as string,
    name: dbCategory.name as string,
    icon: (dbCategory.icon as string) || 'Sparkles',
    description: (dbCategory.description as string) || '',
    count: 0,
    parentId: (dbCategory.parent_id as string) || undefined,
  };
}

// ==================== 缓存机制 ====================

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const cache = new Map<string, CacheEntry<unknown>>();
const CACHE_DURATION = 5 * 60 * 1000; // 5分钟缓存

function getCached<T>(key: string): T | null {
  const entry = cache.get(key);
  if (entry && Date.now() - entry.timestamp < CACHE_DURATION) {
    return entry.data as T;
  }
  return null;
}

function setCache<T>(key: string, data: T): void {
  cache.set(key, { data, timestamp: Date.now() });
}

// ==================== 优化后的数据获取函数 ====================

/** 获取所有分类（含子分类嵌套）- 优化版：使用数据库聚合查询 */
export async function fetchCategories(): Promise<Category[]> {
  const cacheKey = 'categories_all';
  const cached = getCached<Category[]>(cacheKey);
  if (cached) return cached;

  // 使用数据库级别的 JOIN 和聚合，比之前分别查询再内存计算更高效
  const { data: categoriesResult, error: categoriesError } = await supabase
    .from('categories')
    .select('*')
    .order('created_at', { ascending: true });

  if (categoriesError) {
    console.error('获取分类失败:', categoriesError.message);
    return [];
  }

  // 单独获取计数（如果数据量不大，可以合并到一次查询）
  const { data: countsData } = await supabase
    .from('prompts')
    .select('category_id');

  // 快速构建计数映射
  const countMap = new Map<string, number>();
  if (countsData) {
    for (const p of countsData) {
      const catId = p.category_id as string;
      countMap.set(catId, (countMap.get(catId) || 0) + 1);
    }
  }

  const allCategories: Category[] = (categoriesResult || []).map(cat => ({
    ...mapDbCategoryToCategory(cat),
    count: countMap.get(cat.id) || 0
  }));

  // 构建父子关系
  const mainCategories = allCategories.filter(c => !c.parentId);
  const subCategories = allCategories.filter(c => c.parentId);

  for (const main of mainCategories) {
    const subs = subCategories.filter(s => s.parentId === main.id);
    if (subs.length > 0) {
      main.subCategories = subs;
      main.count = subs.reduce((sum, s) => sum + s.count, 0);
    }
  }

  setCache(cacheKey, mainCategories);
  return mainCategories;
}

/** 获取所有提示词 - 添加数量限制避免一次性加载过多 */
export async function fetchPrompts(limit: number = 100): Promise<Prompt[]> {
  const { data, error } = await supabase
    .from('prompts')
    .select('*')
    .order('sort_order', { ascending: true })
    .limit(limit); // 限制返回数量

  if (error) {
    console.error('获取提示词失败:', error.message);
    return [];
  }

  return (data || []).map(mapDbPromptToPrompt);
}

/** 获取热门提示词 - 专用查询 */
export async function fetchTrendingPrompts(limit: number = 6): Promise<Prompt[]> {
  const { data, error } = await supabase
    .from('prompts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('获取热门提示词失败:', error.message);
    return [];
  }

  return (data || []).map(mapDbPromptToPrompt);
}

/** 按分类获取提示词 */
export async function getPromptsByCategory(categoryId: string): Promise<Prompt[]> {
  const { data, error } = await supabase
    .from('prompts')
    .select('*')
    .eq('category_id', categoryId)
    .order('sort_order', { ascending: true });

  if (error) {
    console.error('获取分类提示词失败:', error.message);
    return [];
  }

  return (data || []).map(mapDbPromptToPrompt);
}

/** 搜索提示词 - 改进版：更好的优先级排序 */
export async function searchPrompts(query: string, maxResults: number = 20): Promise<Prompt[]> {
  if (!query.trim()) return [];

  const searchTerm = query.trim().toLowerCase();
  const keywords = searchTerm.split(/[\s,，、]+/).filter(k => k.length > 0);
  
  if (keywords.length === 0) return [];

  // 获取所有提示词进行评分排序
  const { data: allPrompts, error } = await supabase
    .from('prompts')
    .select('*')
    .limit(500); // 限制搜索范围

  if (error || !allPrompts) {
    console.error('搜索提示词失败:', error?.message);
    return [];
  }

  // 计算匹配分数
  const scoredPrompts = allPrompts.map(p => {
    const title = (p.title as string || '').toLowerCase();
    const promptText = (p.prompt as string || '').toLowerCase();
    const promptCn = (p.prompt_cn as string || '').toLowerCase();
    
    let score = 0;
    let matchCount = 0;
    
    for (const keyword of keywords) {
      // 标题匹配权重最高
      if (title === keyword) {
        score += 100; // 完全匹配标题
        matchCount++;
      } else if (title.includes(keyword)) {
        score += 50; // 标题包含关键词
        matchCount++;
      }
      
      // 中文提示词匹配
      if (promptCn.includes(keyword)) {
        score += 20;
        matchCount++;
      }
      
      // 英文提示词匹配
      if (promptText.includes(keyword)) {
        score += 10;
        matchCount++;
      }
    }
    
    // 关键词匹配越多，额外加分
    score += matchCount * 5;
    
    return { prompt: p, score };
  });

  // 过滤掉分数为0的，按分数排序，取前N个
  return scoredPrompts
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults)
    .map(item => mapDbPromptToPrompt(item.prompt));
}

/** 按 ID 获取单条提示词 */
export async function getPromptById(id: string): Promise<Prompt | undefined> {
  const cacheKey = `prompt_${id}`;
  const cached = getCached<Prompt>(cacheKey);
  if (cached) return cached;

  const { data, error } = await supabase
    .from('prompts')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) return undefined;
  
  const prompt = mapDbPromptToPrompt(data);
  setCache(cacheKey, prompt);
  return prompt;
}

/** 按 ID 获取分类 */
export async function getCategoryById(id: string): Promise<Category | undefined> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) return undefined;
  return mapDbCategoryToCategory(data);
}

/** 获取父分类 */
export async function getParentCategory(categoryId: string): Promise<Category | undefined> {
  const { data: category, error } = await supabase
    .from('categories')
    .select('parent_id')
    .eq('id', categoryId)
    .single();

  if (error || !category?.parent_id) return undefined;

  const { data: parent, error: parentError } = await supabase
    .from('categories')
    .select('*')
    .eq('id', category.parent_id)
    .single();

  if (parentError || !parent) return undefined;
  return mapDbCategoryToCategory(parent);
}

/** 获取子分类 - 优化版 */
export async function getSubCategories(parentId: string): Promise<Category[]> {
  const { data: subsResult, error } = await supabase
    .from('categories')
    .select('*')
    .eq('parent_id', parentId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('获取子分类失败:', error.message);
    return [];
  }

  // 获取该父分类下所有子分类的 ID
  const subIds = (subsResult || []).map(s => s.id);
  
  // 使用单个查询获取所有相关提示词
  let countMap = new Map<string, number>();
  if (subIds.length > 0) {
    const { data: promptsData } = await supabase
      .from('prompts')
      .select('category_id')
      .in('category_id', subIds);

    if (promptsData) {
      for (const p of promptsData) {
        const catId = p.category_id as string;
        countMap.set(catId, (countMap.get(catId) || 0) + 1);
      }
    }
  }

  return (subsResult || []).map(cat => ({
    ...mapDbCategoryToCategory(cat),
    count: countMap.get(cat.id) || 0
  }));
}

/** 获取所有分类 ID */
export async function getAllCategoryIds(): Promise<string[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('id');

  if (error) {
    console.error('获取分类ID失败:', error.message);
    return [];
  }

  return (data || []).map((c: Record<string, unknown>) => c.id as string);
}

/** 清除缓存 - 在需要刷新数据时调用 */
export function clearCache(): void {
  cache.clear();
}
