// 导入原始提示词数据到 Supabase
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://zuqtucfejpkghptiphsz.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1cXR1Y2ZlanBrZ2hwdGlwaHN6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTUzMDEyMiwiZXhwIjoyMDk1MTA2MTIyfQ.Hxd-H8v3DTMk4l6vwAWfhXYGJ_PEfSIJ3qey5NoqwpY';

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

// 原始提示词数据
const promptsData = [
  // ===== 画质增强 (quality) =====
  {
    title: '8K超高清画质',
    category_id: 'quality',
    prompt: 'masterpiece, best quality, 8k, ultra-detailed, highres, extremely detailed, sharp focus, crisp, fine textures, professional photography',
    prompt_cn: '大师作品、最好的质量、8K分辨率、超精细细节、高分辨率、极致细节、锐利对焦、清晰、精细纹理、专业摄影',
    description: '最基础的画质增强提示词，适用于所有场景'
  },
  {
    title: '电影级画质',
    category_id: 'quality',
    prompt: 'masterpiece, best quality, 4k, 8k, ultra high res, photorealistic, raw photo, hdr, film grain, cinematic lighting, professional cinematography',
    prompt_cn: '大师作品、最好的质量、4K、8K、超高分辨率、照片级真实、原始照片、HDR、电影颗粒、电影级光照、专业电影摄影',
    description: '电影级别的画质效果'
  },
  {
    title: '极致细节',
    category_id: 'quality',
    prompt: 'masterpiece, best quality, highly detailed, intricate details, sharp focus, studio quality, professional, hyperrealistic, ultra detailed',
    prompt_cn: '大师作品、最好的质量、高度细节、复杂细节、锐利对焦、工作室质量、专业、超写实、极致细节',
    description: '追求极致细节的画质提示词'
  },
  {
    title: '照片级真实',
    category_id: 'quality',
    prompt: 'photorealistic, hyperrealistic, realistic, real photo, raw photo, dslr, high quality, film grain, fujifilm, kodak portra',
    prompt_cn: '照片级真实、超写实、真实、真实照片、原始照片、单反、高质量、电影颗粒、富士胶片、柯达Portra',
    description: '追求照片级真实感'
  },
  {
    title: '数字艺术画质',
    category_id: 'quality',
    prompt: 'masterpiece, best quality, digital art, highly detailed, artstation, concept art, smooth, sharp focus, illustration, vibrant colors',
    prompt_cn: '大师作品、最好的质量、数字艺术、高度细节、ArtStation、概念艺术、平滑、锐利对焦、插画、鲜艳色彩',
    description: '数字艺术风格的画质'
  },

  // ===== 反向提示词 (negative) =====
  {
    title: '通用反向提示词',
    category_id: 'negative',
    prompt: '',
    negative_prompt: 'lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry',
    negative_prompt_cn: '低分辨率、错误解剖、错误的手、文字、错误、缺失手指、多余手指、更少手指、裁剪、最差质量、低质量、普通质量、JPEG伪影、签名、水印、用户名、模糊',
    description: '适用于大多数场景的通用反向提示词'
  },
  {
    title: '人物反向提示词',
    category_id: 'negative',
    prompt: '',
    negative_prompt: 'ugly, deformed, noisy, blurry, distorted, out of focus, bad anatomy, extra limbs, poorly drawn face, poorly drawn hands, missing fingers, mutation, deformed, watermark, text, error',
    negative_prompt_cn: '丑陋、变形、噪点、模糊、扭曲、失焦、错误解剖、多余肢体、画得差的脸、画得差的手、缺失手指、变异、变形、水印、文字、错误',
    description: '专门针对人物生成的反向提示词'
  },
  {
    title: '风景反向提示词',
    category_id: 'negative',
    prompt: '',
    negative_prompt: 'blurry, low quality, distorted, oversaturated, undersaturated, grainy, pixelated, watermark, text, signature, frame, border',
    negative_prompt_cn: '模糊、低质量、扭曲、过饱和、欠饱和、颗粒感、像素化、水印、文字、签名、边框、边界',
    description: '专门针对风景生成的反向提示词'
  },
  {
    title: '艺术风格反向提示词',
    category_id: 'negative',
    prompt: '',
    negative_prompt: 'photorealistic, photo, realistic, 3d render, cgi, stock photo, watermark, signature, text, logo, brand name',
    negative_prompt_cn: '照片级真实、照片、真实、3D渲染、CGI、库存照片、水印、签名、文字、标志、品牌名',
    description: '追求艺术风格时排除真实感的反向提示词'
  },
  {
    title: '高质量反向提示词',
    category_id: 'negative',
    prompt: '',
    negative_prompt: 'low quality, worst quality, bad quality, blurry, pixelated, grainy, noisy, compressed, jpeg artifacts, watermark, signature, text, username',
    negative_prompt_cn: '低质量、最差质量、差质量、模糊、像素化、颗粒感、噪点、压缩、JPEG伪影、水印、签名、文字、用户名',
    description: '排除低质量元素的反向提示词'
  },

  // ===== 艺术风格 (style) =====
  {
    title: '动漫风格',
    category_id: 'style',
    prompt: 'anime style, anime coloring, vibrant colors, cel shading, 2d, illustration, detailed anime art, studio ghibli style',
    prompt_cn: '动漫风格、动漫上色、鲜艳色彩、赛璐璐阴影、2D、插画、精细动漫艺术、吉卜力工作室风格',
    description: '日式动漫风格'
  },
  {
    title: '油画风格',
    category_id: 'style',
    prompt: 'oil painting, thick brushstrokes, impasto, classical art, masterpiece, museum quality, rich colors, textured canvas',
    prompt_cn: '油画、厚笔触、厚涂、古典艺术、大师作品、博物馆质量、丰富色彩、有纹理的画布',
    description: '古典油画风格'
  },
  {
    title: '水彩风格',
    category_id: 'style',
    prompt: 'watercolor painting, soft colors, wet on wet, delicate, ethereal, dreamy, flowing colors, paper texture',
    prompt_cn: '水彩画、柔和色彩、湿画法、精致、空灵、梦幻、流动的色彩、纸张纹理',
    description: '水彩画艺术风格'
  },
  {
    title: '赛博朋克风格',
    category_id: 'style',
    prompt: 'cyberpunk style, neon lights, futuristic, sci-fi, dystopian, high tech, low life, blade runner aesthetic, purple and blue lighting',
    prompt_cn: '赛博朋克风格、霓虹灯、未来主义、科幻、反乌托邦、高科技、低生活、银翼杀手美学、紫蓝色光照',
    description: '赛博朋克科幻风格'
  },
  {
    title: '像素艺术风格',
    category_id: 'style',
    prompt: 'pixel art, 16-bit, retro game style, low resolution art, nostalgic, 8-bit, pixelated, game aesthetic',
    prompt_cn: '像素艺术、16位、复古游戏风格、低分辨率艺术、怀旧、8位、像素化、游戏美学',
    description: '复古像素艺术风格'
  },

  // ===== 光照效果 (lighting) =====
  {
    title: '黄金时刻光照',
    category_id: 'lighting',
    prompt: 'golden hour, warm lighting, sunset, soft shadows, orange and pink sky, cinematic lighting, beautiful lighting',
    prompt_cn: '黄金时刻、温暖光照、日落、柔和阴影、橙粉色天空、电影级光照、美丽光照',
    description: '日落时分的黄金光照效果'
  },
  {
    title: '电影级光照',
    category_id: 'lighting',
    prompt: 'cinematic lighting, dramatic lighting, volumetric lighting, ray tracing, ambient occlusion, film look, movie scene',
    prompt_cn: '电影级光照、戏剧性光照、体积光、光线追踪、环境光遮蔽、电影感、电影场景',
    description: '电影级别的专业光照'
  },
  {
    title: '霓虹灯光照',
    category_id: 'lighting',
    prompt: 'neon lighting, neon lights, cyberpunk lights, colorful lights, glowing, vibrant, purple and pink lighting',
    prompt_cn: '霓虹光照、霓虹灯、赛博朋克灯光、彩色灯光、发光、鲜艳、紫粉色光照',
    description: '霓虹灯效果的光照'
  },
  {
    title: '柔和自然光',
    category_id: 'lighting',
    prompt: 'natural lighting, soft light, diffused light, overcast, cloudy day, even lighting, no harsh shadows',
    prompt_cn: '自然光照、柔和光线、漫射光、阴天、多云天、均匀光照、无强烈阴影',
    description: '柔和的自然光照效果'
  },
  {
    title: '戏剧性光照',
    category_id: 'lighting',
    prompt: 'dramatic lighting, chiaroscuro, high contrast, strong shadows, spotlight, rim lighting, moody lighting',
    prompt_cn: '戏剧性光照、明暗对比、高对比度、强烈阴影、聚光灯、轮廓光、情绪化光照',
    description: '戏剧性的明暗对比光照'
  },

  // ===== 服饰 (clothing) =====
  {
    title: '休闲穿搭',
    category_id: 'clothing',
    prompt: 'casual clothes, t-shirt, jeans, sneakers, comfortable outfit, everyday wear, simple and casual',
    prompt_cn: '休闲服装、T恤、牛仔裤、运动鞋、舒适穿搭、日常穿着、简约休闲',
    description: '日常休闲穿搭风格'
  },
  {
    title: '正式西装',
    category_id: 'clothing',
    prompt: 'formal suit, business suit, tailored suit, dress shirt, tie, professional attire, elegant suit',
    prompt_cn: '正式西装、商务西装、定制西装、正装衬衫、领带、职业装、优雅西装',
    description: '正式商务西装'
  },
  {
    title: '运动装',
    category_id: 'clothing',
    prompt: 'sportswear, athletic wear, gym clothes, tracksuit, running shoes, sports outfit, activewear',
    prompt_cn: '运动装、运动服、健身服、运动套装、跑鞋、运动装备、活动服',
    description: '运动健身服装'
  },
  {
    title: '优雅晚礼服',
    category_id: 'clothing',
    prompt: 'elegant evening gown, formal dress, gala dress, sophisticated, glamorous, red carpet dress, flowing fabric',
    prompt_cn: '优雅晚礼服、正式礼服、晚宴礼服、精致、迷人、红毯礼服、飘逸面料',
    description: '正式场合的晚礼服'
  },
  {
    title: '街头潮流',
    category_id: 'clothing',
    prompt: 'streetwear, urban fashion, hoodie, sneakers, trendy outfit, hip hop style, oversized clothes',
    prompt_cn: '街头服饰、都市时尚、卫衣、运动鞋、潮流穿搭、嘻哈风格、宽松服装',
    description: '街头潮流风格'
  },

  // ===== 人物相貌 (appearance) =====
  {
    title: '亚洲面孔',
    category_id: 'appearance',
    prompt: 'asian face, east asian features, beautiful asian, delicate features, smooth skin, dark hair',
    prompt_cn: '亚洲面孔、东亚特征、美丽亚洲人、精致五官、光滑皮肤、黑发',
    description: '东亚面孔特征'
  },
  {
    title: '欧美面孔',
    category_id: 'appearance',
    prompt: 'caucasian face, european features, western features, defined features, fair skin, varied hair colors',
    prompt_cn: '白人面孔、欧洲特征、西方特征、轮廓分明、白皙皮肤、多种发色',
    description: '欧美面孔特征'
  },
  {
    title: '年轻面孔',
    category_id: 'appearance',
    prompt: 'young face, youthful appearance, smooth skin, fresh look, teenager, early twenties',
    prompt_cn: '年轻面孔、年轻外表、光滑皮肤、清新外观、青少年、二十出头',
    description: '年轻的面孔特征'
  },
  {
    title: '成熟面孔',
    category_id: 'appearance',
    prompt: 'mature face, sophisticated look, defined features, elegant, confident expression, adult',
    prompt_cn: '成熟面孔、成熟外观、轮廓分明、优雅、自信表情、成年人',
    description: '成熟的面孔特征'
  },
  {
    title: '美丽女性',
    category_id: 'appearance',
    prompt: 'beautiful woman, gorgeous face, stunning features, perfect symmetry, attractive, model face',
    prompt_cn: '美丽女性、绝美面孔、惊艳五官、完美对称、迷人、模特面孔',
    description: '美丽女性面孔'
  },

  // ===== 姿势 (pose) =====
  {
    title: '站立姿势',
    category_id: 'pose',
    prompt: 'standing pose, full body standing, confident stance, straight posture, natural standing',
    prompt_cn: '站立姿势、全身站立、自信站姿、挺直姿态、自然站立',
    description: '自然站立姿势'
  },
  {
    title: '坐姿',
    category_id: 'pose',
    prompt: 'sitting pose, seated position, relaxed sitting, chair pose, casual sitting',
    prompt_cn: '坐姿、坐着的姿势、放松坐姿、椅子姿势、随意坐姿',
    description: '坐着的姿势'
  },
  {
    title: '动态姿势',
    category_id: 'pose',
    prompt: 'dynamic pose, action pose, movement, running pose, jumping, athletic pose, in motion',
    prompt_cn: '动态姿势、动作姿势、运动、跑步姿势、跳跃、运动姿势、运动中',
    description: '充满动感的姿势'
  },
  {
    title: '优雅姿势',
    category_id: 'pose',
    prompt: 'elegant pose, graceful stance, sophisticated pose, model pose, fashion pose, refined posture',
    prompt_cn: '优雅姿势、优雅站姿、精致姿势、模特姿势、时尚姿势、优雅姿态',
    description: '优雅的姿势'
  },
  {
    title: '休闲姿势',
    category_id: 'pose',
    prompt: 'casual pose, relaxed pose, natural stance, informal pose, comfortable position, laid back',
    prompt_cn: '休闲姿势、放松姿势、自然站姿、非正式姿势、舒适位置、慵懒',
    description: '轻松休闲的姿势'
  },

  // ===== 表情 (expression) =====
  {
    title: '微笑表情',
    category_id: 'expression',
    prompt: 'smiling, gentle smile, warm smile, happy expression, friendly smile, pleasant expression',
    prompt_cn: '微笑、温柔微笑、温暖微笑、开心表情、友好微笑、愉快表情',
    description: '自然微笑的表情'
  },
  {
    title: '严肃表情',
    category_id: 'expression',
    prompt: 'serious expression, focused look, determined face, intense gaze, professional expression',
    prompt_cn: '严肃表情、专注眼神、坚定面孔、强烈凝视、专业表情',
    description: '严肃认真的表情'
  },
  {
    title: '开心表情',
    category_id: 'expression',
    prompt: 'happy expression, joyful, cheerful, big smile, laughing, excited, delighted',
    prompt_cn: '开心表情、快乐、愉快、大笑、笑、兴奋、高兴',
    description: '开心快乐的表情'
  },
  {
    title: '神秘表情',
    category_id: 'expression',
    prompt: 'mysterious expression, enigmatic smile, alluring gaze, secretive look, intriguing expression',
    prompt_cn: '神秘表情、神秘微笑、迷人凝视、神秘眼神、引人入胜的表情',
    description: '神秘迷人的表情'
  },
  {
    title: '自信表情',
    category_id: 'expression',
    prompt: 'confident expression, self-assured, determined look, strong gaze, powerful expression, assertive',
    prompt_cn: '自信表情、自信、坚定眼神、强烈凝视、有力表情、坚定',
    description: '自信坚定的表情'
  }
];

async function importPrompts() {
  console.log(`准备导入 ${promptsData.length} 条提示词...\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const prompt of promptsData) {
    const { error } = await supabase
      .from('prompts')
      .insert([prompt]);

    if (error) {
      console.error(`❌ 导入失败: ${prompt.title} - ${error.message}`);
      errorCount++;
    } else {
      console.log(`✅ 导入成功: ${prompt.title}`);
      successCount++;
    }
  }

  console.log(`\n导入完成！`);
  console.log(`成功: ${successCount} 条`);
  console.log(`失败: ${errorCount} 条`);
}

importPrompts();
