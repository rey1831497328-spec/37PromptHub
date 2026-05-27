"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import CategoryCard from "@/components/CategoryCard";
import { fetchCategories, Category } from "@/lib/data";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategories() {
      const cats = await fetchCategories();
      setCategories(cats);
      setLoading(false);
    }
    loadCategories();
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Header />

      {/* Header Section */}
      <section className="pt-8 pb-6">
        <div className="max-w-6xl mx-auto px-6">
          <Link 
            href="/" 
            className="inline-flex items-center gap-1 text-sm text-[#737373] hover:text-[#171717] mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </Link>
          
          <h1 className="text-3xl font-medium text-[#171717] tracking-tight">全部分类</h1>
          <p className="text-[#737373] mt-2">
            浏览所有提示词分类，找到适合你创作需求的提示词
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-6">
          {loading ? (
            <div className="text-center py-16">
              <p className="text-[#a3a3a3]">加载中...</p>
            </div>
          ) : categories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-[#a3a3a3]">暂无分类，请在管理后台添加</p>
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
