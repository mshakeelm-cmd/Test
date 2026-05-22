'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { categories } from '@/data/products';

interface CategoryBarProps {
  selected: string;
  onChange?: (id: string) => void;
}

export default function CategoryBar({ selected, onChange }: CategoryBarProps) {
  const router = useRouter();

  const handleSelect = (id: string) => {
    if (onChange) {
      onChange(id);
    } else {
      const params = new URLSearchParams();
      if (id !== 'all') params.set('category', id);
      router.push(`/listings${params.toString() ? '?' + params.toString() : ''}`);
    }
  };

  return (
    <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
      {categories.map((cat) => {
        const active = selected === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => handleSelect(cat.id)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
              active
                ? 'bg-[#1C1C1E] text-white'
                : 'bg-white text-[#3A3A3C] border border-[#E8E2DA] hover:border-[#C9A96E] hover:text-[#C9A96E]'
            }`}
          >
            <span>{cat.emoji}</span>
            <span>{cat.label}</span>
          </button>
        );
      })}
    </div>
  );
}
