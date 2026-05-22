'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, MapPin, Star } from 'lucide-react';
import { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
  size?: 'default' | 'large';
}

const CATEGORY_GRADIENTS: Record<string, string> = {
  dresses: 'from-[#2D5A4E]/15 via-[#C9A96E]/10 to-[#D4957A]/15',
  shoes: 'from-[#8B6914]/15 via-[#C9A96E]/10 to-[#F5E6C8]/20',
  jewellery: 'from-[#4A3728]/15 via-[#C9A96E]/15 to-[#E8D5B0]/20',
  accessories: 'from-[#1C3A4A]/15 via-[#2D5A4E]/10 to-[#C9A96E]/10',
};

const CATEGORY_ICONS: Record<string, string> = {
  dresses: '👗',
  shoes: '👠',
  jewellery: '💎',
  accessories: '🧣',
};

const CONDITION_COLORS: Record<string, string> = {
  'New with tags': 'bg-emerald-50 text-emerald-700',
  'Like new': 'bg-blue-50 text-blue-700',
  Good: 'bg-amber-50 text-amber-700',
  Fair: 'bg-gray-50 text-gray-600',
};

export default function ProductCard({ product, size = 'default' }: ProductCardProps) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(product.likes);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    setLiked(!liked);
    setLikeCount(liked ? likeCount - 1 : likeCount + 1);
  };

  const gradient = CATEGORY_GRADIENTS[product.category] ?? CATEGORY_GRADIENTS.dresses;

  return (
    <Link href={`/product/${product.id}`} className="block group">
      <div className="card-hover bg-white rounded-2xl overflow-hidden border border-[#E8E2DA]">
        {/* Image area */}
        <div className={`relative bg-gradient-to-br ${gradient} ${size === 'large' ? 'h-72' : 'h-56'}`}>
          {/* Decorative pattern */}
          <div className="absolute inset-0 opacity-5">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id={`pat-${product.id}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <circle cx="10" cy="10" r="1.5" fill="#C9A96E" />
                  <circle cx="0" cy="0" r="1" fill="#C9A96E" />
                  <circle cx="20" cy="20" r="1" fill="#C9A96E" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#pat-${product.id})`} />
            </svg>
          </div>

          {/* Category icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl opacity-30 group-hover:opacity-40 transition-opacity">
              {CATEGORY_ICONS[product.category]}
            </span>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.featured && (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#C9A96E] text-white tracking-wide">
                FEATURED
              </span>
            )}
            <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${CONDITION_COLORS[product.condition]}`}>
              {product.condition}
            </span>
          </div>

          {/* Like button */}
          <button
            onClick={handleLike}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${liked ? 'fill-red-500 text-red-500' : 'text-[#8E8E93]'}`}
            />
          </button>

          {/* Shipping badge */}
          <div className="absolute bottom-3 left-3">
            <span className="text-[10px] font-medium px-2 py-1 rounded-full bg-[#2D5A4E]/90 text-white backdrop-blur-sm flex items-center gap-1">
              🚚 {product.shippingTime}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-3.5">
          <div className="flex items-start justify-between gap-2 mb-1.5">
            <h3 className="text-sm font-semibold text-[#1C1C1E] leading-snug line-clamp-2 flex-1">
              {product.title}
            </h3>
          </div>

          <div className="flex items-center justify-between mb-2.5">
            <span className="text-lg font-bold text-[#1C1C1E]">
              €{product.price}
            </span>
            {product.size && (
              <span className="text-xs text-[#8E8E93] bg-[#F5F5F5] px-2 py-0.5 rounded-md">
                {product.size}
              </span>
            )}
          </div>

          {/* Seller row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full bg-[#2D5A4E] flex items-center justify-center">
                <span className="text-[8px] font-bold text-white">{product.seller.avatar}</span>
              </div>
              <div className="flex items-center gap-0.5">
                <MapPin className="w-2.5 h-2.5 text-[#8E8E93]" />
                <span className="text-xs text-[#8E8E93]">{product.location}</span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <Heart className="w-3 h-3 text-[#C9A96E]" />
              <span className="text-xs text-[#8E8E93]">{likeCount}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
