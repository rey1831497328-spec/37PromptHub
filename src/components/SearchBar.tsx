"use client";

import { Search } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export default function SearchBar({ onSearch, placeholder = "搜索提示词..." }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative w-full max-w-xl">
      <div 
        className={`
          relative flex items-center bg-white border rounded-lg transition-all duration-200
          ${isFocused ? 'border-[#171717] shadow-sm' : 'border-[#e5e5e5]'}
        `}
      >
        <Search className={`absolute left-4 w-4 h-4 transition-colors ${isFocused ? 'text-[#171717]' : 'text-[#a3a3a3]'}`} />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onSearch(e.target.value);
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="w-full pl-11 pr-4 py-3 bg-transparent text-[#171717] placeholder:text-[#a3a3a3] text-sm focus:outline-none"
        />
      </div>
    </div>
  );
}
