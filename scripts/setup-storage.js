// 创建 Supabase Storage 存储桶
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://zuqtucfejpkghptiphsz.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1cXR1Y2ZlanBrZ2hwdGlwaHN6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTUzMDEyMiwiZXhwIjoyMDk1MTA2MTIyfQ.Hxd-H8v3DTMk4l6vwAWfhXYGJ_PEfSIJ3qey5NoqwpY';

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function setupStorage() {
  // 1. 创建 images 存储桶
  const { data: bucket, error: createError } = await supabase.storage
    .createBucket('images', {
      public: true,
      fileSizeLimit: 5242880, // 5MB
    });

  if (createError) {
    if (createError.message.includes('already exists')) {
      console.log('⚠️ 存储桶 images 已存在，跳过创建');
    } else {
      console.error('❌ 创建存储桶失败:', createError.message);
      return;
    }
  } else {
    console.log('✅ 存储桶 images 创建成功');
  }

  // 2. 设置存储桶为公开访问
  const { error: updateError } = await supabase.storage
    .updateBucket('images', { public: true });

  if (updateError) {
    console.error('❌ 设置公开访问失败:', updateError.message);
  } else {
    console.log('✅ 存储桶已设为公开访问');
  }

  // 3. 设置存储桶策略（允许认证用户上传）
  const { error: policyError } = await supabase.storage
    .from('images')
    .createPolicy('authenticated-upload', {
      name: 'Authenticated Upload',
      definition: {
        type: 'select',
        table: 'objects',
        schema: 'storage',
        role: 'authenticated',
        query: `bucket_id = 'images'`
      }
    });

  if (policyError) {
    console.log('⚠️ 策略设置提示:', policyError.message);
  } else {
    console.log('✅ 上传策略设置成功');
  }

  console.log('\n存储桶配置完成！现在可以上传图片了。');
}

setupStorage();
