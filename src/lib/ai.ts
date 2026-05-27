// AI服务 - 通过 Next.js API Route 调用 BazaarLink.AI

export interface AIGenerateRequest {
  description: string; // 用户描述想要什么类型的提示词
  category?: string;   // 可选：指定分类
  style?: string;      // 可选：指定风格
}

export interface AIOptimizeRequest {
  prompt: string;      // 用户输入的原始提示词
  language?: 'zh' | 'en' | 'both'; // 输出语言
}

export interface AIGenerateResponse {
  title: string;
  prompt: string;
  promptCn?: string;
  negativePrompt?: string;
  negativePromptCn?: string;
  description?: string;
  success: boolean;
  error?: string;
}

export interface AIOptimizeResponse {
  optimizedPrompt: string;
  optimizedPromptCn?: string;
  suggestions: string[];
  success: boolean;
  error?: string;
}

export interface AIAnalyzeResponse {
  analysis: Record<string, unknown>;
  success: boolean;
  error?: string;
}

/**
 * 智能生成提示词
 * 根据用户描述自动生成专业的AI绘图提示词
 */
export async function generatePrompt(request: AIGenerateRequest): Promise<AIGenerateResponse> {
  try {
    const response = await fetch('/api/ai/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || '生成失败');
    }

    const data = await response.json();
    return {
      title: data.title,
      prompt: data.prompt,
      promptCn: data.promptCn,
      negativePrompt: data.negativePrompt,
      negativePromptCn: data.negativePromptCn,
      description: data.description,
      success: true,
    };
  } catch (error) {
    console.error('生成提示词失败:', error);
    return {
      title: '',
      prompt: '',
      success: false,
      error: error instanceof Error ? error.message : '未知错误',
    };
  }
}

/**
 * 优化/扩写提示词
 * 优化用户输入的提示词，使其更专业、更详细
 */
export async function optimizePrompt(request: AIOptimizeRequest): Promise<AIOptimizeResponse> {
  try {
    const response = await fetch('/api/ai/optimize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || '优化失败');
    }

    const data = await response.json();
    return {
      optimizedPrompt: data.optimizedPrompt,
      optimizedPromptCn: data.optimizedPromptCn,
      suggestions: data.suggestions || [],
      success: true,
    };
  } catch (error) {
    console.error('优化提示词失败:', error);
    return {
      optimizedPrompt: '',
      suggestions: [],
      success: false,
      error: error instanceof Error ? error.message : '未知错误',
    };
  }
}

/**
 * 检查API配置是否有效
 */
export function isAIConfigured(): boolean {
  // 服务端API路由会检查配置，客户端始终返回true
  return true;
}

/**
 * 智能识图分析
 * 上传图片后进行11维度深度解构
 */
export async function analyzeImage(imageBase64: string): Promise<AIAnalyzeResponse> {
  try {
    const response = await fetch('/api/ai/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageBase64 }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || '分析失败');
    }

    const data = await response.json();
    return {
      analysis: data,
      success: true,
    };
  } catch (error) {
    console.error('识图分析失败:', error);
    return {
      analysis: {},
      success: false,
      error: error instanceof Error ? error.message : '未知错误',
    };
  }
}
