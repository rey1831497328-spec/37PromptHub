-- 创建分类表
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'Sparkles',
  description TEXT,
  parent_id TEXT REFERENCES categories(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 创建提示词表
CREATE TABLE IF NOT EXISTS prompts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category_id TEXT NOT NULL REFERENCES categories(id),
  prompt TEXT NOT NULL,
  prompt_cn TEXT,
  negative_prompt TEXT,
  negative_prompt_cn TEXT,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 插入默认分类数据
INSERT INTO categories (id, name, icon, description) VALUES
  ('quality', '画质增强', 'Sparkles', '提升图像质量和细节的提示词'),
  ('negative', '反向提示词', 'Ban', '排除不良效果的提示词'),
  ('style', '艺术风格', 'Palette', '各种艺术风格的提示词'),
  ('character', '人物相关', 'User', '人物服饰、相貌、姿势、表情相关提示词'),
  ('lighting', '光照效果', 'Sun', '各种光照和氛围效果')
ON CONFLICT (id) DO NOTHING;

-- 插入人物相关的子分类
INSERT INTO categories (id, name, icon, description, parent_id) VALUES
  ('clothing', '服饰', 'Shirt', '人物服饰穿搭相关提示词', 'character'),
  ('appearance', '人物相貌', 'User', '人物外貌特征相关提示词', 'character'),
  ('pose', '姿势', 'Activity', '人物姿势和动作相关提示词', 'character'),
  ('expression', '表情', 'Smile', '人物表情和情感相关提示词', 'character')
ON CONFLICT (id) DO NOTHING;

-- 创建更新时间触发器
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_prompts_updated_at ON prompts;
CREATE TRIGGER update_prompts_updated_at
  BEFORE UPDATE ON prompts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 启用 RLS（行级安全）
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE prompts ENABLE ROW LEVEL SECURITY;

-- 创建访问策略（允许匿名读取，需要认证才能修改）
CREATE POLICY "Allow anonymous read access" ON categories
  FOR SELECT USING (true);

CREATE POLICY "Allow anonymous read access" ON prompts
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to insert" ON prompts
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update" ON prompts
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete" ON prompts
  FOR DELETE USING (auth.role() = 'authenticated');
