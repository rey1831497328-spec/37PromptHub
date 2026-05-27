"use client";

import { Sparkles, Ban, Palette, User, Sun, Shirt, Activity, Smile, ArrowUpRight } from "lucide-react";
import { Category } from "@/lib/data";
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

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const Icon = iconMap[category.icon] || Sparkles;
  const hasSubCategories = category.subCategories && category.subCategories.length > 0;

  return (
    <Link href={`/category/${category.id}`}>
      <div className="group bg-white border border-[#e5e5e5] rounded-lg p-5 card-minimal cursor-pointer">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-[#f5f5f5] flex items-center justify-center group-hover:bg-[#171717] transition-colors">
              <Icon className="w-5 h-5 text-[#525252] group-hover:text-white transition-colors" />
            </div>
            <div>
              <h3 className="font-medium text-[#171717]">{category.name}</h3>
            </div>
          </div>
          <ArrowUpRight className="w-4 h-4 text-[#d4d4d4] group-hover:text-[#171717] transition-colors" />
        </div>
        
        <p className="mt-3 text-sm text-[#737373] leading-relaxed">
          {category.description}
        </p>

        {/* 子分类预览 */}
        {hasSubCategories && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {category.subCategories!.map((sub) => (
              <span
                key={sub.id}
                className="text-xs px-2 py-1 rounded bg-[#f5f5f5] text-[#525252]"
              >
                {sub.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
