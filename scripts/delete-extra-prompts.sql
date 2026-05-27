-- 删除多余的日常姿势提示词（保留3个：自然站立、舒适坐姿、行走姿态）
DELETE FROM prompts WHERE category_id = 'pose-daily' AND title NOT IN ('自然站立', '舒适坐姿', '行走姿态');

-- 删除多余的战斗姿势提示词（保留5个：战斗准备、攻击姿态、防御格挡、闪避动作、蓄力姿势）
DELETE FROM prompts WHERE category_id = 'pose-combat' AND title NOT IN ('战斗准备', '攻击姿态', '防御格挡', '闪避动作', '蓄力姿势');

-- 删除多余的情绪姿势提示词（保留2个：开心欢呼、悲伤低头）
DELETE FROM prompts WHERE category_id = 'pose-emotion' AND title NOT IN ('开心欢呼', '悲伤低头');

-- 删除多余的运动姿势提示词（保留4个：奔跑冲刺、跳跃腾空、攀爬姿势、翻滚动作）
DELETE FROM prompts WHERE category_id = 'pose-sports' AND title NOT IN ('奔跑冲刺', '跳跃腾空', '攀爬姿势', '翻滚动作');

-- 删除多余的互动姿势提示词（保留1个：拥抱姿态）
DELETE FROM prompts WHERE category_id = 'pose-interaction' AND title NOT IN ('拥抱姿态');
