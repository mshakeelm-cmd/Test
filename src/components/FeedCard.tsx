'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, MessageCircle, Share2, MapPin, BadgeCheck } from 'lucide-react';
import { Product } from '@/data/products';

const CATEGORY_ICONS: Record<string, string> = {
  dresses: '👗',
  shoes: '👠',
  jewellery: '💎',
  accessories: '🧣',
};

const CATEGORY_BG: Record<string, string> = {
  dresses: 'from-[#2D5A4E]/20 via-[#C9A96E]/10 to-[#FAF7F2]',
  shoes: 'from-[#8B6914]/20 via-[#C9A96E]/10 to-[#FAF7F2]',
  jewellery: 'from-[#4A3728]/20 via-[#C9A96E]/15 to-[#FAF7F2]',
  accessories: 'from-[#1C3A4A]/20 via-[#2D5A4E]/10 to-[#FAF7F2]',
};

export default function FeedCard({ product }: { product: Product }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(product.likes);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    setLiked(!liked);
    setLikes(liked ? likes - 1 : likes + 1);
  };

  return (
    <article className="bg-white rounded-2xl overflow-hidden border border-[#E8E2DA] card-hover">
      {/* Visual */}
      <Link href={`/product/${product.id}`}>
        <div className={`relative h-72 bg-gradient-to-b ${CATEGORY_BG[product.category]}`}>
          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-5">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id={`fp-${product.id}`} x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M15 0 L30 15 L15 30 L0 15 Z" stroke="#C9A96E" strokeWidth="0.5" fill="none" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill={`url(#fp-${product.id})`} />
            </svg>
          </div>

          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <span className="text-7xl opacity-25">{CATEGORY_ICONS[product.category]}</span>
            <span className="text-sm text-[#1C1C1E]/40 font-medium">{product.origin}</span>
          </div>

          {/* Price pill */}
          <div className="absolute bottom-4 left-4">
            <span className="bg-white/95 backdrop-blur-sm text-[#1C1C1E] font-bold text-lg px-3 py-1 rounded-full shadow-sm">
              €{product.price}
            </span>
          </div>

          {/* Condition */}
          <div className="absolute top-4 left-4">
            <span className="bg-[#1C1C1E]/80 text-white text-xs px-2.5 py-1 rounded-full backdrop-blur-sm">
              {product.condition}
            </span>
          </div>

          {product.featured && (
            <div className="absolute top-4 right-4">
              <span className="bg-[#C9A96E] text-white text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wider">
                FEATURED
              </span>
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        {/* Seller */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-[#2D5A4E] flex items-center justify-center shrink-0">
            <span className="text-xs font-bold text-white">{product.seller.avatar}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1">
              <span className="text-sm font-semibold text-[#1C1C1E] truncate">{product.seller.name}</span>
              {product.seller.verified && (
                <BadgeCheck className="w-3.5 h-3.5 text-[#2D5A4E] shrink-0" />
              )}
              <span className="text-xs">{product.seller.countryFlag}</span>
            </div>
            <div className="flex items-center gap-0.5">
              <MapPin className="w-2.5 h-2.5 text-[#8E8E93]" />
              <span className="text-xs text-[#8E8E93]">{product.location}</span>
            </div>
          </div>
          <span className="text-xs text-[#8E8E93]">{product.postedDaysAgo}d ago</span>
        </div>

        {/* Title */}
        <Link href={`/product/${product.id}`}>
          <h3 className="text-sm font-semibold text-[#1C1C1E] mb-1.5 leading-snug hover:text-[#C9A96E] transition-colors line-clamp-2">
            {product.title}
          </h3>
        </Link>

        {/* Description snippet */}
        <p className="text-xs text-[#8E8E93] line-clamp-2 mb-3">{product.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {product.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[10px] text-[#C9A96E] bg-[#C9A96E]/10 px-2 py-0.5 rounded-full">
              #{tag}
            </span>
          ))}
        </div>

        {/* Shipping */}
        <div className="flex items-center gap-1 mb-3 text-xs text-[#2D5A4E] bg-[#2D5A4E]/8 px-2.5 py-1.5 rounded-lg">
          <span>🚚</span>
          <span className="font-medium">{product.shippingTime}</span>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-[#F5F5F5]">
          <div className="flex items-center gap-3">
            <button
              onClick={handleLike}
              className="flex items-center gap-1 text-xs text-[#8E8E93] hover:text-red-500 transition-colors"
            >
              <Heart className={`w-4 h-4 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
              <span>{likes}</span>
            </button>
            <button className="flex items-center gap-1 text-xs text-[#8E8E93] hover:text-[#1C1C1E] transition-colors">
              <MessageCircle className="w-4 h-4" />
              <span>Ask</span>
            </button>
            <button className="flex items-center gap-1 text-xs text-[#8E8E93] hover:text-[#1C1C1E] transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          <Link
            href={`/product/${product.id}`}
            className="text-xs font-semibold text-white bg-[#1C1C1E] px-4 py-1.5 rounded-full hover:bg-[#3A3A3C] transition-colors"
          >
            Buy now
          </Link>
        </div>
      </div>
    </article>
  );
}
