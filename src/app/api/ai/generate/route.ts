import { NextRequest, NextResponse } from 'next/server';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || '';
const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1';

// 使用 DeepSeek Chat 模型
const FREE_MODEL = 'deepseek/deepseek-chat-v3:free';

export async function POST(request: NextRequest) {
  if (!OPENROUTER_API_KEY) {
    return NextResponse.json(
      { error: 'API Key未配置' },
      { status: 500 }
    );
  }

  const body = await request.json();
  const { description, category, style } = body;

  const systemPrompt = `你是一位专业的AI绘图提示词工程师。请根据用户的描述生成高质量的Stable Diffusion/Midjourney提示词。

要求：
1. 生成一个简洁明了的中文标题（不超过10个字）
2. 生成详细的英文正向提示词（prompt），包含质量标签、风格描述、细节描述
3. 生成对应的中文正向提示词描述
4. 生成英文反向提示词（negative prompt），列出应该避免的内容
5. 生成对应的中文反向提示词
6. 生成一段简短的中文描述说明这个提示词的用途

输出格式必须是JSON：
{
  "title": "中文标题",
  "prompt": "英文正向提示词",
  "promptCn": "中文正向提示词描述",
  "negativePrompt": "英文反向提示词",
  "negativePromptCn": "中文反向提示词",
  "description": "简短描述"
}`;

  const userPrompt = `请为我生成一个AI绘图提示词：${description}${category ? `，分类：${category}` : ''}${style ? `，风格：${style}` : ''}`;

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
        model: FREE_MODEL,
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
      console.error('OpenRouter API error:', response.status, errorText.substring(0, 500));
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
      title: result.title,
      prompt: result.prompt,
      promptCn: result.promptCn,
      negativePrompt: result.negativePrompt,
      negativePromptCn: result.negativePromptCn,
      description: result.description,
    });
  } catch (error) {
    console.error('OpenRouter API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '服务暂时不可用，请稍后重试' },
      { status: 500 }
    );
  }
}
