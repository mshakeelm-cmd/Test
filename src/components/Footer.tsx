import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#1C1C1E] text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-[#C9A96E] flex items-center justify-center">
                <span className="text-white text-xs font-bold">P</span>
              </div>
              <span className="text-lg font-semibold tracking-tight">pehnaava</span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              Pakistani craftsmanship meets European convenience. Pre-loved, always loved.
            </p>
            <div className="flex gap-2 mt-4">
              {['🇬🇧', '🇳🇱', '🇫🇷', '🇩🇪', '🇮🇹', '🇪🇸'].map((flag) => (
                <span key={flag} className="text-lg">{flag}</span>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest text-white/40 uppercase mb-3">Shop</h4>
            <ul className="space-y-2">
              {['All listings', 'Dresses', 'Jewellery', 'Shoes', 'Accessories', 'Featured'].map((item) => (
                <li key={item}>
                  <Link href="/listings" className="text-sm text-white/70 hover:text-[#C9A96E] transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sell */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest text-white/40 uppercase mb-3">Sell</h4>
            <ul className="space-y-2">
              {['How it works', 'Pricing & fees', 'Seller guide', 'Shipping tips', 'Seller community'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-white/70 hover:text-[#C9A96E] transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest text-white/40 uppercase mb-3">Support</h4>
            <ul className="space-y-2">
              {['Help centre', 'Buyer protection', 'Returns policy', 'Safe shipping', 'Contact us'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-white/70 hover:text-[#C9A96E] transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/40">
            © 2025 Pehnaava. Made with love for the diaspora in Europe.
          </p>
          <div className="flex items-center gap-4">
            {['Privacy', 'Terms', 'Cookies'].map((item) => (
              <Link key={item} href="#" className="text-xs text-white/40 hover:text-white/70 transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
