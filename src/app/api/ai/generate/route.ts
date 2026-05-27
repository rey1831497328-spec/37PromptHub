import { NextRequest, NextResponse } from 'next/server';

const BAZAARLINK_API_KEY = process.env.BAZAARLINK_API_KEY || '';
const BAZAARLINK_BASE_URL = 'https://bazaarlink.ai/api/v1';
const GROQ_API_KEY = process.env.GROQ_API_KEY || '';
const GROQ_BASE_URL = 'https://api.groq.com/openai/v1';

export async function POST(request: NextRequest) {
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

  // 尝试使用 Groq API（如果没有 Cloudflare 保护）
  if (GROQ_API_KEY) {
    try {
      const groqResponse = await fetch(`${GROQ_BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
          ],
          temperature: 0.7,
          max_tokens: 2000,
        }),
      });

      if (groqResponse.ok) {
        const groqData = await groqResponse.json();
        const content = groqData.choices[0]?.message?.content || '';
        const jsonMatch = content.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const result = JSON.parse(jsonMatch[0]);
          return NextResponse.json({
            title: result.title,
            prompt: result.prompt,
            promptCn: result.promptCn,
            negativePrompt: result.negativePrompt,
            negativePromptCn: result.negativePromptCn,
            description: result.description,
          });
        }
      }
    } catch (error) {
      console.error('Groq API error:', error);
    }
  }

  // 尝试 BazaarLink API（带重试）
  if (BAZAARLINK_API_KEY) {
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const response = await fetch(`${BAZAARLINK_BASE_URL}/chat/completions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${BAZAARLINK_API_KEY}`,
            'User-Agent': 'Mozilla/5.0 (compatible; PromptHub/1.0)',
          },
          body: JSON.stringify({
            model: 'auto:free',
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: userPrompt },
            ],
            temperature: 0.7,
            max_tokens: 2000,
          }),
        });

        // 如果是 Cloudflare 页面，重试
        if (response.status === 403 || response.status === 503) {
          const responseText = await response.text();
          if (responseText.includes('cloudflare') || responseText.includes('Just a moment')) {
            console.log(`Cloudflare protection detected, retrying (${attempt + 1}/3)...`);
            await new Promise(resolve => setTimeout(resolve, 2000 * (attempt + 1)));
            continue;
          }
        }

        if (!response.ok) {
          const errorText = await response.text();
          console.error('BazaarLink API error:', response.status, errorText.substring(0, 200));
          return NextResponse.json(
            { error: `AI服务调用失败 (${response.status})` },
            { status: 500 }
          );
        }

        const data = await response.json();
        const content = data.choices[0]?.message?.content || '';
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
        console.error(`Generate attempt ${attempt + 1} failed:`, error);
        if (attempt === 2) {
          return NextResponse.json(
            { error: '服务暂时不可用，请稍后重试' },
            { status: 500 }
          );
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }

  return NextResponse.json(
    { error: '请配置 AI 服务（GROQ_API_KEY 或 BAZAARLINK_API_KEY）' },
    { status: 500 }
  );
}
