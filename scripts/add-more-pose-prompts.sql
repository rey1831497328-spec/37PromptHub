-- 为日常姿势添加5个新提示词
INSERT INTO prompts (title, category_id, prompt, prompt_cn, description) VALUES
('伸懒腰', 'pose-daily', 'stretching pose, arms raised above head, back arched, yawning, morning stretch, relaxed muscles', '伸懒腰姿势、双臂举过头顶、背部弯曲、打哈欠、早晨伸展、放松肌肉', '伸懒腰的放松姿势'),
('看手机', 'pose-daily', 'looking at phone pose, holding smartphone, head tilted down, casual stance, browsing phone, modern daily life', '看手机姿势、手持智能手机、低头倾斜、随意站姿、浏览手机、现代日常生活', '看手机的日常姿势'),
('喝饮料', 'pose-daily', 'drinking pose, holding cup or bottle, sipping beverage, casual stance, refreshing drink, relaxed posture', '喝饮料姿势、手持杯子或瓶子、啜饮饮料、随意站姿、清爽饮品、放松姿态', '喝饮料的休闲姿势'),
('整理头发', 'pose-daily', 'fixing hair pose, hand touching hair, grooming gesture, casual stance, adjusting hairstyle, natural movement', '整理头发姿势、手触摸头发、整理手势、随意站姿、调整发型、自然动作', '整理头发的日常动作'),
('背手站立', 'pose-daily', 'hands behind back pose, arms crossed behind, formal stance, confident posture, contemplative position, mature pose', '背手站立姿势、双手背后交叉、正式站姿、自信姿态、沉思姿势、成熟姿势', '双手背后的站立姿势');

-- 为战斗姿势添加5个新提示词
INSERT INTO prompts (title, category_id, prompt, prompt_cn, description) VALUES
('拔剑姿势', 'pose-combat', 'drawing sword pose, hand on hilt, ready to draw, dramatic stance, warrior position, intense focus', '拔剑姿势、手握剑柄、准备拔剑、戏剧性站姿、战士姿态、专注', '拔剑出鞘的准备姿势'),
('后撤步', 'pose-combat', 'retreating pose, stepping backward, defensive retreat, creating distance, tactical withdrawal, cautious stance', '后撤步姿势、向后迈步、防御性后退、拉开距离、战术撤退、谨慎姿态', '后撤保持距离的姿势'),
('跳跃攻击', 'pose-combat', 'jumping attack pose, mid-air strike, aerial assault, dynamic combat, diving attack, aggressive leap', '跳跃攻击姿势、空中打击、空中突袭、动态战斗、俯冲攻击、侵略性跳跃', '空中跳跃攻击姿势'),
('格挡反击', 'pose-combat', 'parry counter pose, deflecting blow, immediate counterattack, defensive offense, quick reflex, skilled fighter', '格挡反击姿势、偏转攻击、立即反击、防御性进攻、快速反应、熟练战士', '格挡后立即反击的姿势'),
('蓄力魔法', 'pose-combat', 'casting spell pose, channeling magic, hands gathering energy, mystical stance, glowing aura, power concentration', '施法姿势、引导魔法、双手聚集能量、神秘站姿、发光光环、力量集中', '蓄力施放魔法的姿势');

-- 为情绪姿势添加5个新提示词
INSERT INTO prompts (title, category_id, prompt, prompt_cn, description) VALUES
('得意洋洋', 'pose-emotion', 'smug pose, triumphant stance, hands on hips, chin raised, proud expression, satisfied posture', '得意姿势、凯旋姿态、双手叉腰、下巴抬起、骄傲表情、满足姿态', '得意洋洋的自信姿势'),
('紧张不安', 'pose-emotion', 'nervous pose, anxious stance, fidgeting hands, worried expression, uneasy posture, tense body language', '紧张姿势、焦虑姿态、不安地摆弄双手、担忧表情、不安姿态、紧绷的肢体语言', '紧张不安的焦虑姿势'),
('感动流泪', 'pose-emotion', 'moved to tears pose, hand on chest, emotional expression, touched posture, heartfelt moment, crying happy tears', '感动流泪姿势、手放在胸口、感动表情、触动姿态、真挚时刻、喜极而泣', '感动流泪的情绪姿势'),
('无聊发呆', 'pose-emotion', 'bored pose, blank stare, slouched posture, disinterested expression, listless stance, daydreaming', '无聊姿势、茫然凝视、懒散姿态、无兴趣表情、无精打采站姿、发呆', '无聊发呆的懒散姿势'),
('期待盼望', 'pose-emotion', 'hopeful pose, looking forward, eager stance, anticipating expression, excited waiting, forward lean', '期待姿势、向前看、渴望姿态、期盼表情、兴奋等待、身体前倾', '期待盼望的渴望姿势');

-- 为运动姿势添加5个新提示词
INSERT INTO prompts (title, category_id, prompt, prompt_cn, description) VALUES
('滑板姿势', 'pose-sports', 'skateboarding pose, riding skateboard, balanced stance, urban sports, cool trick pose, dynamic balance', '滑板姿势、骑滑板、平衡站姿、城市运动、酷炫技巧姿势、动态平衡', '滑板运动的帅气姿势'),
('篮球投篮', 'pose-sports', 'basketball shooting pose, jump shot, ball above head, athletic form, scoring position, dynamic leap', '篮球投篮姿势、跳投、球举过头顶、运动姿势、得分位置、动态跳跃', '篮球投篮的运动姿势'),
('骑自行车', 'pose-sports', 'cycling pose, riding bicycle, forward lean, athletic position, pedaling motion, dynamic speed', '骑自行车姿势、骑单车、身体前倾、运动姿势、踩踏动作、动态速度', '骑自行车的运动姿势'),
('滑雪姿势', 'pose-sports', 'skiing pose, crouched position, poles in hands, winter sports, downhill stance, athletic balance', '滑雪姿势、蹲伏姿势、手持雪杖、冬季运动、下坡站姿、运动平衡', '滑雪运动的动感姿势'),
('拳击姿势', 'pose-sports', 'boxing stance, guard position, fists up, athletic posture, fighter pose, ready to punch', '拳击站姿、防守姿势、拳头举起、运动姿态、格斗者姿势、准备出拳', '拳击运动的专业姿势');

-- 为互动姿势添加5个新提示词
INSERT INTO prompts (title, category_id, prompt, prompt_cn, description) VALUES
('击拳致意', 'pose-interaction', 'fist bump pose, knuckles touching, friendly gesture, casual greeting, bro fist, solidarity moment', '击拳致意姿势、指关节相触、友好手势、随意问候、兄弟拳、团结时刻', '击拳致意的友好姿势'),
('公主抱', 'pose-interaction', 'princess carry pose, carrying in arms, romantic gesture, strong lift, intimate position, fairy tale moment', '公主抱姿势、抱在怀中、浪漫手势、有力托举、亲密姿势、童话时刻', '公主抱的浪漫姿势'),
('背起姿势', 'pose-interaction', 'piggyback pose, carrying on back, playful position, fun interaction, supportive stance, friendly carry', '背起姿势、背在背上、俏皮姿势、有趣互动、支持姿态、友好背负', '背起对方的俏皮姿势'),
('比心手势', 'pose-interaction', 'finger heart pose, making heart shape, cute gesture, k-pop style, friendly interaction, adorable pose', '比心手势姿势、做出心形、可爱手势、韩式风格、友好互动、萌萌姿势', '比心手势的可爱姿势'),
('握手姿势', 'pose-interaction', 'handshake pose, shaking hands, formal greeting, business interaction, agreement gesture, professional stance', '握手姿势、握住双手、正式问候、商务互动、协议手势、专业姿态', '握手的正式姿势');
