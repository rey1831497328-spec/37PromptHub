import Header from "@/components/Header";
import PromptCard from "@/components/PromptCard";
import CategoryCard from "@/components/CategoryCard";
import { getCategoryById, getPromptsByCategory, getParentCategory, getSubCategories } from "@/lib/data";
import { Sparkles, Ban, Palette, User, Sun, Shirt, Activity, Smile, ArrowLeft } from "lucide-react";
import Link from "next/link";

const iconMap: { [key: string]: React.ElementType } = {
  Sparkles,
  Ban,
  Palette,
  User,
  Sun,
  Shirt,
  Activity,
  Smile,
};

// 动态生成路由参数（从 Supabase 读取）
export async function generateStaticParams() {
  const { supabase } = await import('@/lib/supabase');
  const { data, error } = await supabase
    .from('categories')
    .select('id');

  if (error || !data) return [];

  return data.map((c: { id: string }) => ({ id: c.id }));
}

interface CategoryPageProps {
  params: Promise<{ id: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { id } = await params;
  
  // 并行获取分类、提示词、父分类、子分类
  const [category, prompts, parentCategory, subCategories] = await Promise.all([
    getCategoryById(id),
    getPromptsByCategory(id),
    getParentCategory(id),
    getSubCategories(id),
  ]);
  
  const Icon = category ? iconMap[category.icon] || Sparkles : Sparkles;
  const hasSubCategories = subCategories.length > 0;

  if (!category) {
    return (
      <div className="min-h-screen bg-[#fafafa]">
        <Header />
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h1 className="text-2xl font-medium text-[#171717] mb-4">分类未找到</h1>
          <Link href="/categories" className="text-[#737373] hover:text-[#171717]">
            ← 返回分类列表
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Header />

      {/* Header Section */}
      <section className="pt-8 pb-6">
        <div className="max-w-6xl mx-auto px-6">
          <Link 
            href={parentCategory ? `/category/${parentCategory.id}` : "/categories"} 
            className="inline-flex items-center gap-1 text-sm text-[#737373] hover:text-[#171717] mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {parentCategory ? `返回 ${parentCategory.name}` : "返回分类"}
          </Link>
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-[#f5f5f5] flex items-center justify-center">
              <Icon className="w-6 h-6 text-[#525252]" />
            </div>
            <div>
              <h1 className="text-2xl font-medium text-[#171717] tracking-tight">{category.name}</h1>
              <p className="text-sm text-[#737373] mt-0.5">
                {category.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SubCategories or Prompts Grid */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-6">
          {hasSubCategories ? (
            // 显示子分类
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {subCategories.map((sub) => (
                <CategoryCard key={sub.id} category={sub} />
              ))}
            </div>
          ) : prompts.length > 0 ? (
            // 显示提示词
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {prompts.map((prompt) => (
                <PromptCard key={prompt.id} prompt={prompt} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-[#a3a3a3]">该分类暂无提示词</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#e5e5e5] py-8 mt-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-xs text-[#a3a3a3]">
            © 2025 37PromptHub. 专为AI绘图爱好者打造。
          </p>
        </div>
      </footer>
    </div>
  );
}
