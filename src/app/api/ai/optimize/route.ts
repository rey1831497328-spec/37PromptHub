import { NextRequest, NextResponse } from 'next/server';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || '';
const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1';

export async function POST(request: NextRequest) {
  if (!OPENROUTER_API_KEY) {
    return NextResponse.json(
      { error: 'API Key未配置' },
      { status: 500 }
    );
  }

  const body = await request.json();
  const { prompt, language = 'both' } = body;

  const systemPrompt = `你是一位专业的AI绘图提示词优化师。请优化用户提供的提示词，使其更专业、更详细、更容易生成高质量图像。

优化要求：
1. 添加质量增强标签（如 masterpiece, best quality, highly detailed 等）
2. 补充细节描述（光线、构图、色彩、氛围等）
3. 优化词汇顺序，将重要的描述放在前面
4. 移除模糊或矛盾的描述
5. 提供3-5条优化建议说明为什么这样改

输出格式必须是JSON：
{
  "optimizedPrompt": "优化后的英文提示词",
  "optimizedPromptCn": "优化后的中文提示词（如果用户需要）",
  "suggestions": ["建议1", "建议2", "建议3"]
}`;

  const userPrompt = `请优化以下AI绘图提示词："${prompt}"${language === 'zh' ? '，只需要中文版本' : language === 'en' ? '，只需要英文版本' : '，需要中英文双语版本'}`;

  try {
    const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://37prompts.vercel.app',
        'X-Title': '37PromptHub',
      },
      body: JSON.stringify({
        model: 'nvidia/nemotron-3-nano-3b-instruct:free',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenRouter API error:', response.status, errorText.substring(0, 200));
      return NextResponse.json(
        { error: `AI服务调用失败 (${response.status})` },
        { status: 500 }
      );
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content || '';

    // 解析JSON响应
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json(
        { error: 'AI返回格式错误' },
        { status: 500 }
      );
    }

    const result = JSON.parse(jsonMatch[0]);
    return NextResponse.json({
      optimizedPrompt: result.optimizedPrompt,
      optimizedPromptCn: result.optimizedPromptCn,
      suggestions: result.suggestions || [],
    });
  } catch (error) {
    console.error('OpenRouter API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '服务暂时不可用，请稍后重试' },
      { status: 500 }
    );
  }
}
