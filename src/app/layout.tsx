import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "37PromptHub - AI绘图提示词库",
  description: "专为AI绘图爱好者打造的提示词库，提供高质量提示词、分类浏览和一键复制功能",
  keywords: ["AI绘图", "提示词", "Prompt", "AI Art", "绘画提示词"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={inter.variable}>
      <body className="font-sans min-h-screen bg-[#fafafa]">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
