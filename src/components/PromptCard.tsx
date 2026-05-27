"use client";

import { Copy, Check, Image as ImageIcon } from "lucide-react";
import { useState } from "react";
import { Prompt } from "@/lib/data";

interface PromptCardProps {
  prompt: Prompt;
}

export default function PromptCard({ prompt }: PromptCardProps) {
  const [copied, setCopied] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleCopy = async () => {
    try {
      // 只复制英文内容
      const textToCopy = prompt.prompt || prompt.negativePrompt || "";
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="group bg-white border border-[#e5e5e5] rounded-lg overflow-hidden card-minimal">
      {/* Image Section */}
      {prompt.imageUrl && !imageError ? (
        <div className="relative w-full h-40 bg-[#f5f5f5]">
          <img
            src={prompt.imageUrl}
            alt={prompt.title}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        </div>
      ) : null}

      {/* Content */}
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-[#171717] text-base truncate">{prompt.title}</h3>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="text-xs text-[#a3a3a3]">
                {prompt.model}
              </span>
              {prompt.imageUrl && (
                <ImageIcon className="w-3 h-3 text-[#a3a3a3]" />
              )}
            </div>
          </div>
          <button
            onClick={handleCopy}
            className="p-2 rounded-md border border-[#e5e5e5] text-[#737373] hover:border-[#171717] hover:text-[#171717] transition-all flex-shrink-0 ml-2"
            title="复制英文提示词"
          >
            {copied ? (
              <Check className="w-3.5 h-3.5" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        {/* Prompt Content */}
        <div className="space-y-3">
          {prompt.prompt && (
            <div className="p-3 rounded-md bg-[#fafafa] border border-[#f0f0f0]">
              <p className="text-xs text-[#a3a3a3] mb-1.5 uppercase tracking-wide">正向提示词</p>
              <p className="text-sm text-[#171717] line-clamp-3 font-mono leading-relaxed">
                {prompt.prompt}
              </p>
              {prompt.promptCn && (
                <p className="text-xs text-[#737373] mt-2 leading-relaxed">
                  {prompt.promptCn}
                </p>
              )}
            </div>
          )}

          {prompt.negativePrompt && (
            <div className="p-3 rounded-md bg-[#fafafa] border border-[#f0f0f0]">
              <p className="text-xs text-[#a3a3a3] mb-1.5 uppercase tracking-wide">反向提示词</p>
              <p className="text-sm text-[#737373] line-clamp-2 font-mono leading-relaxed">
                {prompt.negativePrompt}
              </p>
              {prompt.negativePromptCn && (
                <p className="text-xs text-[#a3a3a3] mt-2 leading-relaxed">
                  {prompt.negativePromptCn}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Description */}
        {prompt.description && (
          <p className="mt-3 text-xs text-[#737373] leading-relaxed">
            {prompt.description}
          </p>
        )}
      </div>
    </div>
  );
}
