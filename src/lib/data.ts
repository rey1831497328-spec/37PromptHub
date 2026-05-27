import { supabase } from './supabase';

// ==================== 类型定义（保持与原接口兼容） ====================

export interface Prompt {
  id: string;
  title: string;
  category: string;        // 映射自 category_id
  prompt: string;          // 英文正向提示词
  promptCn?: string;       // 映射自 prompt_cn
  negativePrompt?: string; // 映射自 negative_prompt
  negativePromptCn?: string; // 映射自 negative_prompt_cn
  description?: string;
  model: string;           // 默认 "通用"
  imageUrl?: string;       // 映射自 image_url（新增）
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  count: number;           // 动态计算
  parentId?: string;       // 映射自 parent_id
  subCategories?: Category[];
}

// ==================== Supabase 数据映射 ====================

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

// ==================== 数据获取函数 ====================

/** 获取所有分类（含子分类嵌套）- 优化版 */
export async function fetchCategories(): Promise<Category[]> {
  // 并行获取分类和提示词数量统计
  const [categoriesResult, promptsResult] = await Promise.all([
    supabase
      .from('categories')
      .select('*')
      .order('created_at', { ascending: true }),
    supabase
      .from('prompts')
      .select('category_id')
  ]);

  if (categoriesResult.error) {
    console.error('获取分类失败:', categoriesResult.error.message);
    return [];
  }

  // 在内存中计算每个分类的提示词数量（单次遍历）
  const countMap = new Map<string, number>();
  if (promptsResult.data) {
    for (const prompt of promptsResult.data) {
      const catId = prompt.category_id as string;
      countMap.set(catId, (countMap.get(catId) || 0) + 1);
    }
  }

  const allCategories: Category[] = (categoriesResult.data || []).map(cat => ({
    ...mapDbCategoryToCategory(cat),
    count: countMap.get(cat.id) || 0
  }));

  // 构建父子关系
  const mainCategories = allCategories.filter(c => !c.parentId);
  const subCategories = allCategories.filter(c => c.parentId);

  // 将子分类嵌入到主分类中
  for (const main of mainCategories) {
    const subs = subCategories.filter(s => s.parentId === main.id);
    if (subs.length > 0) {
      main.subCategories = subs;
      main.count = subs.reduce((sum, s) => sum + s.count, 0);
    }
  }

  return mainCategories;
}

/** 获取所有提示词 */
export async function fetchPrompts(): Promise<Prompt[]> {
  const { data, error } = await supabase
    .from('prompts')
    .select('*')
    .order('sort_order', { ascending: true });
  if (error) {
    console.error('获取提示词失败:', error.message);
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

/** 搜索提示词 - 支持多关键词智能模糊搜索 + 相关性排序 */
export async function searchPrompts(query: string): Promise<Prompt[]> {
  if (!query.trim()) return [];

  // 常见中文虚词
  const stopWords = new Set(['的', '了', '着', '是', '在', '和', '与', '或', '有', '无', '不', '很', '太', '最', '个', '一', '种', '被', '把', '给', '让', '到', '从', '对', '为', '也', '都', '会', '能', '要', '就', '而', '但', '又', '如', '之']);

  // 分词策略：
  // 1. 首先按空格、逗号、顿号分隔
  // 2. 对于每个分段，提取所有可能的子串，保留位置和长度信息用于加权
  // 3. 过滤掉纯虚词和空字符串
  const rawSegments = query.toLowerCase().split(/[\s,，、]+/).filter(s => s.length > 0);
  
  // 使用 Map 来存储关键词和其权重信息
  // 权重基于：原始分段长度 + 位置（越靠前权重越高）
  const keywordInfo = new Map<string, { originalLength: number; position: number }>();
  
  for (const segment of rawSegments) {
    const segmentLen = [...segment].length; // 原始分段长度
    const chars = [...segment];
    const hasStopWord = chars.some(c => stopWords.has(c));
    
    if (hasStopWord && segment.length > 1) {
      // 包含虚词，需要拆分
      let currentWord = '';
      let position = 0; // 关键词在分段中的起始位置
      
      for (let i = 0; i < chars.length; i++) {
        const char = chars[i];
        if (stopWords.has(char)) {
          if (currentWord.length > 0) {
            // 记录关键词及其位置和长度
            const existing = keywordInfo.get(currentWord);
            const newWeight = segmentLen * 10 + (10 - position); // 长度权重 + 位置权重（越靠前越好）
            if (!existing || (existing.originalLength * 10 + (10 - existing.position)) < newWeight) {
              keywordInfo.set(currentWord, { originalLength: segmentLen, position });
            }
            currentWord = '';
          }
          position = i + 1;
        } else {
          if (currentWord === '') {
            position = i;
          }
          currentWord += char;
        }
      }
      if (currentWord.length > 0) {
        const existing = keywordInfo.get(currentWord);
        const newWeight = segmentLen * 10 + (10 - position);
        if (!existing || (existing.originalLength * 10 + (10 - existing.position)) < newWeight) {
          keywordInfo.set(currentWord, { originalLength: segmentLen, position });
        }
      }
    } else {
      // 不包含虚词，直接使用
      const existing = keywordInfo.get(segment);
      const newWeight = segmentLen * 10 + 10; // 位置0，最靠前
      if (!existing || (existing.originalLength * 10 + (10 - existing.position)) < newWeight) {
        keywordInfo.set(segment, { originalLength: segmentLen, position: 0 });
      }
    }
  }
  
  // 转换为数组
  const uniqueKeywords = Array.from(keywordInfo.entries())
    .filter(([k]) => k.length > 0)
    .map(([k, info]) => ({ keyword: k, originalLength: info.originalLength, position: info.position }));

  if (uniqueKeywords.length === 0) return [];

  // 先获取所有提示词，然后在内存中进行模糊匹配
  const { data, error } = await supabase
    .from('prompts')
    .select('*');

  if (error) {
    console.error('搜索提示词失败:', error.message);
    return [];
  }

  // 搜索字段定义：字段名、权重、是否为标题字段
  const fields = [
    { key: 'title', weight: 10, isTitle: true },
    { key: 'prompt_cn', weight: 5, isTitle: false },
    { key: 'prompt', weight: 5, isTitle: false },
    { key: 'description', weight: 3, isTitle: false },
    { key: 'negative_prompt', weight: 2, isTitle: false },
    { key: 'negative_prompt_cn', weight: 2, isTitle: false },
  ];

  /**
   * 智能匹配函数：返回 { score, type, matchedLen }
   * type: 3=精确包含, 2=前缀匹配, 1=字符重叠, 0=不匹配
   * matchedLen: 实际匹配到的字符数（用于后续加权）
   */
  const smartMatch = (text: string, keyword: string): { score: number; type: number; matchedLen: number } => {
    const lowerText = text.toLowerCase();
    const lowerKeyword = keyword.toLowerCase();
    const keywordLen = [...lowerKeyword].length; // 中文字符数

    // 1. 精确包含匹配（最高优先级）
    if (lowerText.includes(lowerKeyword)) {
      const bonus = lowerText === lowerKeyword ? 1.5 : 1.0;
      return { score: bonus, type: 3, matchedLen: keywordLen };
    }

    const keywordChars = [...lowerKeyword];
    const textChars = [...lowerText];
    const significantChars = keywordChars.filter(c => !stopWords.has(c));

    // 2. 前缀匹配（如"站着"匹配"站立姿势"）
    if (keywordChars.length > 0 && textChars.length > 0) {
      let commonPrefixLen = 0;
      for (let i = 0; i < Math.min(keywordChars.length, textChars.length); i++) {
        if (keywordChars[i] === textChars[i]) {
          commonPrefixLen++;
        } else {
          break;
        }
      }
      // 前缀匹配：根据匹配长度比例给分，但最低也给0.8确保比字符匹配高
      if (commonPrefixLen >= 1) {
        const ratio = commonPrefixLen / keywordChars.length;
        if (ratio >= 0.5) {
          return { score: 0.8 + ratio * 0.2, type: 2, matchedLen: commonPrefixLen };
        }
        if (ratio >= 0.3) {
          return { score: 0.6 + ratio * 0.4, type: 2, matchedLen: commonPrefixLen };
        }
      }
    }

    // 3. 中文词汇片段匹配（非前缀的词中包含关系）
    const chineseWords = lowerText.match(/[\u4e00-\u9fa5]+/g) || [];
    let bestFragmentScore = 0;
    let bestMatchedLen = 0;
    for (const word of chineseWords) {
      if (lowerKeyword.includes(word) || word.includes(lowerKeyword)) {
        const overlap = [...lowerKeyword].filter(c => word.includes(c)).length;
        const ratio = overlap / keywordChars.length;
        if (ratio >= 0.5 && ratio > bestFragmentScore) {
          bestFragmentScore = ratio;
          bestMatchedLen = overlap;
        }
      }
    }
    if (bestFragmentScore > 0) {
      return { score: bestFragmentScore * 0.7, type: 2, matchedLen: bestMatchedLen };
    }

    // 4. 字符集合匹配（最低优先级）
    if (significantChars.length > 0) {
      const textCharSet = new Set(lowerText);
      const matchedChars = significantChars.filter(c => textCharSet.has(c));
      const ratio = matchedChars.length / significantChars.length;
      if (ratio >= 0.5) {
        return { score: ratio * 0.4, type: 1, matchedLen: matchedChars.length };
      }
    }

    return { score: 0, type: 0, matchedLen: 0 };
  };

  /**
   * 计算相关性分数
   * 核心原则：标题匹配 > 其他字段匹配，多字匹配 > 单字匹配，精确匹配 > 模糊匹配
   */
  const calculateScore = (prompt: Record<string, unknown>): number => {
    let totalScore = 0;
    let matchedKeywords = 0;
    let titleMatchedKeywords = 0;
    let titleMatchedCharCount = 0; // 标题中匹配到的总字符数
    let hasTitleExactMatch = false;

    const titleText = ((prompt.title as string) || '').toLowerCase();

    // ── 阶段1：完整原始查询匹配（最高优先级）──
    const originalQuery = query.toLowerCase().trim();
    if (titleText.includes(originalQuery)) {
      totalScore += 2000; // 标题完整匹配原始查询 = 绝对优先
      hasTitleExactMatch = true;
    } else {
      // 检查其他字段的完整原始查询匹配
      for (const field of fields) {
        if (field.isTitle) continue;
        const text = ((prompt[field.key] as string) || '').toLowerCase();
        if (text.includes(originalQuery)) {
          totalScore += field.weight * 10;
          break;
        }
      }
    }

    // ── 阶段2：逐关键词评分 ──
    // 匹配类型倍率：精确=5x, 前缀=2.5x, 字符=0.3x
    const typeMultiplier: Record<number, number> = { 3: 5, 2: 2.5, 1: 0.3, 0: 0 };

    for (const { keyword, originalLength, position } of uniqueKeywords) {
      const keywordLen = [...keyword].length; // 实际关键词长度
      let bestFieldScore = 0;
      let bestType = 0;
      let bestMatchedLen = 0;
      let isTitleMatch = false;

      for (const field of fields) {
        const text = (prompt[field.key] as string) || '';
        const { score, type, matchedLen } = smartMatch(text, keyword);
        if (score > 0) {
          // 基础分数 = 匹配分数 × 字段权重 × 类型倍率
          let fieldScore = score * field.weight * typeMultiplier[type];

          // 关键词长度加权：使用原始长度进行加权
          const lengthBonus = Math.log(originalLength + 1);
          fieldScore *= (1 + lengthBonus * 0.5);

          // 位置加权：越靠前的关键词获得越高权重
          // position 0 = 1.3x, position 1 = 1.2x, position 2 = 1.1x, position 3+ = 1.0x
          const positionBonus = Math.max(0.3 - position * 0.1, 0);
          fieldScore *= (1 + positionBonus);

          // 标题匹配有额外加成
          if (field.isTitle) {
            fieldScore *= 4; // 标题匹配额外 4x
            if (fieldScore > bestFieldScore) {
              bestFieldScore = fieldScore;
              bestType = type;
              bestMatchedLen = matchedLen;
              isTitleMatch = true;
            }
          } else if (fieldScore > bestFieldScore) {
            bestFieldScore = fieldScore;
            bestType = type;
            bestMatchedLen = matchedLen;
            isTitleMatch = false;
          }
        }
      }

      if (bestFieldScore > 0) {
        matchedKeywords++;
        if (isTitleMatch) {
          titleMatchedKeywords++;
          titleMatchedCharCount += bestMatchedLen;
          if (bestType === 3) hasTitleExactMatch = true;
        }
        totalScore += bestFieldScore;
      }
    }

    // ── 阶段3：标题匹配整体加权 ──
    if (titleMatchedKeywords > 0) {
      // 基础标题匹配加成
      totalScore *= 2.5;
      // 根据标题中匹配到的字符总数加分（多字匹配更有价值）
      totalScore += titleMatchedCharCount * 15;
      // 如果所有关键词都在标题中匹配到，再额外加成
      if (titleMatchedKeywords === uniqueKeywords.length) {
        totalScore *= 1.5;
      }
    }

    // ── 阶段4：关键词覆盖率加权 ──
    if (uniqueKeywords.length > 1) {
      const coverageRatio = matchedKeywords / uniqueKeywords.length;
      totalScore *= (0.6 + 0.4 * coverageRatio);
    }

    // ── 阶段5：精确匹配额外奖励 ──
    if (hasTitleExactMatch) {
      totalScore *= 1.3;
    }

    return totalScore;
  };

  // 过滤并按相关性排序
  const results = (data || [])
    .map(item => ({ ...item, _score: calculateScore(item) }))
    .filter(item => item._score > 0)
    .sort((a, b) => b._score - a._score);

  return results.map(({ _score, ...prompt }) => mapDbPromptToPrompt(prompt));
}

/** 按 ID 获取单条提示词 */
export async function getPromptById(id: string): Promise<Prompt | undefined> {
  const { data, error } = await supabase
    .from('prompts')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) return undefined;
  return mapDbPromptToPrompt(data);
}

/** 按 ID 获取分类（含子分类查找） */
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

/** 获取某分类下的子分类 - 优化版 */
export async function getSubCategories(parentId: string): Promise<Category[]> {
  // 并行获取子分类和提示词数量
  const [subsResult, promptsResult] = await Promise.all([
    supabase
      .from('categories')
      .select('*')
      .eq('parent_id', parentId)
      .order('created_at', { ascending: true }),
    supabase
      .from('prompts')
      .select('category_id')
  ]);

  if (subsResult.error) {
    console.error('获取子分类失败:', subsResult.error.message);
    return [];
  }

  // 在内存中计算数量
  const countMap = new Map<string, number>();
  if (promptsResult.data) {
    for (const prompt of promptsResult.data) {
      const catId = prompt.category_id as string;
      countMap.set(catId, (countMap.get(catId) || 0) + 1);
    }
  }

  return (subsResult.data || []).map(cat => ({
    ...mapDbCategoryToCategory(cat),
    count: countMap.get(cat.id) || 0
  }));
}

/** 获取所有分类 ID（用于 generateStaticParams） */
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
