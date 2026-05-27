-- 为每个人物类型子分类添加经典形象提示词（插入到首位）
-- 由于无法直接控制排序，请在管理后台中将这些提示词拖到每个子分类的首位

-- 御姐 - 经典形象
INSERT INTO prompts (title, category_id, prompt, prompt_cn, description) VALUES
('经典御姐形象', 'appearance-oneesan', 'tall mature woman, long black flowing hair, sharp almond eyes, red lips, fitted black dress, high heels, confident commanding gaze, elegant posture, sophisticated makeup, alluring aura, one hand on hip', '高挑成熟女性、黑色飘逸长发、锐利杏眼、红唇、修身黑色连衣裙、高跟鞋、自信威严目光、优雅姿态、精致妆容、迷人气场、单手叉腰', '御姐最经典的视觉形象：黑长直红唇高跟鞋的成熟大姐姐');

-- 甜妹 - 经典形象
INSERT INTO prompts (title, category_id, prompt, prompt_cn, description) VALUES
('经典甜妹形象', 'appearance-sweetgirl', 'cute sweet girl, soft pastel pink hair, big sparkling eyes, rosy cheeks, gentle warm smile, white frilly blouse, pink pleated skirt, hair ribbon, soft lighting, innocent expression, kawaii aesthetic, dreamy soft focus', '可爱甜妹、柔和粉色头发、闪闪大眼睛、红润脸颊、温柔甜美微笑、白色褶边衬衫、粉色百褶裙、发带蝴蝶结、柔光、纯真表情、可爱美学、梦幻柔焦', '甜妹最经典的视觉形象：粉色系软萌可爱少女');

-- 萝莉 - 经典形象
INSERT INTO prompts (title, category_id, prompt, prompt_cn, description) VALUES
('经典萝莉形象', 'appearance-loli', 'small petite girl, short stature, big round innocent eyes, blonde twin tails with ribbons, oversized cute dress, frilly socks, mary jane shoes, doll-like features, innocent curious expression, soft pastel colors, youthful charm', '娇小女孩、矮小身材、大大圆圆纯真眼睛、金色双马尾配蝴蝶结、宽松可爱连衣裙、褶边袜子、玛丽珍鞋、娃娃般五官、纯真好奇表情、柔和 pastel 色、青春魅力', '萝莉最经典的视觉形象：金发双马尾娃娃般可爱小女孩');

-- 女王 - 经典形象
INSERT INTO prompts (title, category_id, prompt, prompt_cn, description) VALUES
('经典女王形象', 'appearance-queen', 'regal queen, golden crown, flowing royal cape, ornate throne, commanding presence, piercing cold gaze, elegant dark gown, gold jewelry, scepter in hand, powerful aura, dramatic lighting, throne room setting', '高贵女王、金色皇冠、飘逸皇家斗篷、华丽王座、威严气场、锐利冰冷目光、优雅深色长裙、黄金珠宝、手持权杖、强大气场、戏剧性光照、王座大厅背景', '女王最经典的视觉形象：皇冠权杖王座上的高贵统治者');

-- 病娇 - 经典形象
INSERT INTO prompts (title, category_id, prompt, prompt_cn, description) VALUES
('经典病娇形象', 'appearance-yandere', 'yandere girl, sweet loving smile with crazed obsessed eyes, holding a sharp knife behind back, school uniform with blood splatter, dual personality, one eye normal one eye shadowed, pink hair half covering face, dangerous innocent look, red and pink color scheme', '病娇少女、甜美深情微笑配疯狂执念眼神、背后藏着锋利刀具、带血迹的校服、双重人格、一只眼正常一只眼阴影、粉色半遮面、危险纯真外观、红粉配色', '病娇最经典的视觉形象：甜美微笑背后藏着疯狂的执念少女');

-- 元气少女 - 经典形象
INSERT INTO prompts (title, category_id, prompt, prompt_cn, description) VALUES
('经典元气少女形象', 'appearance-genki', 'energetic genki girl, short messy bob hair, bright wide smile, sparkling eyes, raised fist cheering pose, school uniform with loose ribbon, dynamic jumping pose, sunlight backlight, vibrant energy, sports shoes, enthusiastic expression, star-shaped hair clip', '元气少女、短乱波波头、明亮灿烂笑容、闪闪眼睛、举拳加油姿势、校服松散领结、动态跳跃姿势、阳光逆光、活力四射、运动鞋、热情表情、星星发夹', '元气少女最经典的视觉形象：阳光活力充满能量的少女');

-- 天然呆 - 经典形象
INSERT INTO prompts (title, category_id, prompt, prompt_cn, description) VALUES
('经典天然呆形象', 'appearance-airhead', 'airhead girl, head tilted in confusion, wide blank innocent eyes, finger on chin thinking pose, slightly open mouth, messy casual hair, oversized sweater, soft dreamy expression, question mark floating nearby, warm soft lighting, endearing clueless look', '天然呆少女、歪头困惑、大大空白纯真眼睛、手指托腮思考姿势、微张嘴巴、凌乱休闲发型、宽松毛衣、柔和梦幻表情、旁边漂浮问号、温暖柔光、迷人茫然表情', '天然呆最经典的视觉形象：歪头茫然可爱呆萌的少女');

-- 傲娇 - 经典形象
INSERT INTO prompts (title, category_id, prompt, prompt_cn, description) VALUES
('经典傲娇形象', 'appearance-tsundere', 'tsundere girl, looking away with blushing red cheeks, crossed arms in defensive pose, angry pout expression, twintails bouncing, school uniform, one eye glancing back, hmph expression, soft pink blush, dynamic hair movement, embarrassed but caring', '傲娇少女、红着脸别过头、交叉双臂防御姿态、生气嘟嘴表情、双马尾弹跳、校服、一只眼偷偷回看、哼的表情、柔和粉色红晕、动态发丝飘动、尴尬但关心', '傲娇最经典的视觉形象：红着脸别过头嘴上说不要的少女');

-- 辣妹 - 经典形象
INSERT INTO prompts (title, category_id, prompt, prompt_cn, description) VALUES
('经典辣妹形象', 'appearance-gyaru', 'classic gyaru girl, tanned skin, long bleached blonde hair with extensions, dramatic makeup with long eyelashes, trendy crop top, mini skirt, platform shoes, nail art, colorful accessories, confident pose, bright flash photography, urban street background', '经典辣妹、小麦色皮肤、长漂染金发接发、浓妆长睫毛、潮流短上衣、迷你裙、厚底鞋、美甲、多彩配饰、自信姿势、明亮闪光摄影、城市街头背景', '辣妹最经典的视觉形象：小麦色皮肤金发浓妆的潮流少女');

-- 邻家女孩 - 经典形象
INSERT INTO prompts (title, category_id, prompt, prompt_cn, description) VALUES
('经典邻家女孩形象', 'appearance-girlnextdoor', 'classic girl next door, natural beauty no makeup, soft brown hair in casual ponytail, simple white t-shirt and denim shorts, warm genuine smile, sitting on porch steps, golden hour sunlight, relaxed comfortable pose, approachable friendly expression, suburban house background', '经典邻家女孩、素颜自然美、柔和棕色头发随意马尾、简单白T恤牛仔短裤、温暖真诚微笑、坐在门廊台阶上、黄金时刻阳光、放松舒适姿势、平易近人友好表情、郊区房屋背景', '邻家女孩最经典的视觉形象：朴素自然温暖亲切的邻家少女');
