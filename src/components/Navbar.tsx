'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Heart, ShoppingBag, Menu, X, Plus } from 'lucide-react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8E2DA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-full bg-[#2D5A4E] flex items-center justify-center">
              <span className="text-white text-xs font-bold">P</span>
            </div>
            <span className="font-semibold text-[#1C1C1E] text-lg tracking-tight">
              pehnaava
            </span>
          </Link>

          {/* Search bar — desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E8E93]" />
              <input
                type="text"
                placeholder="Search dresses, khussa, jewellery…"
                className="w-full pl-9 pr-4 py-2 bg-white border border-[#E8E2DA] rounded-full text-sm text-[#1C1C1E] placeholder-[#8E8E93] focus:outline-none focus:border-[#C9A96E] focus:ring-1 focus:ring-[#C9A96E]"
              />
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Mobile search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden p-2 rounded-full hover:bg-[#E8E2DA] transition-colors"
            >
              <Search className="w-5 h-5 text-[#1C1C1E]" />
            </button>

            <Link
              href="/listings"
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 btn-gold text-white text-sm font-medium rounded-full"
            >
              <Plus className="w-4 h-4" />
              Sell
            </Link>

            <button className="p-2 rounded-full hover:bg-[#E8E2DA] transition-colors relative">
              <Heart className="w-5 h-5 text-[#1C1C1E]" />
            </button>

            <button className="p-2 rounded-full hover:bg-[#E8E2DA] transition-colors relative">
              <ShoppingBag className="w-5 h-5 text-[#1C1C1E]" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#C9A96E] rounded-full"></span>
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-full hover:bg-[#E8E2DA] transition-colors"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile search bar */}
        {searchOpen && (
          <div className="md:hidden pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E8E93]" />
              <input
                type="text"
                placeholder="Search…"
                autoFocus
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#E8E2DA] rounded-full text-sm focus:outline-none focus:border-[#C9A96E]"
              />
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {menuOpen && (
          <nav className="md:hidden pb-4 border-t border-[#E8E2DA] pt-4 space-y-1">
            {[
              { label: 'Discover', href: '/' },
              { label: 'Browse All', href: '/listings' },
              { label: 'Dresses', href: '/listings?category=dresses' },
              { label: 'Jewellery', href: '/listings?category=jewellery' },
              { label: 'Shoes', href: '/listings?category=shoes' },
              { label: 'Accessories', href: '/listings?category=accessories' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="block px-2 py-2 text-sm text-[#1C1C1E] hover:text-[#C9A96E] transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2">
              <Link
                href="/listings"
                className="flex items-center gap-1.5 w-full justify-center px-4 py-2.5 btn-gold text-white text-sm font-medium rounded-full"
                onClick={() => setMenuOpen(false)}
              >
                <Plus className="w-4 h-4" />
                Start Selling
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
