-- 创建服饰子分类
INSERT INTO categories (id, name, icon, description, parent_id) VALUES
('clothing-daily', '日常服饰', 'Shirt', '日常穿着的休闲服装，如T恤、牛仔裤、连衣裙等', 'clothing'),
('clothing-professional', '职业装', 'Briefcase', '各类职业的工作服装，如西装、制服、白大褂等', 'clothing'),
('clothing-traditional', '传统服饰', 'Crown', '各国传统民族服装，如汉服、和服、旗袍等', 'clothing'),
('clothing-fantasy', '奇幻风格服饰', 'Sparkles', '幻想/奇幻风格服装，如法师袍、骑士甲等', 'clothing'),
('clothing-formal', '礼服盛装', 'Gem', '正式场合的华丽服装，如晚礼服、婚纱等', 'clothing'),
('clothing-sports', '运动服饰', 'Activity', '各类运动的专用服装，如运动服、泳衣等', 'clothing'),
('clothing-seasonal', '季节服饰', 'Sun', '特定季节的穿着，如羽绒服、风衣等', 'clothing'),
('clothing-accessories', '配饰装饰', 'CircleDot', '服装配件和装饰品，如帽子、首饰等', 'clothing');

-- 日常服饰 - 12个提示词
INSERT INTO prompts (title, category_id, prompt, prompt_cn, description) VALUES
('白T恤', 'clothing-daily', 'white t-shirt, plain cotton tee, casual top, basic wardrobe, comfortable fit, everyday wear', '白色T恤、纯棉短袖、休闲上衣、基础款、舒适版型、日常穿着', '最基础的白色T恤'),
('牛仔裤', 'clothing-daily', 'blue jeans, denim pants, casual trousers, classic fit, everyday bottoms, versatile wear', '蓝色牛仔裤、牛仔长裤、休闲裤、经典版型、日常下装、百搭穿着', '经典蓝色牛仔裤'),
('连衣裙', 'clothing-daily', 'casual dress, summer dress, flowy fabric, comfortable fit, everyday feminine wear, simple design', '休闲连衣裙、夏日裙装、飘逸面料、舒适版型、日常女装、简约设计', '休闲舒适连衣裙'),
('连帽卫衣', 'clothing-daily', 'hoodie sweatshirt, casual pullover, comfortable fleece, relaxed fit, streetwear style, cozy top', '连帽卫衣、休闲套头衫、舒适抓绒、宽松版型、街头风格、保暖上衣', '休闲连帽卫衣'),
('格子衬衫', 'clothing-daily', 'plaid shirt, checkered pattern, casual button-up, flannel fabric, everyday wear, versatile top', '格子衬衫、格纹图案、休闲纽扣衬衫、法兰绒面料、日常穿着、百搭上衣', '经典格子衬衫'),
('休闲短裤', 'clothing-daily', 'casual shorts, summer bottoms, comfortable fit, everyday wear, relaxed style, knee length', '休闲短裤、夏日下装、舒适版型、日常穿着、休闲风格、及膝长度', '夏日休闲短裤'),
('针织开衫', 'clothing-daily', 'knit cardigan, cozy sweater, button-front, casual layering, comfortable fabric, everyday outerwear', '针织开衫、舒适毛衣、前扣设计、休闲叠穿、柔软面料、日常外套', '柔软针织开衫'),
('百褶裙', 'clothing-daily', 'pleated skirt, casual skirt, flowing fabric, comfortable waistband, everyday feminine wear, versatile bottom', '百褶裙、休闲裙子、飘逸面料、舒适腰带、日常女装、百搭下装', '飘逸百褶裙'),
('条纹衫', 'clothing-daily', 'striped shirt, nautical pattern, casual top, comfortable cotton, everyday wear, classic design', '条纹衫、海军风图案、休闲上衣、舒适棉质、日常穿着、经典设计', '经典条纹上衣'),
('背带裤', 'clothing-daily', 'overalls, denim dungarees, casual one-piece, comfortable fit, everyday wear, youthful style', '背带裤、牛仔工装裤、休闲连体装、舒适版型、日常穿着、青春风格', '休闲背带裤'),
('宽松毛衣', 'clothing-daily', 'oversized sweater, chunky knit, comfortable fit, cozy fabric, casual top, relaxed style', '宽松毛衣、粗针织、舒适版型、温暖面料、休闲上衣、慵懒风格', '宽松舒适毛衣'),
('半身裙', 'clothing-daily', 'skirt, A-line skirt, casual bottom, comfortable waist, everyday feminine wear, versatile piece', '半身裙、A字裙、休闲下装、舒适腰围、日常女装、百搭单品', '百搭半身裙');

-- 职业装 - 8个提示词
INSERT INTO prompts (title, category_id, prompt, prompt_cn, description) VALUES
('商务西装', 'clothing-professional', 'business suit, formal blazer, tailored fit, professional attire, office wear, corporate style', '商务西装、正式西装外套、修身版型、职业装束、办公室穿着、商务风格', '正式商务西装'),
('白大褂', 'clothing-professional', 'white lab coat, medical coat, professional uniform, doctor attire, scientific wear, clean design', '白色大褂、实验室外套、职业制服、医生服装、科研穿着、简洁设计', '医生白大褂'),
('警服', 'clothing-professional', 'police uniform, law enforcement attire, official uniform, professional duty wear, authoritative style', '警服、执法服装、官方制服、职业执勤装、权威风格', '警察制服'),
('空乘制服', 'clothing-professional', 'flight attendant uniform, airline attire, professional service wear, elegant design, hospitality uniform', '空乘制服、航空公司服装、专业服务装、优雅设计、酒店制服', '空乘职业装'),
('厨师服', 'clothing-professional', 'chef uniform, white double-breasted coat, professional kitchen wear, culinary attire, traditional design', '厨师服、白色双排扣外套、专业厨房服装、烹饪服装、传统设计', '厨师工作服'),
('工装连体服', 'clothing-professional', 'jumpsuit workwear, mechanic overalls, professional industrial wear, durable fabric, practical design', '工装连体服、机械师工作服、专业工业服装、耐用面料、实用设计', '工业工装服'),
('教师正装', 'clothing-professional', 'teacher formal wear, professional educator attire, modest suit, respectable appearance, academic style', '教师正装、专业教育工作者服装、端庄西装、得体外观、学术风格', '教师职业装'),
('律师袍', 'clothing-professional', 'legal robe, barrister gown, court attire, professional legal wear, traditional judicial clothing', '律师袍、大律师袍、法庭服装、专业法律服装、传统司法服装', '律师法庭袍');

-- 传统服饰 - 11个提示词
INSERT INTO prompts (title, category_id, prompt, prompt_cn, description) VALUES
('汉服', 'clothing-traditional', 'hanfu, traditional chinese clothing, flowing robes, ancient style, elegant sleeves, cultural attire', '汉服、中国传统服装、飘逸长袍、古风、优雅袖子、文化服装', '中国传统汉服'),
('和服', 'clothing-traditional', 'kimono, traditional japanese clothing, elegant robe, obi sash, floral pattern, cultural attire', '和服、日本传统服装、优雅长袍、腰带、花卉图案、文化服装', '日本传统和服'),
('旗袍', 'clothing-traditional', 'qipao, cheongsam, traditional chinese dress, fitted silhouette, mandarin collar, elegant design', '旗袍、中国传统连衣裙、修身剪裁、立领、优雅设计', '中国传统旗袍'),
('韩服', 'clothing-traditional', 'hanbok, traditional korean clothing, vibrant colors, flowing skirt, jeogori top, cultural attire', '韩服、韩国传统服装、鲜艳色彩、飘逸裙子、短上衣、文化服装', '韩国传统韩服'),
('印度纱丽', 'clothing-traditional', 'sari, traditional indian clothing, draped fabric, elegant drape, colorful design, cultural attire', '纱丽、印度传统服装、 draped 面料、优雅垂坠、多彩设计、文化服装', '印度传统纱丽'),
('苏格兰裙', 'clothing-traditional', 'kilt, traditional scottish clothing, tartan pattern, pleated skirt, cultural attire, celtic design', '苏格兰裙、苏格兰传统服装、格纹图案、百褶裙、文化服装、凯尔特设计', '苏格兰传统裙'),
('非洲传统服饰', 'clothing-traditional', 'african traditional clothing, dashiki, vibrant patterns, colorful fabric, cultural attire, ethnic design', '非洲传统服装、达西基、鲜艳图案、多彩面料、文化服装、民族设计', '非洲传统服装'),
('阿拉伯长袍', 'clothing-traditional', 'thobe, traditional arabian clothing, white robe, flowing fabric, middle eastern attire, modest design', '阿拉伯长袍、阿拉伯传统服装、白色长袍、飘逸面料、中东服装、端庄设计', '阿拉伯传统长袍'),
('希腊长袍', 'clothing-traditional', 'greek toga, ancient greek clothing, draped white fabric, classical style, historical attire, elegant drape', '希腊长袍、古希腊服装、白色 draped 面料、古典风格、历史服装、优雅垂坠', '古希腊长袍'),
('罗马托加', 'clothing-traditional', 'roman toga, ancient roman clothing, draped garment, white fabric, historical attire, classical design', '罗马托加、古罗马服装、 draped 服装、白色面料、历史服装、古典设计', '古罗马托加'),
('和服浴衣', 'clothing-traditional', 'yukata, casual japanese kimono, summer wear, cotton fabric, lighter design, festival attire', '浴衣、休闲日本和服、夏日穿着、棉质面料、轻便设计、节日服装', '日本浴衣');

-- 奇幻风格服饰 - 9个提示词
INSERT INTO prompts (title, category_id, prompt, prompt_cn, description) VALUES
('法师长袍', 'clothing-fantasy', 'wizard robe, mage cloak, magical attire, flowing sleeves, mystical design, arcane symbols', '法师长袍、法师斗篷、魔法服装、飘逸袖子、神秘设计、奥术符号', '魔法师长袍'),
('骑士铠甲', 'clothing-fantasy', 'knight armor, plate mail, medieval armor, shining metal, protective gear, heroic design', '骑士铠甲、板甲、中世纪盔甲、闪亮金属、防护装备、英雄设计', '骑士战斗铠甲'),
('精灵服饰', 'clothing-fantasy', 'elven clothing, fantasy elf attire, nature-inspired design, elegant fabric, forest style, ethereal look', '精灵服饰、奇幻精灵服装、自然灵感设计、优雅面料、森林风格、空灵外观', '精灵族服装'),
('刺客斗篷', 'clothing-fantasy', 'assassin cloak, dark hooded robe, stealth attire, mysterious design, shadowy appearance, ninja style', '刺客斗篷、深色兜帽长袍、潜行服装、神秘设计、暗影外观、忍者风格', '刺客潜行装'),
('德鲁伊服饰', 'clothing-fantasy', 'druid attire, nature mage clothing, organic materials, leaf decorations, forest theme, mystical design', '德鲁伊服饰、自然法师服装、有机材料、叶子装饰、森林主题、神秘设计', '德鲁伊自然装'),
('龙骑士甲', 'clothing-fantasy', 'dragon knight armor, fantasy plate armor, dragon scale design, heroic attire, legendary look', '龙骑士甲、奇幻板甲、龙鳞设计、英雄服装、传奇外观', '龙骑士传奇铠甲'),
('女巫裙', 'clothing-fantasy', 'witch dress, magical gown, dark elegant design, mystical attire, pointed hat, spellcaster look', '女巫裙、魔法长裙、深色优雅设计、神秘服装、尖顶帽、施法者外观', '女巫魔法裙'),
('吸血鬼礼服', 'clothing-fantasy', 'vampire attire, gothic formal wear, dark elegant clothing, immortal style, aristocratic design, mysterious aura', '吸血鬼服装、哥特正装、深色优雅服装、不朽风格、贵族设计、神秘气息', '吸血鬼贵族装'),
('天使战甲', 'clothing-fantasy', 'angelic armor, divine plate, heavenly design, glowing elements, celestial attire, holy warrior look', '天使战甲、神圣板甲、天堂设计、发光元素、天界服装、圣战士外观', '天使神圣铠甲');

-- 礼服盛装 - 10个提示词
INSERT INTO prompts (title, category_id, prompt, prompt_cn, description) VALUES
('晚礼服', 'clothing-formal', 'evening gown, formal dress, elegant design, floor length, sophisticated style, glamorous look', '晚礼服、正式长裙、优雅设计、及地长度、精致风格、迷人外观', '正式晚礼服'),
('婚纱', 'clothing-formal', 'wedding dress, bridal gown, white lace, elegant design, romantic style, ceremonial attire', '婚纱、新娘礼服、白色蕾丝、优雅设计、浪漫风格、仪式服装', '新娘婚纱'),
('燕尾服', 'clothing-formal', 'tuxedo, formal suit, black tie attire, elegant jacket, sophisticated design, gentleman style', '燕尾服、正式西装、黑领结服装、优雅外套、精致设计、绅士风格', '男士燕尾服'),
('舞会裙', 'clothing-formal', 'ball gown, formal party dress, voluminous skirt, elegant design, princess style, glamorous attire', '舞会裙、正式派对裙、蓬松裙摆、优雅设计、公主风格、迷人服装', '正式舞会裙'),
('鸡尾酒裙', 'clothing-formal', 'cocktail dress, semi-formal attire, knee length, elegant design, party wear, sophisticated style', '鸡尾酒裙、半正式服装、及膝长度、优雅设计、派对穿着、精致风格', '鸡尾酒会裙'),
('男士礼服', 'clothing-formal', 'formal suit, three-piece suit, elegant tailoring, sophisticated design, business formal, classic style', '男士礼服、三件套西装、优雅剪裁、精致设计、商务正装、经典风格', '正式男士西装'),
('红毯礼服', 'clothing-formal', 'red carpet dress, celebrity gown, glamorous design, show-stopping look, elegant silhouette, luxurious fabric', '红毯礼服、名人长裙、迷人设计、惊艳外观、优雅轮廓、奢华面料', '红毯明星装'),
('毕业礼服', 'clothing-formal', 'graduation gown, academic regalia, ceremonial robe, cap and gown, scholarly attire, traditional design', '毕业礼服、学术礼服、仪式长袍、学位帽和袍、学者服装、传统设计', '毕业典礼服'),
('宫廷礼服', 'clothing-formal', 'royal court dress, historical formal wear, elaborate design, luxurious fabric, aristocratic style, period costume', '宫廷礼服、历史正式服装、精美设计、奢华面料、贵族风格、时代服装', '宫廷贵族装'),
('主持人礼服', 'clothing-formal', 'host formal wear, presenter attire, elegant suit or dress, professional formal, stage-worthy design', '主持人礼服、主持人服装、优雅西装或裙装、专业正装、适合舞台设计', '主持人正式装');

-- 运动服饰 - 12个提示词
INSERT INTO prompts (title, category_id, prompt, prompt_cn, description) VALUES
('运动T恤', 'clothing-sports', 'athletic t-shirt, sports top, moisture-wicking fabric, breathable design, active wear, performance gear', '运动T恤、运动上衣、吸湿排汗面料、透气设计、运动服装、性能装备', '专业运动T恤'),
('瑜伽服', 'clothing-sports', 'yoga outfit, athletic wear, stretchy fabric, form-fitting, comfortable design, flexible movement', '瑜伽服、运动服装、弹性面料、贴身设计、舒适款式、灵活运动', '专业瑜伽服'),
('泳衣', 'clothing-sports', 'swimsuit, swimming attire, one-piece or bikini, aquatic wear, streamlined design, pool fashion', '泳衣、游泳服装、连体或比基尼、水上服装、流线设计、泳池时尚', '专业泳衣'),
('篮球服', 'clothing-sports', 'basketball jersey, athletic uniform, team colors, sleeveless design, breathable fabric, court wear', '篮球服、运动球衣、队服颜色、无袖设计、透气面料、球场服装', '篮球运动服'),
('足球服', 'clothing-sports', 'soccer jersey, football kit, team uniform, athletic design, breathable fabric, field wear', '足球服、足球套装、队服、运动设计、透气面料、球场服装', '足球运动服'),
('跑步紧身裤', 'clothing-sports', 'running tights, compression pants, athletic leggings, performance fabric, form-fitting, track wear', '跑步紧身裤、压缩裤、运动紧身裤、性能面料、贴身设计、跑道服装', '跑步压缩裤'),
('网球裙', 'clothing-sports', 'tennis skirt, athletic skirt, pleated design, comfortable fit, court wear, sporty style', '网球裙、运动裙、百褶设计、舒适版型、球场服装、运动风格', '网球运动裙'),
('健身背心', 'clothing-sports', 'gym tank top, workout vest, sleeveless athletic wear, breathable fabric, muscle fit, training gear', '健身背心、运动背心、无袖运动装、透气面料、肌肉版型、训练装备', '健身训练背心'),
('骑行服', 'clothing-sports', 'cycling jersey, bike wear, aerodynamic design, padded shorts, athletic fit, cycling gear', '骑行服、自行车服装、空气动力学设计、垫裆短裤、运动版型、骑行装备', '专业骑行服'),
('登山服', 'clothing-sports', 'hiking gear, outdoor jacket, waterproof fabric, functional design, adventure wear, mountain attire', '登山服、户外夹克、防水面料、功能设计、探险服装、山地服装', '户外登山装'),
('拳击短裤', 'clothing-sports', 'boxing shorts, athletic trunks, wide waistband, comfortable fit, ring wear, fighting gear', '拳击短裤、运动短裤、宽腰带、舒适版型、拳击台服装、格斗装备', '拳击运动短裤'),
('高尔夫服', 'clothing-sports', 'golf attire, polo shirt, khaki pants, preppy style, country club wear, elegant sportswear', '高尔夫服、Polo衫、卡其裤、学院风格、乡村俱乐部服装、优雅运动装', '高尔夫运动装');

-- 季节服饰 - 8个提示词
INSERT INTO prompts (title, category_id, prompt, prompt_cn, description) VALUES
('羽绒服', 'clothing-seasonal', 'down jacket, winter coat, puffy design, warm insulation, cold weather wear, quilted pattern', '羽绒服、冬季外套、蓬松设计、保暖内衬、寒冷天气穿着、绗缝图案', '冬季保暖羽绒服'),
('风衣', 'clothing-seasonal', 'trench coat, spring outerwear, belted waist, classic design, transitional weather, elegant look', '风衣、春季外套、腰带收腰、经典设计、过渡季节、优雅外观', '经典风衣'),
('夏装', 'clothing-seasonal', 'summer clothes, lightweight fabric, breathable design, hot weather wear, casual summer style, cool attire', '夏装、轻薄面料、透气设计、炎热天气穿着、休闲夏日风格、清凉服装', '夏日清凉装'),
('冬装', 'clothing-seasonal', 'winter clothes, warm layers, thick fabric, cold weather attire, cozy design, insulated wear', '冬装、保暖层、厚面料、寒冷天气服装、舒适设计、保暖穿着', '冬季保暖装'),
('春装', 'clothing-seasonal', 'spring clothes, light layers, transitional wear, floral patterns, fresh colors, mild weather attire', '春装、轻薄层、过渡服装、花卉图案、清新色彩、温和天气服装', '春季清新装'),
('秋装', 'clothing-seasonal', 'autumn clothes, cozy layers, warm tones, transitional season wear, comfortable design, fall fashion', '秋装、舒适层、暖色调、过渡季节服装、舒适设计、秋季时尚', '秋季舒适装'),
('防晒衣', 'clothing-seasonal', 'sun protection clothing, lightweight cover-up, UV protection, summer outerwear, breathable fabric, outdoor wear', '防晒衣、轻薄外搭、紫外线防护、夏季外套、透气面料、户外穿着', '夏季防晒服'),
('保暖内衣', 'clothing-seasonal', 'thermal underwear, base layer, warm inner wear, winter insulation, comfortable fit, cold weather essential', '保暖内衣、基础层、保暖内穿、冬季内衬、舒适版型、寒冷天气必备', '冬季保暖内衣');

-- 配饰装饰 - 11个提示词
INSERT INTO prompts (title, category_id, prompt, prompt_cn, description) VALUES
('棒球帽', 'clothing-accessories', 'baseball cap, casual hat, curved brim, adjustable strap, sporty style, everyday accessory', '棒球帽、休闲帽子、弧形帽檐、可调节带、运动风格、日常配饰', '休闲棒球帽'),
('围巾', 'clothing-accessories', 'scarf, neck accessory, warm fabric, stylish wrap, winter essential, cozy accessory', '围巾、颈部配饰、温暖面料、时尚围裹、冬季必备、舒适配饰', '保暖围巾'),
('项链', 'clothing-accessories', 'necklace, jewelry accessory, pendant design, elegant chain, decorative piece, feminine adornment', '项链、珠宝配饰、吊坠设计、优雅链条、装饰单品、女性装饰', '优雅项链'),
('耳环', 'clothing-accessories', 'earrings, jewelry accessory, dangling or stud design, decorative pieces, feminine adornment, sparkling gems', '耳环、珠宝配饰、垂坠或耳钉设计、装饰单品、女性装饰、闪亮宝石', '精美耳环'),
('腰带', 'clothing-accessories', 'belt, waist accessory, leather or fabric, functional design, fashion statement, outfit completer', '腰带、腰部配饰、皮革或面料、功能设计、时尚宣言、服装点缀', '时尚腰带'),
('手表', 'clothing-accessories', 'wristwatch, timepiece accessory, elegant or casual design, functional jewelry, wrist adornment', '手表、计时配饰、优雅或休闲设计、功能性珠宝、手腕装饰', '精致手表'),
('太阳镜', 'clothing-accessories', 'sunglasses, eyewear accessory, UV protection, stylish frames, summer essential, cool look', '太阳镜、眼镜配饰、紫外线防护、时尚镜框、夏季必备、酷炫外观', '时尚太阳镜'),
('手提包', 'clothing-accessories', 'handbag, purse accessory, carrying bag, stylish design, functional accessory, everyday essential', '手提包、钱包配饰、携带包、时尚设计、功能配饰、日常必备', '时尚手提包'),
('领带', 'clothing-accessories', 'necktie, formal accessory, silk fabric, professional look, business attire, elegant knot', '领带、正式配饰、丝绸面料、专业外观、商务服装、优雅结', '正式领带'),
('手套', 'clothing-accessories', 'gloves, hand accessory, warm fabric, winter essential, protective wear, stylish design', '手套、手部配饰、温暖面料、冬季必备、防护穿着、时尚设计', '保暖手套'),
('发饰', 'clothing-accessories', 'hair accessory, hairpin or headband, decorative piece, feminine adornment, hairstyle completer', '发饰、发簪或发带、装饰单品、女性装饰、发型点缀', '精美发饰');
