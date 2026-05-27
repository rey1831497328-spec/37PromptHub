-- 在人物外观(appearance)分类下创建人物类型子分类
INSERT INTO categories (id, name, icon, description, parent_id) VALUES
('appearance-oneesan', '御姐', 'User', '成熟性感的大姐姐类型，气质优雅、自信迷人', 'appearance'),
('appearance-sweetgirl', '甜妹', 'Smile', '甜美可爱的女孩类型，软萌可人、笑容治愈', 'appearance'),
('appearance-loli', '萝莉', 'Sparkles', '幼小可爱的女孩类型，娇小身材、天真无邪', 'appearance'),
('appearance-queen', 'Crown', '女王', '强势霸道的女性类型，冷艳高贵、气场强大', 'appearance'),
('appearance-yandere', 'Ban', '病娇', '病态依恋型，表面温柔、内心偏执', 'appearance'),
('appearance-genki', 'Activity', '元气少女', '充满活力的女孩类型，笑容灿烂、积极乐观', 'appearance'),
('appearance-airhead', 'Smile', '天然呆', '呆萌迟钝的女孩类型，反应慢半拍、单纯无辜', 'appearance'),
('appearance-tsundere', 'User', '傲娇', '外冷内热类型，嘴上不饶人、内心关心对方', 'appearance'),
('appearance-gyaru', 'Palette', '辣妹', '时尚前卫的女孩类型，浓妆潮流、外向活泼', 'appearance'),
('appearance-girlnextdoor', 'Sun', '邻家女孩', '亲切平易近人的类型，朴素自然、温柔体贴', 'appearance');

-- 御姐 - 10个提示词
INSERT INTO prompts (title, category_id, prompt, prompt_cn, description) VALUES
('成熟御姐', 'appearance-oneesan', 'mature woman, elegant lady, sophisticated beauty, confident posture, refined features, alluring gaze', '成熟女性、优雅女士、精致美人、自信姿态、精致五官、迷人目光', '成熟优雅的御姐'),
('职场御姐', 'appearance-oneesan', 'office lady, professional beauty, business suit, sharp gaze, competent aura, elegant hairstyle', '职场女性、职业美人、商务套装、锐利目光、干练气场、优雅发型', '职场精英御姐'),
('性感御姐', 'appearance-oneesan', 'sexy mature woman, voluptuous figure, seductive eyes, confident smile, alluring charm, feminine grace', '性感成熟女性、丰满身材、魅惑眼神、自信微笑、诱人魅力、女性优雅', '性感迷人的御姐'),
('高冷御姐', 'appearance-oneesan', 'cold beauty, aloof goddess, distant gaze, proud posture, elegant demeanor, untouchable aura', '冷艳美人、高冷女神、疏离目光、傲人姿态、优雅风度、不可侵犯气场', '高冷傲气的御姐'),
('温柔御姐', 'appearance-oneesan', 'gentle mature woman, caring sister type, warm smile, nurturing aura, elegant kindness', '温柔成熟女性、关怀姐姐型、温暖微笑、母性气场、优雅善良', '温柔体贴的御姐'),
('黑长直御姐', 'appearance-oneesan', 'black long straight hair, mature beauty, elegant oriental features, sophisticated style, graceful posture', '黑色长直发、成熟美人、优雅东方五官、精致风格、优美姿态', '黑长发的古典御姐'),
('眼镜御姐', 'appearance-oneesan', 'woman with glasses, intellectual beauty, sophisticated look, elegant frames, mature charm, professional aura', '戴眼镜女性、知性美人、精致外表、优雅镜框、成熟魅力、专业气场', '戴眼镜的知性御姐'),
('和服御姐', 'appearance-oneesan', 'mature woman in kimono, elegant traditional beauty, graceful posture, refined manners, oriental charm', '穿和服的成熟女性、优雅传统美人、优美姿态、精致举止、东方魅力', '穿和服的日式御姐'),
('晚礼服御姐', 'appearance-oneesan', 'evening gown beauty, sophisticated lady, elegant dress, glamorous makeup, confident stance, high class aura', '晚礼服美人、精致女士、优雅裙装、迷人妆容、自信站姿、高贵气场', '穿晚礼服的高贵御姐'),
('战斗御姐', 'appearance-oneesan', 'mature warrior woman, strong female fighter, confident combat pose, powerful aura, elegant strength', '成熟战斗女性、强大女战士、自信战斗姿态、强大气场、优雅力量', '强大优雅的战斗御姐');

-- 甜妹 - 10个提示词
INSERT INTO prompts (title, category_id, prompt, prompt_cn, description) VALUES
('甜美少女', 'appearance-sweetgirl', 'sweet girl, adorable face, gentle smile, soft features, innocent eyes, lovely charm', '甜美少女、可爱面容、温柔微笑、柔和五官、纯真眼神、可爱魅力', '甜美可人的少女'),
('粉色甜妹', 'appearance-sweetgirl', 'pink themed sweet girl, pastel colors, cute fashion, rosy cheeks, gentle gaze, lovely outfit', '粉色系甜妹、 pastel 色彩、可爱时尚、红润脸颊、温柔目光、可爱服装', '粉色系的甜妹'),
('双马尾甜妹', 'appearance-sweetgirl', 'twin tails sweet girl, cute hairstyle, bouncy hair, youthful energy, adorable smile, playful charm', '双马尾甜妹、可爱发型、弹跳发丝、青春活力、可爱微笑、俏皮魅力', '双马尾的活泼甜妹'),
('软萌甜妹', 'appearance-sweetgirl', 'soft cute girl, marshmallow-like softness, round face, big innocent eyes, gentle aura, huggable look', '软萌女孩、棉花糖般柔软、圆脸、大大纯真眼睛、温柔气场、想拥抱的样子', '软萌可爱的甜妹'),
('糖果甜妹', 'appearance-sweetgirl', 'candy-themed sweet girl, colorful cute fashion, sweet accessories, cheerful smile, vibrant energy', '糖果主题甜妹、多彩可爱时尚、甜美配饰、开朗微笑、活力四射', '糖果风格的甜妹'),
('洛丽塔甜妹', 'appearance-sweetgirl', 'lolita fashion sweet girl, frilly dress, cute bonnet, doll-like features, innocent elegance, kawaii style', '洛丽塔时尚甜妹、褶边裙、可爱帽子、娃娃般五官、纯真优雅、可爱风格', '洛丽塔风格的甜妹'),
('邻家甜妹', 'appearance-sweetgirl', 'girl next door sweet type, natural cuteness, warm smile, approachable charm, casual cute style', '邻家女孩甜美型、自然可爱、温暖微笑、平易近人魅力、休闲可爱风格', '邻家风格的甜妹'),
('校园甜妹', 'appearance-sweetgirl', 'school girl sweet type, cute uniform, youthful innocence, bright smile, energetic charm, student vibe', '校园女孩甜美型、可爱制服、青春纯真、明亮微笑、活力魅力、学生气息', '校园风格的甜妹'),
('花仙子甜妹', 'appearance-sweetgirl', 'flower fairy sweet girl, floral accessories, nature theme, ethereal beauty, gentle grace, blooming charm', '花仙子甜妹、花朵配饰、自然主题、空灵美貌、温柔优雅、绽放魅力', '花仙子主题的甜妹'),
('甜品甜妹', 'appearance-sweetgirl', 'dessert-themed sweet girl, cake and pastry motifs, whipped cream aesthetics, sugary cute, sweet fashion', '甜品主题甜妹、蛋糕点心元素、奶油美学、甜美可爱、甜蜜时尚', '甜品主题的甜妹');

-- 萝莉 - 10个提示词
INSERT INTO prompts (title, category_id, prompt, prompt_cn, description) VALUES
('天真萝莉', 'appearance-loli', 'innocent loli, childlike purity, big round eyes, small stature, cute dress, naive charm', '天真萝莉、孩子般纯真、大大圆眼睛、娇小身材、可爱裙子、天真魅力', '天真无邪的萝莉'),
('哥特萝莉', 'appearance-loli', 'gothic loli, dark cute fashion, black frilly dress, mysterious charm, doll-like beauty, elegant darkness', '哥特萝莉、暗黑可爱时尚、黑色褶边裙、神秘魅力、娃娃般美貌、优雅黑暗', '哥特风格的萝莉'),
('甜美萝莉', 'appearance-loli', 'sweet loli, pastel dress, cute bonnet, innocent smile, angelic features, gentle charm', '甜美萝莉、 pastel 色裙子、可爱帽子、纯真微笑、天使般五官、温柔魅力', '甜美可爱的萝莉'),
('猫耳萝莉', 'appearance-loli', 'cat ear loli, nekomimi, cute animal features, playful charm, small stature, adorable pose', '猫耳萝莉、猫耳、可爱动物特征、俏皮魅力、娇小身材、可爱姿势', '猫耳兽娘的萝莉'),
('魔法萝莉', 'appearance-loli', 'magical girl loli, cute wand, frilly costume, sparkling eyes, innocent magic, youthful power', '魔法少女萝莉、可爱魔杖、褶边服装、闪亮眼睛、纯真魔法、年轻力量', '魔法少女类型的萝莉'),
('和服萝莉', 'appearance-loli', 'loli in kimono, traditional cute, small stature, innocent beauty, cultural charm, youthful grace', '穿和服的萝莉、传统可爱、娇小身材、纯真美貌、文化魅力、年轻优雅', '穿和服的日式萝莉'),
('公主萝莉', 'appearance-loli', 'princess loli, royal cute fashion, tiara, elegant dress, innocent royalty, charming nobility', '公主萝莉、皇家可爱时尚、小皇冠、优雅裙子、纯真皇室、迷人贵族气质', '公主风格的萝莉'),
('书虫萝莉', 'appearance-loli', 'bookworm loli, glasses, intelligent cute, reading pose, innocent wisdom, scholarly charm', '书虫萝莉、眼镜、知性可爱、阅读姿势、纯真智慧、学者魅力', '爱读书的知性萝莉'),
('睡裙萝莉', 'appearance-loli', 'sleepwear loli, cute pajamas, bedtime charm, innocent comfort, soft fabrics, gentle rest', '睡裙萝莉、可爱睡衣、 bedtime 魅力、纯真舒适、柔软面料、温柔休息', '穿睡衣的萝莉'),
('节日萝莉', 'appearance-loli', 'festival loli, holiday costume, seasonal cute, festive charm, innocent celebration, joyful youth', '节日萝莉、节日服装、季节可爱、节日魅力、纯真庆祝、快乐青春', '节日装扮的萝莉');

-- 女王 - 10个提示词
INSERT INTO prompts (title, category_id, prompt, prompt_cn, description) VALUES
('冷艳女王', 'appearance-queen', 'cold queen, icy beauty, regal posture, commanding presence, elegant authority, distant grace', '冷艳女王、冰冷美貌、皇室姿态、威严气场、优雅权威、疏离优雅', '冷艳高贵的女王'),
('战斗女王', 'appearance-queen', 'warrior queen, armored beauty, powerful stance, commanding battlefield, fierce elegance, royal strength', '战斗女王、装甲美人、强大站姿、指挥战场、凶猛优雅、皇室力量', '战斗型的女王'),
('暗夜女王', 'appearance-queen', 'dark queen, mysterious beauty, shadowy elegance, commanding darkness, seductive power, night aura', '暗夜女王、神秘美貌、阴影优雅、指挥黑暗、诱人力量、夜晚气场', '暗夜风格的女王'),
('冰雪女王', 'appearance-queen', 'ice queen, frozen beauty, pale elegance, commanding cold, crystal crown, winter authority', '冰雪女王、冰冻美貌、苍白优雅、指挥寒冷、水晶皇冠、冬季权威', '冰雪主题的女王'),
('吸血鬼女王', 'appearance-queen', 'vampire queen, immortal beauty, dark elegance, commanding bloodline, seductive danger, eternal grace', '吸血鬼女王、不朽美貌、黑暗优雅、指挥血统、诱人危险、永恒优雅', '吸血鬼风格的女王'),
('精灵女王', 'appearance-queen', 'elf queen, ethereal beauty, nature authority, commanding forest, elegant immortality, regal grace', '精灵女王、空灵美貌、自然权威、指挥森林、优雅不朽、皇室优雅', '精灵族的女王'),
('王座女王', 'appearance-queen', 'throne queen, seated authority, crown and scepter, commanding court, royal elegance, supreme power', '王座女王、坐姿权威、皇冠权杖、指挥宫廷、皇室优雅、至高力量', '坐在王座上的女王'),
('军装女王', 'appearance-queen', 'military queen, uniformed authority, commanding troops, sharp elegance, disciplined power, regal command', '军装女王、制服权威、指挥军队、锐利优雅、纪律力量、皇室指挥', '军装风格的女王'),
('旗袍女王', 'appearance-queen', 'queen in qipao, oriental authority, commanding elegance, traditional power, cultural grace, regal beauty', '旗袍女王、东方权威、指挥优雅、传统力量、文化优雅、皇室美貌', '穿旗袍的东方女王'),
('黑化女王', 'appearance-queen', 'fallen queen, dark transformation, commanding corruption, elegant madness, powerful vengeance, regal fury', '黑化女王、黑暗转变、指挥腐化、优雅疯狂、强大复仇、皇室愤怒', '黑化堕落的女王');

-- 病娇 - 10个提示词
INSERT INTO prompts (title, category_id, prompt, prompt_cn, description) VALUES
('经典病娇', 'appearance-yandere', 'classic yandere, obsessive love, sweet smile hiding darkness, intense gaze, unstable charm, dangerous affection', '经典病娇、执念之爱、甜美微笑隐藏黑暗、强烈目光、不稳定魅力、危险情感', '经典病娇类型'),
('刀病娇', 'appearance-yandere', 'yandere with weapon, knife-wielding obsession, sweet danger, loving threat, unstable protection, deadly affection', '持刀病娇、持刀执念、甜美危险、爱的威胁、不稳定保护、致命情感', '持刀的病娇'),
('跟踪病娇', 'appearance-yandere', 'stalking yandere, obsessive watching, hidden presence, intense fixation, loving pursuit, dangerous devotion', '跟踪病娇、执念观察、隐藏存在、强烈 fixation、爱的追求、危险忠诚', '跟踪狂类型的病娇'),
('黑化病娇', 'appearance-yandere', 'darkened yandere, corrupted love, shadow transformation, obsessive darkness, loving madness, dangerous transformation', '黑化病娇、腐化之爱、阴影转变、执念黑暗、爱的疯狂、危险转变', '黑化后的病娇'),
('可爱病娇', 'appearance-yandere', 'cute yandere, adorable obsession, sweet facade, hidden instability, loving danger, deceptive innocence', '可爱病娇、可爱执念、甜美外表、隐藏不稳定、爱的危险、欺骗性纯真', '外表可爱的病娇'),
('病娇学妹', 'appearance-yandere', 'kohai yandere, junior obsession, school setting, sweet senpai love, dangerous admiration, unstable devotion', '病娇学妹、后辈执念、校园背景、甜美前辈之爱、危险崇拜、不稳定忠诚', '学妹类型的病娇'),
('病娇护士', 'appearance-yandere', 'nurse yandere, medical obsession, healing love, dangerous care, sweet threat, unstable treatment', '病娇护士、医疗执念、治愈之爱、危险关怀、甜美威胁、不稳定治疗', '护士装扮的病娇'),
('病娇女仆', 'appearance-yandere', 'maid yandere, servant obsession, devoted love, dangerous loyalty, sweet service, unstable dedication', '病娇女仆、仆人执念、忠诚之爱、危险忠诚、甜美服务、不稳定奉献', '女仆装扮的病娇'),
('病娇公主', 'appearance-yandere', 'princess yandere, royal obsession, noble love, dangerous elegance, sweet authority, unstable royalty', '病娇公主、皇室执念、高贵之爱、危险优雅、甜美权威、不稳定皇室', '公主类型的病娇'),
('病娇天使', 'appearance-yandere', 'angel yandere, divine obsession, holy love, dangerous purity, sweet corruption, unstable divinity', '病娇天使、神圣执念、圣洁之爱、危险纯洁、甜美腐化、不稳定神性', '天使装扮的病娇');

-- 元气少女 - 10个提示词
INSERT INTO prompts (title, category_id, prompt, prompt_cn, description) VALUES
('运动元气', 'appearance-genki', 'athletic genki girl, sporty energy, bright smile, dynamic pose, healthy glow, energetic charm', '运动元气少女、运动活力、明亮微笑、动态姿势、健康光泽、活力魅力', '运动型的元气少女'),
('啦啦队元气', 'appearance-genki', 'cheerleader genki girl, pom-poms, encouraging smile, high energy pose, vibrant uniform, spirited charm', '啦啦队元气少女、啦啦球、鼓励微笑、高能量姿势、鲜艳制服、精神魅力', '啦啦队风格的元气少女'),
('偶像元气', 'appearance-genki', 'idol genki girl, stage presence, sparkling smile, energetic performance, cute costume, fan service pose', '偶像元气少女、舞台气场、闪亮微笑、活力表演、可爱服装、粉丝服务姿势', '偶像类型的元气少女'),
('校园元气', 'appearance-genki', 'school genki girl, uniform energy, bright smile, running pose, youthful vigor, academic spirit', '校园元气少女、制服活力、明亮微笑、奔跑姿势、青春活力、学术精神', '校园风格的元气少女'),
('夏日元气', 'appearance-genki', 'summer genki girl, sunny energy, beach vibe, bright bikini smile, tropical enthusiasm, vacation spirit', '夏日元气少女、阳光活力、海滩氛围、明亮比基尼微笑、热带热情、度假精神', '夏日海滩元气少女'),
('猫咪元气', 'appearance-genki', 'cat-themed genki girl, nekomimi energy, playful pose, bright smile, feline charm, energetic meow', '猫咪主题元气少女、猫耳活力、俏皮姿势、明亮微笑、猫咪魅力、活力喵叫', '猫咪主题的元气少女'),
('彩虹元气', 'appearance-genki', 'rainbow genki girl, colorful energy, vibrant fashion, bright smile, cheerful spectrum, happy aura', '彩虹元气少女、多彩活力、鲜艳时尚、明亮微笑、快乐光谱、幸福气场', '彩虹风格的元气少女'),
('早安元气', 'appearance-genki', 'morning genki girl, wake-up energy, pajama smile, stretching pose, fresh start, energetic greeting', '早安元气少女、起床活力、睡衣微笑、伸展姿势、新鲜开始、活力问候', '早晨起床的元气少女'),
('探险元气', 'appearance-genki', 'adventurer genki girl, exploration energy, outdoor gear, excited smile, discovery pose, adventurous spirit', '探险元气少女、探索活力、户外装备、兴奋微笑、发现姿势、冒险精神', '探险风格的元气少女'),
('美食元气', 'appearance-genki', 'food-loving genki girl, culinary energy, eating pose, satisfied smile, delicious joy, energetic appetite', '美食元气少女、烹饪活力、进食姿势、满足微笑、美味喜悦、活力食欲', '爱吃美食的元气少女');

-- 天然呆 - 10个提示词
INSERT INTO prompts (title, category_id, prompt, prompt_cn, description) VALUES
('经典天然呆', 'appearance-airhead', 'classic airhead, spaced out gaze, slow reaction, innocent confusion, cute misunderstanding, endearing blankness', '经典天然呆、茫然目光、慢反应、纯真困惑、可爱误解、迷人空白', '经典天然呆类型'),
('迷糊天然呆', 'appearance-airhead', 'clumsy airhead, tripping pose, confused expression, adorable mistake, endearing accident, sweet confusion', '迷糊天然呆、绊倒姿势、困惑表情、可爱错误、迷人意外、甜美困惑', '迷糊笨拙的天然呆'),
('吃货天然呆', 'appearance-airhead', 'food-loving airhead, eating distraction, satisfied blankness, culinary confusion, delicious daydream, sweet appetite', '吃货天然呆、进食分心、满足空白、烹饪困惑、美味白日梦、甜美食欲', '爱吃东西的天然呆'),
('睡眼天然呆', 'appearance-airhead', 'sleepy airhead, drowsy gaze, yawning confusion, bedhead hair, morning blankness, endearing tiredness', '睡眼天然呆、困倦目光、打哈欠困惑、 bedhead 发型、早晨空白、迷人困倦', ' sleepy 的天然呆'),
('书呆天然呆', 'appearance-airhead', 'bookworm airhead, reading distraction, academic confusion, lost in thought, scholarly blankness, cute intellect', '书呆天然呆、阅读分心、学术困惑、陷入思考、学者空白、可爱知性', '爱读书的天然呆'),
('动物天然呆', 'appearance-airhead', 'animal-loving airhead, pet distraction, cute creature confusion, furry fascination, endearing wildlife love', '动物爱好者天然呆、宠物分心、可爱生物困惑、毛茸茸迷恋、迷人野生动物爱', '喜欢动物的天然呆'),
('雨天天然呆', 'appearance-airhead', 'rainy day airhead, umbrella confusion, weather distraction, wet surprise, endearing meteorology, cute precipitation', '雨天天然呆、雨伞困惑、天气分心、 wet 惊喜、迷人气象学、可爱降水', '雨天里的天然呆'),
('迷路天然呆', 'appearance-airhead', 'lost airhead, direction confusion, map distraction, wandering blankness, endearing navigation, cute exploration', '迷路天然呆、方向困惑、地图分心、 wandering 空白、迷人导航、可爱探索', '迷路的天然呆'),
('花痴天然呆', 'appearance-airhead', 'lovestruck airhead, romantic distraction, crush confusion, dreamy gaze, endearing infatuation, cute admiration', '花痴天然呆、浪漫分心、 crush 困惑、梦幻目光、迷人迷恋、可爱崇拜', '花痴状态的天然呆'),
('工作天然呆', 'appearance-airhead', 'working airhead, job distraction, professional confusion, task blankness, endearing employment, cute career', '工作天然呆、工作分心、职业困惑、任务空白、迷人就业、可爱职业', '工作时的天然呆');

-- 傲娇 - 10个提示词
INSERT INTO prompts (title, category_id, prompt, prompt_cn, description) VALUES
('经典傲娇', 'appearance-tsundere', 'classic tsundere, tsun-tsun expression, blushing denial, crossed arms, embarrassed anger, cute hostility', '经典傲娇、 tsun-tsun 表情、红晕否认、交叉双臂、尴尬愤怒、可爱敌意', '经典傲娇类型'),
('大小姐傲娇', 'appearance-tsundere', 'ojou-sama tsundere, noble denial, haughty blush, refined anger, elegant tsundere, aristocratic embarrassment', '大小姐傲娇、高贵否认、傲慢红晕、优雅愤怒、精致傲娇、贵族尴尬', '大小姐类型的傲娇'),
('学妹傲娇', 'appearance-tsundere', 'kohai tsundere, junior denial, cute blush, respectful anger, youthful tsundere, adorable hostility', '学妹傲娇、后辈否认、可爱红晕、尊重愤怒、年轻傲娇、可爱敌意', '学妹类型的傲娇'),
('猫娘傲娇', 'appearance-tsundere', 'catgirl tsundere, nekomimi denial, feline blush, hissing anger, cute ears tsundere, adorable hostility', '猫娘傲娇、猫耳否认、猫咪红晕、嘶嘶愤怒、可爱耳朵傲娇、可爱敌意', '猫娘类型的傲娇'),
('战斗傲娇', 'appearance-tsundere', 'warrior tsundere, combat denial, battle blush, fierce anger, strong tsundere, powerful embarrassment', '战斗傲娇、战斗否认、战斗红晕、凶猛愤怒、强大傲娇、强力尴尬', '战斗型的傲娇'),
('魔法傲娇', 'appearance-tsundere', 'magical tsundere, spell denial, magical blush, witch anger, mystical tsundere, enchanting hostility', '魔法傲娇、魔法否认、魔法红晕、女巫愤怒、神秘傲娇、迷人敌意', '魔法类型的傲娇'),
('女仆傲娇', 'appearance-tsundere', 'maid tsundere, service denial, uniform blush, professional anger, domestic tsundere, cute hostility', '女仆傲娇、服务否认、制服红晕、专业愤怒、 domestic 傲娇、可爱敌意', '女仆类型的傲娇'),
('偶像傲娇', 'appearance-tsundere', 'idol tsundere, stage denial, performance blush, public anger, celebrity tsundere, fan-service hostility', '偶像傲娇、舞台否认、表演红晕、公众愤怒、名人傲娇、粉丝服务敌意', '偶像类型的傲娇'),
('青梅竹马傲娇', 'appearance-tsundere', 'childhood friend tsundere, familiar denial, nostalgic blush, friendly anger, intimate tsundere, close hostility', '青梅竹马傲娇、熟悉否认、怀旧红晕、友好愤怒、亲密傲娇、亲近敌意', '青梅竹马类型的傲娇'),
('转学生傲娇', 'appearance-tsundere', 'transfer student tsundere, new girl denial, unfamiliar blush, outsider anger, mysterious tsundere, transfer hostility', '转学生傲娇、新生否认、不熟悉红晕、 outsider 愤怒、神秘傲娇、转学敌意', '转学生类型的傲娇');

-- 辣妹 - 10个提示词
INSERT INTO prompts (title, category_id, prompt, prompt_cn, description) VALUES
('经典辣妹', 'appearance-gyaru', 'classic gyaru, tanned skin, bleached hair, heavy makeup, trendy fashion, confident attitude', '经典辣妹、晒黑皮肤、漂染头发、浓妆、潮流时尚、自信态度', '经典辣妹类型'),
('黑辣妹', 'appearance-gyaru', 'kogal gyaru, dark tan, school uniform style, gal fashion, youthful rebellion, trendy student', '黑辣妹、深色晒黑、校服风格、 gal 时尚、年轻叛逆、潮流学生', '黑皮肤的辣妹'),
('白辣妹', 'appearance-gyaru', 'white gyaru, pale skin, gyaru makeup, trendy fashion, elegant gal, sophisticated trendsetter', '白辣妹、苍白皮肤、辣妹妆容、潮流时尚、优雅 gal、精致潮流引领者', '白皮肤的辣妹'),
('运动辣妹', 'appearance-gyaru', 'sporty gyaru, athletic fashion, trendy sportswear, active gal, fitness trendsetter, energetic style', '运动辣妹、运动时尚、潮流运动装、活跃 gal、健身潮流引领者、活力风格', '运动风格的辣妹'),
('原宿辣妹', 'appearance-gyaru', 'harajuku gyaru, extreme fashion, colorful style, avant-garde gal, trendsetting look, bold expression', '原宿辣妹、极端时尚、多彩风格、前卫 gal、引领潮流外观、大胆表达', '原宿风格的辣妹'),
('哥特辣妹', 'appearance-gyaru', 'gothic gyaru, dark gyaru style, black trendy fashion, edgy gal, mysterious trendsetter, dark elegance', '哥特辣妹、暗黑辣妹风格、黑色潮流时尚、 edgy gal、神秘潮流引领者、黑暗优雅', '哥特风格的辣妹'),
('甜美辣妹', 'appearance-gyaru', 'hime gyaru, princess gal, elegant cute fashion, refined trendsetter, lovely gyaru, sophisticated sweetness', '甜美辣妹、公主 gal、优雅可爱时尚、精致潮流引领者、可爱辣妹、精致甜美', '甜美公主风的辣妹'),
('职场辣妹', 'appearance-gyaru', 'office gyaru, professional gal, business trendy fashion, career trendsetter, sophisticated office style', '职场辣妹、职业 gal、商务潮流时尚、职业潮流引领者、精致办公室风格', '职场风格的辣妹'),
('夏日辣妹', 'appearance-gyaru', 'summer gyaru, beach fashion, tropical gal style, vacation trendsetter, sunny gyaru, beachwear fashion', '夏日辣妹、海滩时尚、热带 gal 风格、度假潮流引领者、阳光辣妹、海滩装时尚', '夏日海滩辣妹'),
('复古辣妹', 'appearance-gyaru', 'retro gyaru, vintage gal style, nostalgic fashion, classic trendsetter, old-school gyaru, timeless style', '复古辣妹、复古 gal 风格、怀旧时尚、经典潮流引领者、老派辣妹、永恒风格', '复古风格的辣妹');

-- 邻家女孩 - 10个提示词
INSERT INTO prompts (title, category_id, prompt, prompt_cn, description) VALUES
('经典邻家女孩', 'appearance-girlnextdoor', 'classic girl next door, approachable beauty, natural charm, casual fashion, friendly smile, relatable grace', '经典邻家女孩、平易近人美貌、自然魅力、休闲时尚、友好微笑、可亲优雅', '经典邻家女孩类型'),
('学霸邻家女', 'appearance-girlnextdoor', 'studious neighbor girl, glasses, academic charm, book-loving beauty, intelligent grace, scholarly appeal', '学霸邻家女、眼镜、学术魅力、爱书美貌、知性优雅、学者吸引力', '学霸类型的邻家女孩'),
('运动邻家女', 'appearance-girlnextdoor', 'athletic neighbor girl, sporty casual, healthy beauty, active charm, fitness grace, energetic appeal', '运动邻家女、运动休闲、健康美貌、活跃魅力、健身优雅、活力吸引力', '运动型的邻家女孩'),
('烘焙邻家女', 'appearance-girlnextdoor', 'baking neighbor girl, apron, domestic charm, cooking beauty, homemaker grace, culinary appeal', '烘焙邻家女、围裙、 domestic 魅力、烹饪美貌、家庭主妇优雅、烹饪吸引力', '爱烘焙的邻家女孩'),
('园艺邻家女', 'appearance-girlnextdoor', 'gardening neighbor girl, floral charm, nature beauty, green thumb grace, outdoor appeal, botanical style', '园艺邻家女、花卉魅力、自然美貌、 green thumb 优雅、户外吸引力、植物风格', '爱园艺的邻家女孩'),
('带宠邻家女', 'appearance-girlnextdoor', 'pet-loving neighbor girl, animal charm, caring beauty, companion grace, furry appeal, pet owner style', '带宠邻家女、动物魅力、关怀美貌、伴侣优雅、毛茸茸吸引力、宠物主人风格', '带宠物的邻家女孩'),
('雨天邻家女', 'appearance-girlnextdoor', 'rainy day neighbor girl, umbrella charm, cozy beauty, wet weather grace, indoor appeal, comfortable style', '雨天邻家女、雨伞魅力、舒适美貌、雨天优雅、室内吸引力、舒适风格', '雨天里的邻家女孩'),
('晨跑邻家女', 'appearance-girlnextdoor', 'morning jog neighbor girl, athletic wear, fresh beauty, dawn charm, fitness grace, healthy appeal', '晨跑邻家女、运动装、清新美貌、黎明魅力、健身优雅、健康吸引力', '晨跑的邻家女孩'),
('购物邻家女', 'appearance-girlnextdoor', 'shopping neighbor girl, casual bags, consumer charm, market beauty, bargain grace, everyday appeal', '购物邻家女、休闲包、消费者魅力、市场美貌、 bargain 优雅、日常吸引力', '购物的邻家女孩'),
('周末邻家女', 'appearance-girlnextdoor', 'weekend neighbor girl, relaxed wear, leisure charm, off-duty beauty, casual grace, homebody appeal', '周末邻家女、休闲装、 leisure 魅力、下班美貌、休闲优雅、宅女吸引力', '周末休闲的邻家女孩');
