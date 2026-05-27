const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://zuqtucfejpkghptiphsz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1cXR1Y2ZlanBrZ2hwdGlwaHN6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczODMzMjYxMiwiZXhwIjoyMDUzOTA4NjEyfQ.Xx73fC-tIKBVf6QnD5EEaXD1Di8RkN9qG0B0-3QpFsI';

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupPoseSubcategories() {
  // 子分类数据
  const subcategories = [
    {
      id: 'pose-daily',
      name: '日常姿势',
      icon: 'User',
      description: '日常生活中的常见姿势，如站立、坐姿、行走等',
      parent_id: 'pose'
    },
    {
      id: 'pose-combat',
      name: '战斗姿势',
      icon: 'Activity',
      description: '战斗场景中的攻击、防御、闪避等姿势',
      parent_id: 'pose'
    },
    {
      id: 'pose-emotion',
      name: '情绪姿势',
      icon: 'Smile',
      description: '表达各种情绪的身体姿态',
      parent_id: 'pose'
    },
    {
      id: 'pose-sports',
      name: '运动姿势',
      icon: 'Activity',
      description: '各种体育运动中的动作姿势',
      parent_id: 'pose'
    },
    {
      id: 'pose-interaction',
      name: '互动姿势',
      icon: 'Users',
      description: '人物之间的互动姿态，如拥抱、牵手等',
      parent_id: 'pose'
    }
  ];

  console.log('创建姿势子分类...');
  
  for (const cat of subcategories) {
    const { error } = await supabase.from('categories').upsert([cat]);
    if (error) {
      console.error(`创建分类 ${cat.name} 失败:`, error.message);
    } else {
      console.log(`✓ 创建分类: ${cat.name}`);
    }
  }

  // 为每个子分类添加提示词
  const prompts = [
    // 日常姿势 (pose-daily)
    {
      title: '自然站立',
      category_id: 'pose-daily',
      prompt: 'natural standing pose, relaxed stance, upright posture, casual standing, full body, balanced position',
      prompt_cn: '自然站立姿势、放松站姿、挺直姿态、随意站立、全身、平衡姿势',
      description: '最基础的日常站立姿势'
    },
    {
      title: '舒适坐姿',
      category_id: 'pose-daily',
      prompt: 'sitting pose, comfortable seated position, relaxed posture, casual sitting, legs crossed or natural position',
      prompt_cn: '坐姿、舒适坐姿、放松姿态、随意坐姿、盘腿或自然姿势',
      description: '舒适的日常坐姿'
    },
    {
      title: '行走姿态',
      category_id: 'pose-daily',
      prompt: 'walking pose, mid-stride, natural gait, casual walking, one foot forward, arm swing',
      prompt_cn: '行走姿势、迈步中、自然步态、随意行走、一脚在前、手臂摆动',
      description: '自然的行走动作'
    },
    {
      title: '倚靠姿势',
      category_id: 'pose-daily',
      prompt: 'leaning pose, leaning against wall, casual lean, relaxed posture, one leg crossed, cool stance',
      prompt_cn: '倚靠姿势、靠墙站立、随意倚靠、放松姿态、单腿交叉、酷炫站姿',
      description: '慵懒的倚靠姿势'
    },
    {
      title: '蹲姿',
      category_id: 'pose-daily',
      prompt: 'squatting pose, crouching position, kneeling on one knee, casual squat, balanced low position',
      prompt_cn: '蹲姿、蹲下姿势、单膝跪地、随意蹲下、平衡低姿态',
      description: '蹲下的日常姿势'
    },
    {
      title: '躺卧姿势',
      category_id: 'pose-daily',
      prompt: 'lying pose, reclining position, relaxed lying down, casual recline, comfortable position',
      prompt_cn: '躺姿、卧姿、放松躺下、随意躺卧、舒适姿势',
      description: '放松的躺卧姿态'
    },
    {
      title: '双手插兜',
      category_id: 'pose-daily',
      prompt: 'hands in pockets pose, casual stance, relaxed posture, confident standing, street style pose',
      prompt_cn: '双手插兜姿势、随意站姿、放松姿态、自信站立、街头风格姿势',
      description: '双手插兜的休闲姿势'
    },
    {
      title: '抱臂姿势',
      category_id: 'pose-daily',
      prompt: 'arms crossed pose, folded arms stance, confident posture, thoughtful pose, casual crossed arms',
      prompt_cn: '抱臂姿势、双臂交叉站姿、自信姿态、沉思姿势、随意抱臂',
      description: '双臂交叉的自信姿势'
    },

    // 战斗姿势 (pose-combat)
    {
      title: '战斗准备',
      category_id: 'pose-combat',
      prompt: 'combat ready pose, fighting stance, defensive position, alert posture, prepared for battle, intense gaze',
      prompt_cn: '战斗准备姿势、战斗站姿、防御姿态、警戒姿势、备战状态、锐利眼神',
      description: '准备战斗的警戒姿势'
    },
    {
      title: '攻击姿态',
      category_id: 'pose-combat',
      prompt: 'attacking pose, offensive stance, striking position, mid-attack, aggressive posture, dynamic action',
      prompt_cn: '攻击姿势、进攻姿态、出击姿势、攻击中、侵略性姿势、动态动作',
      description: '发起攻击的瞬间'
    },
    {
      title: '防御格挡',
      category_id: 'pose-combat',
      prompt: 'defensive pose, blocking stance, guard position, protective posture, shielding, braced for impact',
      prompt_cn: '防御姿势、格挡姿态、防守姿势、保护姿态、掩护、准备承受冲击',
      description: '防御格挡的姿势'
    },
    {
      title: '闪避动作',
      category_id: 'pose-combat',
      prompt: 'dodging pose, evasive maneuver, sidestepping, leaning back to dodge, agile movement, quick reflex',
      prompt_cn: '闪避姿势、躲避动作、侧步、后仰躲避、敏捷动作、快速反应',
      description: '躲避攻击的闪避动作'
    },
    {
      title: '蓄力姿势',
      category_id: 'pose-combat',
      prompt: 'charging pose, power gathering stance, building energy, tense muscles, preparing for ultimate attack, focused',
      prompt_cn: '蓄力姿势、聚能姿态、积蓄能量、紧绷肌肉、准备终极攻击、专注',
      description: '蓄力准备大招'
    },
    {
      title: '受击姿势',
      category_id: 'pose-combat',
      prompt: 'hit reaction pose, taking damage, impact pose, knocked back, staggered stance, pain expression',
      prompt_cn: '受击反应姿势、受到伤害、冲击姿势、被击退、踉跄姿态、痛苦表情',
      description: '被击中时的反应'
    },
    {
      title: '胜利姿态',
      category_id: 'pose-combat',
      prompt: 'victory pose, triumphant stance, winner posture, celebrating win, confident pose, heroic stance',
      prompt_cn: '胜利姿势、凯旋姿态、胜者姿势、庆祝胜利、自信姿势、英雄姿态',
      description: '胜利后的庆祝姿势'
    },
    {
      title: '双持武器',
      category_id: 'pose-combat',
      prompt: 'dual wielding pose, two weapons stance, dual blade pose, balanced combat stance, agile fighter posture',
      prompt_cn: '双持姿势、双武器姿态、双刀姿势、平衡战斗站姿、敏捷战士姿态',
      description: '双持武器的战斗姿势'
    },

    // 情绪姿势 (pose-emotion)
    {
      title: '开心欢呼',
      category_id: 'pose-emotion',
      prompt: 'joyful pose, cheering stance, arms raised in celebration, happy posture, excited expression, energetic pose',
      prompt_cn: '开心姿势、欢呼姿态、双臂高举庆祝、快乐姿势、兴奋表情、活力姿势',
      description: '开心欢呼的姿势'
    },
    {
      title: '悲伤低头',
      category_id: 'pose-emotion',
      prompt: 'sad pose, head down, dejected posture, slumped shoulders, melancholic stance, sorrowful expression',
      prompt_cn: '悲伤姿势、低头、沮丧姿态、肩膀下垂、忧郁站姿、悲伤表情',
      description: '悲伤沮丧的姿态'
    },
    {
      title: '愤怒爆发',
      category_id: 'pose-emotion',
      prompt: 'angry pose, rage stance, clenched fists, aggressive posture, furious expression, tense muscles',
      prompt_cn: '愤怒姿势、暴怒姿态、紧握双拳、侵略性姿势、愤怒表情、紧绷肌肉',
      description: '愤怒爆发的姿势'
    },
    {
      title: '惊讶反应',
      category_id: 'pose-emotion',
      prompt: 'surprised pose, shock stance, hands on face, mouth open, startled posture, wide eyes expression',
      prompt_cn: '惊讶姿势、震惊姿态、双手捂脸、嘴巴张开、惊吓姿势、瞪大眼睛表情',
      description: '惊讶震惊的反应'
    },
    {
      title: '害羞腼腆',
      category_id: 'pose-emotion',
      prompt: 'shy pose, bashful stance, looking down, hands together, blushing expression, timid posture, cute pose',
      prompt_cn: '害羞姿势、腼腆姿态、低头看、双手交握、脸红表情、羞怯姿势、可爱姿势',
      description: '害羞腼腆的姿态'
    },
    {
      title: '自信骄傲',
      category_id: 'pose-emotion',
      prompt: 'confident pose, proud stance, chin up, hands on hips, self-assured posture, smug expression, heroic',
      prompt_cn: '自信姿势、骄傲姿态、下巴抬起、双手叉腰、自信姿态、得意表情、英雄气概',
      description: '自信骄傲的姿势'
    },
    {
      title: '思考沉思',
      category_id: 'pose-emotion',
      prompt: 'thinking pose, contemplative stance, hand on chin, thoughtful expression, pondering posture, focused gaze',
      prompt_cn: '思考姿势、沉思姿态、手托下巴、深思表情、思考姿势、专注凝视',
      description: '思考沉思的姿态'
    },
    {
      title: '害怕颤抖',
      category_id: 'pose-emotion',
      prompt: 'scared pose, fearful stance, trembling, protective posture, cowering, anxious expression, defensive position',
      prompt_cn: '害怕姿势、恐惧姿态、颤抖、保护姿态、蜷缩、焦虑表情、防御姿势',
      description: '害怕恐惧的反应'
    },

    // 运动姿势 (pose-sports)
    {
      title: '奔跑冲刺',
      category_id: 'pose-sports',
      prompt: 'running pose, sprinting stance, full speed running, athletic posture, dynamic movement, forward momentum',
      prompt_cn: '奔跑姿势、冲刺姿态、全速奔跑、运动姿势、动态动作、向前的冲劲',
      description: '全力奔跑的冲刺姿势'
    },
    {
      title: '跳跃腾空',
      category_id: 'pose-sports',
      prompt: 'jumping pose, mid-air suspension, leaping stance, athletic jump, dynamic height, suspended in air',
      prompt_cn: '跳跃姿势、空中悬停、跳跃姿态、运动跳跃、动态高度、空中悬浮',
      description: '跳跃腾空的瞬间'
    },
    {
      title: '攀爬姿势',
      category_id: 'pose-sports',
      prompt: 'climbing pose, scaling position, gripping surface, upward movement, athletic climb, reaching up',
      prompt_cn: '攀爬姿势、攀登姿态、抓握表面、向上移动、运动攀爬、向上伸展',
      description: '攀爬向上的姿势'
    },
    {
      title: '翻滚动作',
      category_id: 'pose-sports',
      prompt: 'rolling pose, tumbling stance, mid-roll, acrobatic movement, dynamic rotation, athletic agility',
      prompt_cn: '翻滚姿势、翻滚姿态、翻滚中、杂技动作、动态旋转、运动敏捷',
      description: '翻滚动作的动态'
    },
    {
      title: '投掷姿势',
      category_id: 'pose-sports',
      prompt: 'throwing pose, pitching stance, arm extended, follow through motion, athletic throw, focused aim',
      prompt_cn: '投掷姿势、投球姿态、手臂伸展、随挥动作、运动投掷、专注瞄准',
      description: '投掷物体的姿势'
    },
    {
      title: '接球准备',
      category_id: 'pose-sports',
      prompt: 'catching pose, ready to catch stance, arms extended forward, focused on object, athletic reception, prepared',
      prompt_cn: '接球姿势、准备接球姿态、双臂前伸、专注物体、运动接球、准备就绪',
      description: '准备接球的姿势'
    },
    {
      title: '游泳姿态',
      category_id: 'pose-sports',
      prompt: 'swimming pose, stroke position, arm extended forward, streamlined body, aquatic movement, freestyle pose',
      prompt_cn: '游泳姿势、划水姿态、手臂前伸、流线型身体、水中动作、自由泳姿势',
      description: '游泳划水的姿态'
    },
    {
      title: '瑜伽体式',
      category_id: 'pose-sports',
      prompt: 'yoga pose, balanced stance, flexible posture, meditative position, graceful form, controlled breathing pose',
      prompt_cn: '瑜伽姿势、平衡站姿、柔韧姿态、冥想姿势、优雅形态、控制呼吸姿势',
      description: '瑜伽练习的体式'
    },

    // 互动姿势 (pose-interaction)
    {
      title: '拥抱姿态',
      category_id: 'pose-interaction',
      prompt: 'hugging pose, embrace stance, arms around each other, warm hug, affectionate posture, close together',
      prompt_cn: '拥抱姿势、拥抱姿态、双臂环绕、温暖拥抱、亲密姿势、紧紧相依',
      description: '两人拥抱的温馨姿势'
    },
    {
      title: '牵手同行',
      category_id: 'pose-interaction',
      prompt: 'holding hands pose, walking together, hand in hand stance, side by side, connected posture, romantic walk',
      prompt_cn: '牵手姿势、牵手同行、手牵手姿态、并肩而行、连接姿势、浪漫漫步',
      description: '牵手并肩的姿势'
    },
    {
      title: '击掌庆祝',
      category_id: 'pose-interaction',
      prompt: 'high five pose, hands meeting in air, celebration stance, excited interaction, friendly gesture, success moment',
      prompt_cn: '击掌姿势、双手空中相击、庆祝姿态、兴奋互动、友好手势、成功时刻',
      description: '击掌庆祝的互动'
    },
    {
      title: '背靠背站立',
      category_id: 'pose-interaction',
      prompt: 'back to back pose, standing back to back, supportive stance, ready for action, trust posture, partners',
      prompt_cn: '背靠背姿势、背对背站立、支持姿态、准备行动、信任姿势、搭档',
      description: '背靠背的搭档姿势'
    },
    {
      title: '搭肩姿势',
      category_id: 'pose-interaction',
      prompt: 'arm around shoulder pose, friendly stance, casual interaction, buddy pose, supportive gesture, camaraderie',
      prompt_cn: '搭肩姿势、友好姿态、随意互动、伙伴姿势、支持手势、 camaraderie',
      description: '朋友间搭肩的姿势'
    },
    {
      title: '对视凝视',
      category_id: 'pose-interaction',
      prompt: 'facing each other pose, eye contact stance, intimate gaze, romantic posture, deep connection, emotional moment',
      prompt_cn: '对视姿势、眼神接触姿态、深情凝视、浪漫姿势、深度连接、情感时刻',
      description: '两人对视的深情姿势'
    },
    {
      title: '牵手起舞',
      category_id: 'pose-interaction',
      prompt: 'dancing together pose, holding hands dance, spinning movement, graceful interaction, romantic dance, flowing motion',
      prompt_cn: '共舞姿势、牵手舞蹈、旋转动作、优雅互动、浪漫舞蹈、流畅动作',
      description: '牵手共舞的浪漫姿势'
    },
    {
      title: '保护姿态',
      category_id: 'pose-interaction',
      prompt: 'protective pose, shielding stance, arm extended to protect, guardian posture, defensive interaction, caring gesture',
      prompt_cn: '保护姿势、保护姿态、手臂伸展保护、守护者姿势、防御性互动、关怀手势',
      description: '保护他人的姿势'
    }
  ];

  console.log('\n添加提示词...');
  
  for (const prompt of prompts) {
    const { error } = await supabase.from('prompts').insert([prompt]);
    if (error) {
      console.error(`添加提示词 ${prompt.title} 失败:`, error.message);
    } else {
      console.log(`✓ 添加提示词: ${prompt.title}`);
    }
  }

  console.log('\n完成！');
}

setupPoseSubcategories().catch(console.error);
