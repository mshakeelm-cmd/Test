'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { SlidersHorizontal, Search, ArrowUpDown } from 'lucide-react';
import { products, categories, type Category } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import CategoryBar from '@/components/CategoryBar';
import { Suspense } from 'react';

const CONDITIONS = ['All conditions', 'New with tags', 'Like new', 'Good', 'Fair'];
const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest first' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'popular', label: 'Most liked' },
];

function ListingsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') ?? 'all';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedCondition, setSelectedCondition] = useState('All conditions');
  const [sortBy, setSortBy] = useState('newest');
  const [search, setSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [priceMax, setPriceMax] = useState(500);

  const filtered = useMemo(() => {
    let result = [...products];

    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category === (selectedCategory as Category));
    }

    if (selectedCondition !== 'All conditions') {
      result = result.filter((p) => p.condition === selectedCondition);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q))
      );
    }

    result = result.filter((p) => p.price <= priceMax);

    result.sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'popular') return b.likes - a.likes;
      return a.postedDaysAgo - b.postedDaysAgo;
    });

    return result;
  }, [selectedCategory, selectedCondition, search, priceMax, sortBy]);

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1C1C1E]">Browse listings</h1>
        <p className="text-sm text-[#8E8E93] mt-1">
          {filtered.length} piece{filtered.length !== 1 ? 's' : ''} available
        </p>
      </div>

      {/* Search + controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E8E93]" />
          <input
            type="text"
            placeholder="Search pieces, brands, tags…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#E8E2DA] rounded-full text-sm focus:outline-none focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E]"
          />
        </div>

        <div className="flex gap-2 shrink-0">
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none pl-4 pr-8 py-2.5 bg-white border border-[#E8E2DA] rounded-full text-sm text-[#1C1C1E] focus:outline-none focus:border-[#C9A96E] cursor-pointer"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ArrowUpDown className="absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#8E8E93] pointer-events-none" />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-medium transition-colors ${
              showFilters
                ? 'bg-[#1C1C1E] text-white border-[#1C1C1E]'
                : 'bg-white text-[#1C1C1E] border-[#E8E2DA] hover:border-[#C9A96E]'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-5">
        <CategoryBar selected={selectedCategory} onChange={setSelectedCategory} />
      </div>

      {/* Expandable filters */}
      {showFilters && (
        <div className="bg-white border border-[#E8E2DA] rounded-2xl p-5 mb-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="text-xs font-semibold text-[#8E8E93] uppercase tracking-wide block mb-2">
              Condition
            </label>
            <div className="flex flex-wrap gap-2">
              {CONDITIONS.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCondition(c)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                    selectedCondition === c
                      ? 'bg-[#1C1C1E] text-white border-[#1C1C1E]'
                      : 'bg-white text-[#3A3A3C] border-[#E8E2DA] hover:border-[#C9A96E]'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-[#8E8E93] uppercase tracking-wide block mb-2">
              Max price: €{priceMax}
            </label>
            <input
              type="range"
              min={20}
              max={500}
              step={10}
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="w-full accent-[#C9A96E]"
            />
            <div className="flex justify-between text-xs text-[#8E8E93] mt-1">
              <span>€20</span>
              <span>€500</span>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="text-lg font-semibold text-[#1C1C1E] mb-2">No pieces found</h3>
          <p className="text-sm text-[#8E8E93]">Try adjusting your filters or search terms.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}

export default function ListingsPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-[50vh]"><div className="text-[#8E8E93]">Loading…</div></div>}>
      <ListingsContent />
    </Suspense>
  );
}
