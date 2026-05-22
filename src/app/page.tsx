import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { products, categories } from '@/data/products';
import FeedCard from '@/components/FeedCard';
import ProductCard from '@/components/ProductCard';
import TrustBanner from '@/components/TrustBanner';

const stats = [
  { value: '2,400+', label: 'listed pieces' },
  { value: '6', label: 'EU countries' },
  { value: '4.9★', label: 'avg. seller rating' },
  { value: '2–5d', label: 'EU shipping' },
];

export default function HomePage() {
  const featuredProducts = products.filter((p) => p.featured);
  const feedProducts = products.slice(0, 6);
  const newArrivals = products.slice(-4);

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#1C1C1E]">
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hero-pat" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M30 5 L55 30 L30 55 L5 30 Z" stroke="#C9A96E" strokeWidth="1" fill="none" />
                <circle cx="30" cy="30" r="3" fill="#C9A96E" opacity="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-pat)" />
          </svg>
        </div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#2D5A4E]/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#1C1C1E] to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full border border-[#C9A96E]/30 bg-[#C9A96E]/10">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A96E]" />
              <span className="text-xs text-[#C9A96E] font-medium tracking-wide">
                Pakistani craftsmanship · European lifestyle
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5">
              Pre-loved{' '}
              <span className="text-[#C9A96E]">Pakistani</span>{' '}
              fashion,<br />
              <span className="text-white/80">delivered across Europe.</span>
            </h1>

            <p className="text-base md:text-lg text-white/60 leading-relaxed mb-8 max-w-lg">
              Discover authentic dresses, jewellery, shoes and accessories from sellers across Europe — shipped fast, bought securely.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/listings"
                className="inline-flex items-center gap-2 btn-gold px-6 py-3 rounded-full font-semibold text-sm text-white"
              >
                Browse listings
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/listings"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-white border border-white/20 hover:border-white/40 transition-colors"
              >
                Start selling
              </Link>
            </div>
          </div>
        </div>

        <div className="relative border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-xl md:text-2xl font-bold text-[#C9A96E]">{s.value}</div>
                  <div className="text-xs text-white/50 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <TrustBanner />

      {/* Featured */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#1C1C1E]">Featured pieces</h2>
            <p className="text-sm text-[#8E8E93] mt-0.5">Hand-picked by our team</p>
          </div>
          <Link href="/listings" className="text-sm text-[#C9A96E] font-medium hover:underline flex items-center gap-1">
            See all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} size="large" />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white border-y border-[#E8E2DA] py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <h2 className="text-xl font-bold text-[#1C1C1E] mb-6">Browse by category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.filter((c) => c.id !== 'all').map((cat) => (
              <Link
                key={cat.id}
                href={`/listings?category=${cat.id}`}
                className="group flex flex-col items-center justify-center gap-2 p-6 rounded-2xl border border-[#E8E2DA] hover:border-[#C9A96E] hover:bg-[#C9A96E]/5 transition-all card-hover"
              >
                <span className="text-4xl">{cat.emoji}</span>
                <span className="text-sm font-semibold text-[#1C1C1E] group-hover:text-[#C9A96E] transition-colors">
                  {cat.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Feed */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#1C1C1E]">Latest drops</h2>
            <p className="text-sm text-[#8E8E93] mt-0.5">Fresh listings from your community</p>
          </div>
          <Link href="/listings" className="text-sm text-[#C9A96E] font-medium hover:underline flex items-center gap-1">
            See all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {feedProducts.map((product) => (
            <FeedCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* New arrivals */}
      <section className="bg-white border-t border-[#E8E2DA] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-[#1C1C1E]">New arrivals</h2>
              <p className="text-sm text-[#8E8E93] mt-0.5">Just listed in the last 24h</p>
            </div>
            <Link href="/listings" className="text-sm text-[#C9A96E] font-medium hover:underline flex items-center gap-1">
              See all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="relative overflow-hidden bg-[#C9A96E] rounded-3xl p-8 md:p-12">
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="cta-pat" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M20 2 L38 20 L20 38 L2 20 Z" stroke="white" strokeWidth="1" fill="none" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#cta-pat)" />
            </svg>
          </div>
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Have Pakistani fashion to sell?
              </h2>
              <p className="text-white/80 text-sm md:text-base max-w-md">
                List your dresses, jewellery and accessories in minutes. Reach thousands of buyers across Europe — shipping is easy, payment is secure.
              </p>
            </div>
            <Link
              href="/listings"
              className="shrink-0 inline-flex items-center gap-2 bg-white text-[#1C1C1E] font-bold px-8 py-4 rounded-full hover:bg-[#FAF7F2] transition-colors text-sm"
            >
              List for free
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
