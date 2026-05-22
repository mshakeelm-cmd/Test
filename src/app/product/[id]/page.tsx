import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Heart, Share2, MapPin, Star, BadgeCheck, ShieldCheck, Clock, Package } from 'lucide-react';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';

const CATEGORY_BG: Record<string, string> = {
  dresses: 'from-[#2D5A4E]/15 via-[#C9A96E]/10 to-[#FAF7F2]',
  shoes: 'from-[#8B6914]/15 via-[#C9A96E]/10 to-[#FAF7F2]',
  jewellery: 'from-[#4A3728]/15 via-[#C9A96E]/15 to-[#FAF7F2]',
  accessories: 'from-[#1C3A4A]/15 via-[#2D5A4E]/10 to-[#FAF7F2]',
};

const CATEGORY_ICONS: Record<string, string> = {
  dresses: '👗',
  shoes: '👠',
  jewellery: '💎',
  accessories: '🧣',
};

const CONDITION_COLORS: Record<string, string> = {
  'New with tags': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Like new': 'bg-blue-50 text-blue-700 border-blue-200',
  Good: 'bg-amber-50 text-amber-700 border-amber-200',
  Fair: 'bg-gray-50 text-gray-600 border-gray-200',
};

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  if (!product) notFound();

  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);
  const bg = CATEGORY_BG[product.category] ?? CATEGORY_BG.dresses;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Back */}
      <Link
        href="/listings"
        className="inline-flex items-center gap-1.5 text-sm text-[#8E8E93] hover:text-[#1C1C1E] transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to listings
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14">
        {/* Left — Image */}
        <div className="space-y-3">
          <div className={`relative rounded-2xl h-[480px] bg-gradient-to-br ${bg} border border-[#E8E2DA] overflow-hidden`}>
            {/* Pattern */}
            <div className="absolute inset-0 opacity-5">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="pd-pat" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                    <path d="M25 3 L47 25 L25 47 L3 25 Z" stroke="#C9A96E" strokeWidth="0.8" fill="none" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#pd-pat)" />
              </svg>
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <span className="text-[120px] opacity-20">{CATEGORY_ICONS[product.category]}</span>
              <span className="text-sm text-[#1C1C1E]/40">📍 {product.origin}</span>
            </div>

            {product.featured && (
              <div className="absolute top-4 left-4">
                <span className="bg-[#C9A96E] text-white text-xs font-bold px-3 py-1 rounded-full">
                  FEATURED
                </span>
              </div>
            )}

            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-sm flex items-center justify-center hover:scale-110 transition-transform">
                <Heart className="w-5 h-5 text-[#8E8E93]" />
              </button>
              <button className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-sm flex items-center justify-center hover:scale-110 transition-transform">
                <Share2 className="w-5 h-5 text-[#8E8E93]" />
              </button>
            </div>
          </div>

          {/* Thumbnail strip placeholder */}
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-20 h-20 rounded-xl bg-gradient-to-br ${bg} border-2 ${i === 1 ? 'border-[#C9A96E]' : 'border-[#E8E2DA]'} flex items-center justify-center cursor-pointer`}
              >
                <span className="text-2xl opacity-20">{CATEGORY_ICONS[product.category]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Details */}
        <div>
          {/* Category + condition */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs text-[#8E8E93] capitalize">{product.category}</span>
            <span className="text-[#E8E2DA]">·</span>
            <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${CONDITION_COLORS[product.condition]}`}>
              {product.condition}
            </span>
            {product.brand && (
              <>
                <span className="text-[#E8E2DA]">·</span>
                <span className="text-xs text-[#8E8E93]">{product.brand}</span>
              </>
            )}
          </div>

          <h1 className="text-2xl md:text-3xl font-bold text-[#1C1C1E] leading-snug mb-3">
            {product.title}
          </h1>

          {/* Price + size */}
          <div className="flex items-center gap-4 mb-5">
            <span className="text-3xl font-bold text-[#1C1C1E]">€{product.price}</span>
            {product.size && (
              <span className="text-sm text-[#8E8E93] bg-[#F5F5F5] px-3 py-1 rounded-full">
                Size {product.size}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-[#3A3A3C] leading-relaxed mb-5">{product.description}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {product.tags.map((tag) => (
              <span key={tag} className="text-xs text-[#C9A96E] bg-[#C9A96E]/10 px-2.5 py-1 rounded-full">
                #{tag}
              </span>
            ))}
          </div>

          {/* Shipping info */}
          <div className="bg-[#2D5A4E]/8 border border-[#2D5A4E]/15 rounded-xl p-4 mb-5 space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Package className="w-4 h-4 text-[#2D5A4E]" />
              <span className="font-medium text-[#1C1C1E]">Ships from {product.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-[#2D5A4E]" />
              <span className="text-[#3A3A3C]">{product.shippingTime}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <ShieldCheck className="w-4 h-4 text-[#2D5A4E]" />
              <span className="text-[#3A3A3C]">Buyer protection included</span>
            </div>
          </div>

          {/* CTA buttons */}
          <div className="flex gap-3 mb-6">
            <button className="flex-1 btn-gold py-3.5 rounded-full font-semibold text-sm text-white">
              Buy now · €{product.price}
            </button>
            <button className="flex-1 border border-[#1C1C1E] text-[#1C1C1E] py-3.5 rounded-full font-semibold text-sm hover:bg-[#1C1C1E] hover:text-white transition-colors">
              Message seller
            </button>
          </div>

          {/* Make offer */}
          <button className="w-full text-sm text-[#8E8E93] hover:text-[#C9A96E] transition-colors py-2">
            Make an offer
          </button>

          <hr className="border-[#E8E2DA] my-5" />

          {/* Seller */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[#2D5A4E] flex items-center justify-center shrink-0">
              <span className="text-sm font-bold text-white">{product.seller.avatar}</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-[#1C1C1E]">{product.seller.name}</span>
                {product.seller.verified && (
                  <BadgeCheck className="w-4 h-4 text-[#2D5A4E]" />
                )}
                <span>{product.seller.countryFlag}</span>
              </div>
              <div className="flex items-center gap-3 mt-0.5">
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-[#C9A96E] fill-[#C9A96E]" />
                  <span className="text-xs text-[#8E8E93]">{product.seller.rating} ({product.seller.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-0.5">
                  <MapPin className="w-3 h-3 text-[#8E8E93]" />
                  <span className="text-xs text-[#8E8E93]">{product.location}</span>
                </div>
              </div>
            </div>
            <button className="text-sm text-[#C9A96E] font-medium hover:underline">
              View profile
            </button>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-[#1C1C1E] mb-5">More in {product.category}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
