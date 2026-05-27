"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import PromptCard from "@/components/PromptCard";
import CategoryCard from "@/components/CategoryCard";
import AIPromptGenerator from "@/components/AIPromptGenerator";
import PromptRandomizer from "@/components/PromptRandomizer";
import { fetchCategories, fetchTrendingPrompts, searchPrompts, Prompt, Category } from "@/lib/data";
import { ArrowRight, Loader2, X } from "lucide-react";
import Link from "next/link";

// 骨架屏组件
function CategorySkeleton() {
  return (
    <div className="bg-white border border-[#e5e5e5] rounded-lg p-5 animate-pulse">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 bg-[#f5f5f5] rounded-lg"></div>
        <div className="flex-1">
          <div className="h-5 bg-[#f5f5f5] rounded w-24 mb-2"></div>
          <div className="h-3 bg-[#f5f5f5] rounded w-16"></div>
        </div>
      </div>
    </div>
  );
}

function PromptSkeleton() {
  return (
    <div className="bg-white border border-[#e5e5e5] rounded-lg p-5 animate-pulse">
      <div className="h-5 bg-[#f5f5f5] rounded w-32 mb-3"></div>
      <div className="h-4 bg-[#f5f5f5] rounded w-full mb-2"></div>
      <div className="h-4 bg-[#f5f5f5] rounded w-3/4 mb-3"></div>
      <div className="h-3 bg-[#f5f5f5] rounded w-20"></div>
    </div>
  );
}

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [trendingPrompts, setTrendingPrompts] = useState<Prompt[]>([]);
  const [searchResults, setSearchResults] = useState<Prompt[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // 初始加载分类和热门提示词
  useEffect(() => {
    async function loadData() {
      try {
        const [cats, trending] = await Promise.all([
          fetchCategories(),
          fetchTrendingPrompts(6),
        ]);
        setCategories(cats);
        setTrendingPrompts(trending);
      } catch (error) {
        console.error('加载数据失败:', error);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      setIsSearching(true);
      const results = await searchPrompts(query);
      setSearchResults(results);
    } else {
      setIsSearching(false);
      setSearchResults([]);
    }
  };

  const clearSearch = () => {
    setIsSearching(false);
    setSearchResults([]);
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Header />

      {/* Hero Section */}
      <section className="pt-16 pb-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-2xl">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-medium text-[#171717] mb-5 tracking-tight leading-tight">
              发现完美的<br />
              AI 绘图提示词
            </h1>

            {/* Subtitle */}
            <p className="text-base text-[#737373] mb-8 leading-relaxed max-w-lg">
              精选高质量提示词库，一键复制，即刻生成惊艳作品。
              支持画质增强、风格转换、人物设定等多种场景。
            </p>

            {/* Search Bar */}
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </section>

      {/* Search Results - 直接在搜索框下方显示 */}
      {isSearching && (
        <section className="py-8 border-t border-[#e5e5e5] bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-medium text-[#171717]">
                  "{searchQuery}" 的搜索结果
                </h2>
                <span className="text-sm text-[#a3a3a3]">{searchResults.length} 个结果</span>
              </div>
              <button
                onClick={clearSearch}
                className="flex items-center gap-1 text-sm text-[#737373] hover:text-[#171717] transition-colors px-3 py-1.5 rounded-lg hover:bg-[#f5f5f5]"
              >
                <X className="w-4 h-4" />
                清除搜索
              </button>
            </div>
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {searchResults.map((prompt) => (
                  <PromptCard key={prompt.id} prompt={prompt} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-[#fafafa] rounded-lg">
                <p className="text-[#a3a3a3]">未找到与 "{searchQuery}" 相关的提示词</p>
                <p className="text-sm text-[#737373] mt-2">试试其他关键词，如：画质、风格、人物</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* AI Prompt Generator Section */}
      <section className="py-8 border-t border-[#e5e5e5]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3">
              <AIPromptGenerator />
            </div>
            <div className="lg:col-span-2 flex items-center justify-center">
              <div className="text-center max-w-sm">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#171717] mb-2">
                  不知道写什么提示词？
                </h3>
                <p className="text-[#737373] text-sm leading-relaxed">
                  只需描述你想要的图像，就能自动生成专业的AI绘图提示词。
                  也可以输入现有提示词进行优化扩写，或上传图片反推提示词。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Loading State with Skeleton */}
      {loading ? (
        <>
          {/* Categories Skeleton */}
          <section className="py-12 border-t border-[#e5e5e5]">
            <div className="max-w-6xl mx-auto px-6">
              <div className="h-6 bg-[#f5f5f5] rounded w-20 mb-6 animate-pulse"></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(5)].map((_, i) => (
                  <CategorySkeleton key={i} />
                ))}
              </div>
            </div>
          </section>

          {/* Prompts Skeleton */}
          <section className="py-12 border-t border-[#e5e5e5]">
            <div className="max-w-6xl mx-auto px-6">
              <div className="h-6 bg-[#f5f5f5] rounded w-24 mb-6 animate-pulse"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[...Array(6)].map((_, i) => (
                  <PromptSkeleton key={i} />
                ))}
              </div>
            </div>
          </section>
        </>
      ) : !isSearching ? (
        <>
          {/* Categories Section */}
          <section className="py-12 border-t border-[#e5e5e5]">
            <div className="max-w-6xl mx-auto px-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium text-[#171717]">分类浏览</h2>
                <Link 
                  href="/categories" 
                  className="text-sm text-[#737373] hover:text-[#171717] flex items-center gap-1 transition-colors"
                >
                  查看全部
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category) => (
                  <CategoryCard key={category.id} category={category} />
                ))}
              </div>
            </div>
          </section>

          {/* Random Prompt Combiner */}
          <PromptRandomizer />

          {/* Trending Prompts Section */}
          <section className="py-12 border-t border-[#e5e5e5]">
            <div className="max-w-6xl mx-auto px-6">
              <h2 className="text-lg font-medium text-[#171717] mb-6">热门提示词</h2>
              {trendingPrompts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {trendingPrompts.map((prompt) => (
                    <PromptCard key={prompt.id} prompt={prompt} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <p className="text-[#a3a3a3]">暂无提示词，请在管理后台添加</p>
                </div>
              )}
            </div>
          </section>
        </>
      ) : null}

      {/* Footer */}
      <footer className="border-t border-[#e5e5e5] py-8 mt-12">
        <div className="max-w-6xl mx-auto px-6">
          {/* 联系方式 */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-6 pb-6 border-b border-[#e5e5e5]">
            <span className="text-xs text-[#737373]">
              B站: 太阳风_Solarwind
            </span>
            <span className="text-xs text-[#737373]">
              微信: RS_0322（备注来意）
            </span>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-[#171717] rounded flex items-center justify-center">
                <span className="text-white text-xs font-medium">37</span>
              </div>
              <span className="text-sm font-medium text-[#171717]">37PromptHub</span>
            </div>
            <p className="text-xs text-[#a3a3a3]">
              © 2025 37PromptHub. 专为AI绘图爱好者打造。
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="/terms" 
                className="text-xs text-[#a3a3a3] hover:text-[#171717] transition-colors"
              >
                使用条款
              </a>
              <a 
                href="/privacy" 
                className="text-xs text-[#a3a3a3] hover:text-[#171717] transition-colors"
              >
                隐私政策
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
