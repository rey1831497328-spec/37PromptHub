module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/app/api/ai/analyze/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "POST",
    ()=>POST
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
// OpenRouter 配置（免费视觉模型）
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || '';
const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1';
// 重试配置
const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 1500;
function sleep(ms) {
    return new Promise((resolve)=>setTimeout(resolve, ms));
}
async function POST(request) {
    try {
        if (!OPENROUTER_API_KEY) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: 'OpenRouter API Key未配置'
            }, {
                status: 500
            });
        }
        const body = await request.json();
        const { imageBase64 } = body;
        if (!imageBase64) {
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                error: '请提供图片'
            }, {
                status: 400
            });
        }
        const systemPrompt = `你是一名顶级专业图像分析师。请对输入图像进行深度解构分析。

必须完整覆盖以下11个分析维度：基础属性、构图透视、光影布光、色彩色调、纹理材质、主体细节、场景空间、艺术风格、情绪氛围、符号内涵、画质质感。

重要：你必须只输出JSON格式，不要输出任何其他文字、解释或markdown代码块。JSON必须严格符合以下格式：

{"基础属性":{"图像类型":"","画面方向":"","主体数量":"","预估场景":""},"构图透视":{"构图类型":"","视角":"","景深":"","空间层次":""},"光影布光":{"光源类型":"","光线方向":"","光线质感":"","光影效果":"","色调温度":""},"色彩色调":{"主色调":"","辅助色":"","色彩对比":"","色彩饱和度":"","配色风格":""},"纹理材质":{"皮肤质感":"","服装材质":"","环境材质":"","特殊纹理":""},"主体细节":{"人物描述":"","服装描述":"","配饰道具":"","其他主体":""},"场景空间":{"场景类型":"","环境元素":"","天气氛围":"","时间感":""},"艺术风格":{"整体风格":"","参考流派":"","处理手法":""},"情绪氛围":{"主情绪":"","氛围关键词":[""],"叙事感":""},"符号内涵":{"文化元素":"","象征意义":"","时代特征":""},"画质质感":{"清晰度":"","颗粒感":"","后期处理":"","整体品质":""},"正向提示词":"","反向提示词":""}`;
        // 带重试的API调用
        let lastError = '';
        for(let attempt = 1; attempt <= MAX_RETRIES; attempt++){
            try {
                console.log(`图片分析 - 第 ${attempt} 次尝试...`);
                const controller = new AbortController();
                const timeout = setTimeout(()=>controller.abort(), 45000); // 45秒超时
                const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
                    method: 'POST',
                    signal: controller.signal,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                        'HTTP-Referer': 'https://37prompthub.com',
                        'X-Title': '37PromptHub'
                    },
                    body: JSON.stringify({
                        model: 'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free',
                        messages: [
                            {
                                role: 'system',
                                content: systemPrompt
                            },
                            {
                                role: 'user',
                                content: [
                                    {
                                        type: 'image_url',
                                        image_url: {
                                            url: imageBase64.startsWith('data:') ? imageBase64 : `data:image/jpeg;base64,${imageBase64}`
                                        }
                                    },
                                    {
                                        type: 'text',
                                        text: '请对这张图片进行全维度深度解构分析，严格按照11个维度输出JSON。'
                                    }
                                ]
                            }
                        ],
                        max_tokens: 4000,
                        temperature: 0.3
                    })
                });
                clearTimeout(timeout);
                if (!response.ok) {
                    const errorText = await response.text();
                    lastError = `AI服务调用失败 (${response.status})`;
                    console.error(`第 ${attempt} 次尝试失败 - HTTP ${response.status}:`, errorText.substring(0, 200));
                    // 如果是429限流或5xx服务器错误，等待后重试
                    if (response.status === 429 || response.status >= 500) {
                        if (attempt < MAX_RETRIES) {
                            await sleep(RETRY_DELAY_MS * attempt);
                            continue;
                        }
                    }
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        error: `${lastError}，请稍后重试`
                    }, {
                        status: 500
                    });
                }
                const data = await response.json();
                const content = data.choices?.[0]?.message?.content || '';
                if (!content) {
                    lastError = 'AI返回内容为空';
                    console.error(`第 ${attempt} 次尝试失败: 返回内容为空`);
                    if (attempt < MAX_RETRIES) {
                        await sleep(RETRY_DELAY_MS * attempt);
                        continue;
                    }
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        error: `${lastError}，请更换图片或稍后重试`
                    }, {
                        status: 500
                    });
                }
                // 解析JSON响应
                let jsonStr = content.trim();
                // 尝试提取 JSON 部分（查找第一个 { 和最后一个 }）
                const jsonMatch = jsonStr.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    jsonStr = jsonMatch[0];
                }
                // 移除可能的 markdown 代码块包裹
                jsonStr = jsonStr.replace(/^```(?:json)?\s*\n?/, '').replace(/\n?```\s*$/, '');
                try {
                    const result = JSON.parse(jsonStr);
                    console.log(`第 ${attempt} 次尝试成功`);
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json(result);
                } catch (parseError) {
                    lastError = 'AI返回格式错误，无法解析为JSON';
                    console.error(`第 ${attempt} 次尝试失败 - JSON解析错误:`, jsonStr.substring(0, 200));
                    if (attempt < MAX_RETRIES) {
                        await sleep(RETRY_DELAY_MS * attempt);
                        continue;
                    }
                    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                        error: `${lastError}，已重试 ${MAX_RETRIES} 次。建议更换图片或稍后重试。`,
                        rawContent: content.substring(0, 500)
                    }, {
                        status: 500
                    });
                }
            } catch (fetchError) {
                lastError = fetchError instanceof Error ? fetchError.message : '网络请求失败';
                console.error(`第 ${attempt} 次尝试异常:`, lastError);
                // 超时或网络错误，等待后重试
                if (attempt < MAX_RETRIES) {
                    await sleep(RETRY_DELAY_MS * attempt);
                    continue;
                }
            }
        }
        // 所有重试都失败
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: `分析失败，已自动重试 ${MAX_RETRIES} 次。${lastError ? `原因：${lastError}` : '请稍后重试或更换图片。'}`
        }, {
            status: 500
        });
    } catch (error) {
        console.error('Analyze image error:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error instanceof Error ? error.message : '未知错误'
        }, {
            status: 500
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0gaugz5._.js.map