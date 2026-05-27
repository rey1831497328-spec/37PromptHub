const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  'https://zuqtucfejpkghptiphsz.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1cXR1Y2ZlanBrZ2hwdGlwaHMiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTc0OTQ1NDM4MSwiZXhwIjoyMDY1MDMwMzgxfQ.TX6PMW2c8WiIh3wH0rU9jq-Km4xVq0cOqtl-5b-1p1U'
);

async function test() {
  const { data, error } = await supabase.from('prompts').select('*');
  if (error) {
    console.error('Error:', error);
    return;
  }
  console.log('Total prompts:', data?.length);
  const personNegative = data?.find(p => p.title === '人物反向提示词');
  const standingPose = data?.find(p => p.title === '站立姿势');
  
  console.log('=== 人物反向提示词 ===');
  console.log('Title:', personNegative?.title);
  console.log('Description:', personNegative?.description);
  console.log('Prompt CN:', personNegative?.prompt_cn);
  
  console.log('\n=== 站立姿势 ===');
  console.log('Title:', standingPose?.title);
  console.log('Description:', standingPose?.description);
  console.log('Prompt CN:', standingPose?.prompt_cn);
  
  console.log('\n=== 匹配检查 ===');
  console.log('人物反向提示词 desc 包含站着:', personNegative?.description?.includes('站着'));
  console.log('人物反向提示词 prompt_cn 包含站着:', personNegative?.prompt_cn?.includes('站着'));
  console.log('人物反向提示词 title 包含人:', personNegative?.title?.includes('人'));
  console.log('站立姿势 title 包含站:', standingPose?.title?.includes('站'));
}
test();
