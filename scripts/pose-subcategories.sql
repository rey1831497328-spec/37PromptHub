-- 创建姿势子分类
INSERT INTO categories (id, name, icon, description, parent_id) VALUES
('pose-daily', '日常姿势', 'User', '日常生活中的常见姿势，如站立、坐姿、行走等', 'pose'),
('pose-combat', '战斗姿势', 'Activity', '战斗场景中的攻击、防御、闪避等姿势', 'pose'),
('pose-emotion', '情绪姿势', 'Smile', '表达各种情绪的身体姿态', 'pose'),
('pose-sports', '运动姿势', 'Activity', '各种体育运动中的动作姿势', 'pose'),
('pose-interaction', '互动姿势', 'Users', '人物之间的互动姿态，如拥抱、牵手等', 'pose');

-- 日常姿势提示词
INSERT INTO prompts (title, category_id, prompt, prompt_cn, description) VALUES
('自然站立', 'pose-daily', 'natural standing pose, relaxed stance, upright posture, casual standing, full body, balanced position', '自然站立姿势、放松站姿、挺直姿态、随意站立、全身、平衡姿势', '最基础的日常站立姿势'),
('舒适坐姿', 'pose-daily', 'sitting pose, comfortable seated position, relaxed posture, casual sitting, legs crossed or natural position', '坐姿、舒适坐姿、放松姿态、随意坐姿、盘腿或自然姿势', '舒适的日常坐姿'),
('行走姿态', 'pose-daily', 'walking pose, mid-stride, natural gait, casual walking, one foot forward, arm swing', '行走姿势、迈步中、自然步态、随意行走、一脚在前、手臂摆动', '自然的行走动作'),
('倚靠姿势', 'pose-daily', 'leaning pose, leaning against wall, casual lean, relaxed posture, one leg crossed, cool stance', '倚靠姿势、靠墙站立、随意倚靠、放松姿态、单腿交叉、酷炫站姿', '慵懒的倚靠姿势'),
('蹲姿', 'pose-daily', 'squatting pose, crouching position, kneeling on one knee, casual squat, balanced low position', '蹲姿、蹲下姿势、单膝跪地、随意蹲下、平衡低姿态', '蹲下的日常姿势'),
('躺卧姿势', 'pose-daily', 'lying pose, reclining position, relaxed lying down, casual recline, comfortable position', '躺姿、卧姿、放松躺下、随意躺卧、舒适姿势', '放松的躺卧姿态'),
('双手插兜', 'pose-daily', 'hands in pockets pose, casual stance, relaxed posture, confident standing, street style pose', '双手插兜姿势、随意站姿、放松姿态、自信站立、街头风格姿势', '双手插兜的休闲姿势'),
('抱臂姿势', 'pose-daily', 'arms crossed pose, folded arms stance, confident posture, thoughtful pose, casual crossed arms', '抱臂姿势、双臂交叉站姿、自信姿态、沉思姿势、随意抱臂', '双臂交叉的自信姿势');

-- 战斗姿势提示词
INSERT INTO prompts (title, category_id, prompt, prompt_cn, description) VALUES
('战斗准备', 'pose-combat', 'combat ready pose, fighting stance, defensive position, alert posture, prepared for battle, intense gaze', '战斗准备姿势、战斗站姿、防御姿态、警戒姿势、备战状态、锐利眼神', '准备战斗的警戒姿势'),
('攻击姿态', 'pose-combat', 'attacking pose, offensive stance, striking position, mid-attack, aggressive posture, dynamic action', '攻击姿势、进攻姿态、出击姿势、攻击中、侵略性姿势、动态动作', '发起攻击的瞬间'),
('防御格挡', 'pose-combat', 'defensive pose, blocking stance, guard position, protective posture, shielding, braced for impact', '防御姿势、格挡姿态、防守姿势、保护姿态、掩护、准备承受冲击', '防御格挡的姿势'),
('闪避动作', 'pose-combat', 'dodging pose, evasive maneuver, sidestepping, leaning back to dodge, agile movement, quick reflex', '闪避姿势、躲避动作、侧步、后仰躲避、敏捷动作、快速反应', '躲避攻击的闪避动作'),
('蓄力姿势', 'pose-combat', 'charging pose, power gathering stance, building energy, tense muscles, preparing for ultimate attack, focused', '蓄力姿势、聚能姿态、积蓄能量、紧绷肌肉、准备终极攻击、专注', '蓄力准备大招'),
('受击姿势', 'pose-combat', 'hit reaction pose, taking damage, impact pose, knocked back, staggered stance, pain expression', '受击反应姿势、受到伤害、冲击姿势、被击退、踉跄姿态、痛苦表情', '被击中时的反应'),
('胜利姿态', 'pose-combat', 'victory pose, triumphant stance, winner posture, celebrating win, confident pose, heroic stance', '胜利姿势、凯旋姿态、胜者姿势、庆祝胜利、自信姿势、英雄姿态', '胜利后的庆祝姿势'),
('双持武器', 'pose-combat', 'dual wielding pose, two weapons stance, dual blade pose, balanced combat stance, agile fighter posture', '双持姿势、双武器姿态、双刀姿势、平衡战斗站姿、敏捷战士姿态', '双持武器的战斗姿势');

-- 情绪姿势提示词
INSERT INTO prompts (title, category_id, prompt, prompt_cn, description) VALUES
('开心欢呼', 'pose-emotion', 'joyful pose, cheering stance, arms raised in celebration, happy posture, excited expression, energetic pose', '开心姿势、欢呼姿态、双臂高举庆祝、快乐姿势、兴奋表情、活力姿势', '开心欢呼的姿势'),
('悲伤低头', 'pose-emotion', 'sad pose, head down, dejected posture, slumped shoulders, melancholic stance, sorrowful expression', '悲伤姿势、低头、沮丧姿态、肩膀下垂、忧郁站姿、悲伤表情', '悲伤沮丧的姿态'),
('愤怒爆发', 'pose-emotion', 'angry pose, rage stance, clenched fists, aggressive posture, furious expression, tense muscles', '愤怒姿势、暴怒姿态、紧握双拳、侵略性姿势、愤怒表情、紧绷肌肉', '愤怒爆发的姿势'),
('惊讶反应', 'pose-emotion', 'surprised pose, shock stance, hands on face, mouth open, startled posture, wide eyes expression', '惊讶姿势、震惊姿态、双手捂脸、嘴巴张开、惊吓姿势、瞪大眼睛表情', '惊讶震惊的反应'),
('害羞腼腆', 'pose-emotion', 'shy pose, bashful stance, looking down, hands together, blushing expression, timid posture, cute pose', '害羞姿势、腼腆姿态、低头看、双手交握、脸红表情、羞怯姿势、可爱姿势', '害羞腼腆的姿态'),
('自信骄傲', 'pose-emotion', 'confident pose, proud stance, chin up, hands on hips, self-assured posture, smug expression, heroic', '自信姿势、骄傲姿态、下巴抬起、双手叉腰、自信姿态、得意表情、英雄气概', '自信骄傲的姿势'),
('思考沉思', 'pose-emotion', 'thinking pose, contemplative stance, hand on chin, thoughtful expression, pondering posture, focused gaze', '思考姿势、沉思姿态、手托下巴、深思表情、思考姿势、专注凝视', '思考沉思的姿态'),
('害怕颤抖', 'pose-emotion', 'scared pose, fearful stance, trembling, protective posture, cowering, anxious expression, defensive position', '害怕姿势、恐惧姿态、颤抖、保护姿态、蜷缩、焦虑表情、防御姿势', '害怕恐惧的反应');

-- 运动姿势提示词
INSERT INTO prompts (title, category_id, prompt, prompt_cn, description) VALUES
('奔跑冲刺', 'pose-sports', 'running pose, sprinting stance, full speed running, athletic posture, dynamic movement, forward momentum', '奔跑姿势、冲刺姿态、全速奔跑、运动姿势、动态动作、向前的冲劲', '全力奔跑的冲刺姿势'),
('跳跃腾空', 'pose-sports', 'jumping pose, mid-air suspension, leaping stance, athletic jump, dynamic height, suspended in air', '跳跃姿势、空中悬停、跳跃姿态、运动跳跃、动态高度、空中悬浮', '跳跃腾空的瞬间'),
('攀爬姿势', 'pose-sports', 'climbing pose, scaling position, gripping surface, upward movement, athletic climb, reaching up', '攀爬姿势、攀登姿态、抓握表面、向上移动、运动攀爬、向上伸展', '攀爬向上的姿势'),
('翻滚动作', 'pose-sports', 'rolling pose, tumbling stance, mid-roll, acrobatic movement, dynamic rotation, athletic agility', '翻滚姿势、翻滚姿态、翻滚中、杂技动作、动态旋转、运动敏捷', '翻滚动作的动态'),
('投掷姿势', 'pose-sports', 'throwing pose, pitching stance, arm extended, follow through motion, athletic throw, focused aim', '投掷姿势、投球姿态、手臂伸展、随挥动作、运动投掷、专注瞄准', '投掷物体的姿势'),
('接球准备', 'pose-sports', 'catching pose, ready to catch stance, arms extended forward, focused on object, athletic reception, prepared', '接球姿势、准备接球姿态、双臂前伸、专注物体、运动接球、准备就绪', '准备接球的姿势'),
('游泳姿态', 'pose-sports', 'swimming pose, stroke position, arm extended forward, streamlined body, aquatic movement, freestyle pose', '游泳姿势、划水姿态、手臂前伸、流线型身体、水中动作、自由泳姿势', '游泳划水的姿态'),
('瑜伽体式', 'pose-sports', 'yoga pose, balanced stance, flexible posture, meditative position, graceful form, controlled breathing pose', '瑜伽姿势、平衡站姿、柔韧姿态、冥想姿势、优雅形态、控制呼吸姿势', '瑜伽练习的体式');

-- 互动姿势提示词
INSERT INTO prompts (title, category_id, prompt, prompt_cn, description) VALUES
('拥抱姿态', 'pose-interaction', 'hugging pose, embrace stance, arms around each other, warm hug, affectionate posture, close together', '拥抱姿势、拥抱姿态、双臂环绕、温暖拥抱、亲密姿势、紧紧相依', '两人拥抱的温馨姿势'),
('牵手同行', 'pose-interaction', 'holding hands pose, walking together, hand in hand stance, side by side, connected posture, romantic walk', '牵手姿势、牵手同行、手牵手姿态、并肩而行、连接姿势、浪漫漫步', '牵手并肩的姿势'),
('击掌庆祝', 'pose-interaction', 'high five pose, hands meeting in air, celebration stance, excited interaction, friendly gesture, success moment', '击掌姿势、双手空中相击、庆祝姿态、兴奋互动、友好手势、成功时刻', '击掌庆祝的互动'),
('背靠背站立', 'pose-interaction', 'back to back pose, standing back to back, supportive stance, ready for action, trust posture, partners', '背靠背姿势、背对背站立、支持姿态、准备行动、信任姿势、搭档', '背靠背的搭档姿势'),
('搭肩姿势', 'pose-interaction', 'arm around shoulder pose, friendly stance, casual interaction, buddy pose, supportive gesture, camaraderie', '搭肩姿势、友好姿态、随意互动、伙伴姿势、支持手势、 camaraderie', '朋友间搭肩的姿势'),
('对视凝视', 'pose-interaction', 'facing each other pose, eye contact stance, intimate gaze, romantic posture, deep connection, emotional moment', '对视姿势、眼神接触姿态、深情凝视、浪漫姿势、深度连接、情感时刻', '两人对视的深情姿势'),
('牵手起舞', 'pose-interaction', 'dancing together pose, holding hands dance, spinning movement, graceful interaction, romantic dance, flowing motion', '共舞姿势、牵手舞蹈、旋转动作、优雅互动、浪漫舞蹈、流畅动作', '牵手共舞的浪漫姿势'),
('保护姿态', 'pose-interaction', 'protective pose, shielding stance, arm extended to protect, guardian posture, defensive interaction, caring gesture', '保护姿势、保护姿态、手臂伸展保护、守护者姿势、防御性互动、关怀手势', '保护他人的姿势');
