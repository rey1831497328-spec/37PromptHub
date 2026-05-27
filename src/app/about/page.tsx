"use client";

import Header from "@/components/Header";
import { Heart, Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Header />

      {/* Header Section */}
      <section className="pt-8 pb-6">
        <div className="max-w-3xl mx-auto px-6">
          <Link 
            href="/" 
            className="inline-flex items-center gap-1 text-sm text-[#737373] hover:text-[#171717] mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </Link>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#171717] rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-medium">37</span>
            </div>
            <h1 className="text-2xl font-medium text-[#171717] tracking-tight">关于 37PromptHub</h1>
          </div>
          <p className="text-[#737373]">
            专为 AI 绘图爱好者打造的提示词库
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-8">
        <div className="max-w-3xl mx-auto px-6">
          {/* Mission */}
          <div className="mb-10">
            <h2 className="text-lg font-medium text-[#171717] mb-3">我们的使命</h2>
            <p className="text-[#737373] leading-relaxed text-sm">
              在 AI 绘图工具日益普及的今天，我们发现许多创作者在使用各类 AI 绘图工具时，
              常常为如何写出好的提示词而困扰。37PromptHub 的诞生就是为了解决这个问题——
              我们精心整理和测试每一个提示词，确保它们能够真正帮助到你。
            </p>
          </div>

          {/* Features */}
          <div className="mb-10">
            <h2 className="text-lg font-medium text-[#171717] mb-4">核心特色</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-4 rounded-lg bg-white border border-[#e5e5e5]">
                <h3 className="font-medium text-[#171717] text-sm mb-1">精选内容</h3>
                <p className="text-xs text-[#737373]">
                  每个提示词都经过实际测试，确保质量和效果
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white border border-[#e5e5e5]">
                <h3 className="font-medium text-[#171717] text-sm mb-1">分类清晰</h3>
                <p className="text-xs text-[#737373]">
                  按场景和用途分类，快速找到所需提示词
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white border border-[#e5e5e5]">
                <h3 className="font-medium text-[#171717] text-sm mb-1">一键复制</h3>
                <p className="text-xs text-[#737373]">
                  点击即可复制，无缝对接到你的工作流
                </p>
              </div>
              <div className="p-4 rounded-lg bg-white border border-[#e5e5e5]">
                <h3 className="font-medium text-[#171717] text-sm mb-1">中英对照</h3>
                <p className="text-xs text-[#737373]">
                  提示词中英文对照，方便理解和使用
                </p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="mb-10">
            <h2 className="text-lg font-medium text-[#171717] mb-3">联系我们</h2>
            <p className="text-[#737373] text-sm mb-4">
              如果你有任何建议或反馈，欢迎联系我们：
            </p>
            <div className="flex flex-wrap gap-3">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-[#e5e5e5] text-sm text-[#525252] hover:border-[#171717] hover:text-[#171717] transition-all"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                <span>GitHub</span>
              </a>
              <a 
                href="mailto:1831497328@qq.com"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-[#e5e5e5] text-sm text-[#525252] hover:border-[#171717] hover:text-[#171717] transition-all"
              >
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </a>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="p-5 rounded-lg bg-[#f5f5f5] border border-[#e5e5e5]">
            <h3 className="font-medium text-[#171717] text-sm mb-2 flex items-center gap-2">
              <Heart className="w-3.5 h-3.5 text-[#525252]" />
              免责声明
            </h3>
            <p className="text-xs text-[#737373] leading-relaxed">
              本站提供的提示词仅供学习和创作参考使用。使用 AI 生成的内容请遵守相关法律法规，
              尊重他人知识产权。本站不对用户使用提示词生成的内容承担任何责任。
            </p>
          </div>
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
