"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#fafafa]/80 backdrop-blur-md border-b border-[#e5e5e5]">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-[#171717] rounded-md flex items-center justify-center">
            <span className="text-white text-sm font-medium">37</span>
          </div>
          <span className="text-lg font-medium tracking-tight text-[#171717]">37PromptHub</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link 
            href="/" 
            className="text-sm text-[#737373] hover:text-[#171717] transition-colors"
          >
            首页
          </Link>
          <Link 
            href="/categories" 
            className="text-sm text-[#737373] hover:text-[#171717] transition-colors"
          >
            分类
          </Link>
          <Link 
            href="/sponsor" 
            className="text-sm text-[#737373] hover:text-[#171717] transition-colors"
          >
            赞助作者
          </Link>
          <Link 
            href="/about" 
            className="text-sm text-[#737373] hover:text-[#171717] transition-colors"
          >
            关于
          </Link>
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm px-4 py-2 border border-[#e5e5e5] rounded-md text-[#525252] hover:border-[#171717] hover:text-[#171717] transition-all"
          >
            GitHub
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 rounded-md hover:bg-[#f5f5f5] transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="w-5 h-5 text-[#171717]" />
          ) : (
            <Menu className="w-5 h-5 text-[#171717]" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#e5e5e5] bg-[#fafafa]">
          <nav className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
            <Link 
              href="/" 
              className="px-4 py-3 rounded-md hover:bg-[#f5f5f5] text-[#525252] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              首页
            </Link>
            <Link 
              href="/categories" 
              className="px-4 py-3 rounded-md hover:bg-[#f5f5f5] text-[#525252] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              分类
            </Link>
            <Link 
              href="/sponsor" 
              className="px-4 py-3 rounded-md hover:bg-[#f5f5f5] text-[#525252] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              赞助作者
            </Link>
            <Link 
              href="/about" 
              className="px-4 py-3 rounded-md hover:bg-[#f5f5f5] text-[#525252] transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              关于
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
