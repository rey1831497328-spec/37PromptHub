-- 为表情分类添加提示词
-- 假设表情分类的ID为 'expression'，如果不同请修改

INSERT INTO prompts (title, category_id, prompt, prompt_cn, description) VALUES
('微笑', 'expression', 'gentle smile, slight smile, soft expression, friendly look, warm gaze, subtle happiness', '温柔微笑、淡淡笑容、柔和表情、友好神态、温暖目光、微妙喜悦', '温和的微笑表情'),
('大笑', 'expression', 'big laugh, hearty laughter, joyful expression, wide open mouth, happy eyes, genuine joy', '大笑、开怀笑声、快乐表情、张大嘴巴、笑眼、真诚喜悦', '开怀大笑的表情'),
('开心', 'expression', 'happy expression, joyful face, bright eyes, cheerful smile, positive energy, delighted look', '开心表情、快乐面容、明亮眼睛、愉快微笑、正能量、欣喜神态', '开心快乐的表情'),
('悲伤', 'expression', 'sad expression, melancholic face, teary eyes, downcast gaze, sorrowful look, emotional pain', '悲伤表情、忧郁面容、含泪眼睛、低垂目光、哀伤神态、情感痛苦', '悲伤忧郁的表情'),
('哭泣', 'expression', 'crying expression, tears streaming down, sobbing face, emotional breakdown, weeping eyes, sad tears', '哭泣表情、泪流满面、抽泣面容、情绪崩溃、哭泣眼睛、悲伤泪水', '哭泣流泪的表情'),
('愤怒', 'expression', 'angry expression, furious face, furrowed brows, intense glare, rage emotion, hostile look', '愤怒表情、狂怒面容、紧锁眉头、强烈怒视、愤怒情绪、敌意神态', '愤怒生气的表情'),
('惊讶', 'expression', 'surprised expression, shocked face, wide open eyes, raised eyebrows, astonished look, unexpected emotion', '惊讶表情、震惊面容、睁大眼睛、扬起眉毛、惊愕神态、意外情绪', '惊讶震惊的表情'),
('恐惧', 'expression', 'fearful expression, scared face, wide eyes, pale complexion, terrified look, anxious emotion', '恐惧表情、害怕面容、瞪大眼睛、苍白脸色、惊恐神态、焦虑情绪', '恐惧害怕的表情'),
('害羞', 'expression', 'shy expression, bashful face, blushing cheeks, downcast eyes, timid look, embarrassed emotion', '害羞表情、羞怯面容、红晕脸颊、低垂眼睛、胆小神态、尴尬情绪', '害羞腼腆的表情'),
('困惑', 'expression', 'confused expression, puzzled face, furrowed brows, questioning look, uncertain emotion, bewildered gaze', '困惑表情、迷惑面容、紧锁眉头、疑问神态、不确定情绪、茫然目光', '困惑迷茫的表情'),
('厌恶', 'expression', 'disgusted expression, repulsed face, wrinkled nose, scornful look, contempt emotion, disdainful gaze', '厌恶表情、反感面容、皱鼻子、轻蔑神态、鄙视情绪、不屑目光', '厌恶反感的表情'),
('平静', 'expression', 'calm expression, serene face, relaxed features, peaceful gaze, tranquil emotion, composed look', '平静表情、安详面容、放松五官、平和目光、宁静情绪、镇定神态', '平静安详的表情'),
('专注', 'expression', 'focused expression, concentrated face, intense gaze, determined look, serious emotion, attentive stare', '专注表情、集中面容、强烈目光、坚定神态、严肃情绪、专注凝视', '专注认真的表情'),
('疲惫', 'expression', 'tired expression, exhausted face, droopy eyes, weary gaze, fatigued look, sleepy emotion', '疲惫表情、精疲力竭面容、下垂眼睛、疲倦目光、劳累神态、困倦情绪', '疲惫困倦的表情'),
('调皮', 'expression', 'mischievous expression, playful face, sly smile, teasing look, naughty emotion, cunning gaze', '调皮表情、顽皮面容、狡黠微笑、戏谑神态、淘气情绪、狡猾目光', '调皮捣蛋的表情'),
('温柔', 'expression', 'tender expression, gentle face, soft gaze, loving look, affectionate emotion, caring eyes', '温柔表情、温和面容、柔和目光、慈爱神态、深情情绪、关怀眼神', '温柔慈爱的表情'),
('傲慢', 'expression', 'arrogant expression, proud face, haughty gaze, superior look, conceited emotion, disdainful posture', '傲慢表情、骄傲面容、傲慢目光、优越神态、自负情绪、不屑姿态', '傲慢自负的表情'),
('痛苦', 'expression', 'painful expression, suffering face, grimacing look, tortured gaze, agonized emotion, hurt eyes', '痛苦表情、受苦面容、扭曲神态、痛苦目光、折磨情绪、受伤眼神', '痛苦难受的表情'),
('期待', 'expression', 'expectant expression, hopeful face, eager gaze, anticipating look, excited emotion, longing eyes', '期待表情、充满希望面容、热切目光、期待神态、兴奋情绪、渴望眼神', '期待盼望的表情'),
('满足', 'expression', 'content expression, satisfied face, pleased smile, gratified look, fulfilled emotion, happy relaxation', '满足表情、满意面容、愉悦微笑、满足神态、充实情绪、幸福放松', '满足满意的表情');
