// 通过 Supabase REST API 执行 SQL 设置存储桶策略
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://zuqtucfejpkghptiphsz.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1cXR1Y2ZlanBrZ2hwdGlwaHN6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTUzMDEyMiwiZXhwIjoyMDk1MTA2MTIyfQ.Hxd-H8v3DTMk4l6vwAWfhXYGJ_PEfSIJ3qey5NoqwpY';

async function fixStoragePolicies() {
  // 使用 fetch 直接调用 Supabase REST API 执行 SQL
  const response = await fetch(`${supabaseUrl}/rest/v1/rpc/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': serviceRoleKey,
      'Authorization': `Bearer ${serviceRoleKey}`,
    },
  });

  console.log('尝试通过 REST API 修复...');
  console.log('状态:', response.status);
}

// 直接输出需要执行的 SQL
console.log('=== 请在 Supabase SQL Editor 中执行以下 SQL ===\n');
console.log(`
-- 1. 删除现有的存储桶策略（如果有）
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Upload" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read" ON storage.objects;

-- 2. 允许所有人读取图片（公开访问）
CREATE POLICY "Public read access"
ON storage.objects FOR SELECT
USING (bucket_id = 'images');

-- 3. 允许已认证用户上传图片
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'images' AND auth.role() = 'authenticated');

-- 4. 允许已认证用户删除图片
CREATE POLICY "Authenticated users can delete"
ON storage.objects FOR DELETE
USING (bucket_id = 'images' AND auth.role() = 'authenticated');

-- 5. 允许已认证用户更新图片
CREATE POLICY "Authenticated users can update"
ON storage.objects FOR UPDATE
USING (bucket_id = 'images' AND auth.role() = 'authenticated');
`);
