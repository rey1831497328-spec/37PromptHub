// 使用 Supabase Admin API 创建管理员用户
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://zuqtucfejpkghptiphsz.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1cXR1Y2ZlanBrZ2hwdGlwaHN6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3OTUzMDEyMiwiZXhwIjoyMDk1MTA2MTIyfQ.Hxd-H8v3DTMk4l6vwAWfhXYGJ_PEfSIJ3qey5NoqwpY';

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function createAdminUser() {
  const email = 'admin@37prompthub.com';
  const password = 'Admin123456!';

  try {
    // 创建用户
    const { data: user, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email: email,
      password: password,
      email_confirm: true
    });

    if (createError) {
      console.error('创建用户失败:', createError.message);
      return;
    }

    console.log('✅ 管理员用户创建成功！');
    console.log('邮箱:', email);
    console.log('密码:', password);
    console.log('用户ID:', user.user.id);
    console.log('\n请使用以上信息登录管理后台');

  } catch (error) {
    console.error('错误:', error.message);
  }
}

createAdminUser();
