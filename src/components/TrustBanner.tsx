const trusts = [
  {
    icon: '🚚',
    title: 'Ships across Europe',
    sub: '2–5 days, tracked',
  },
  {
    icon: '🔒',
    title: 'Secure payments',
    sub: 'Buyer protection included',
  },
  {
    icon: '✅',
    title: 'Verified sellers',
    sub: 'ID & address checked',
  },
  {
    icon: '♻️',
    title: 'Circular fashion',
    sub: 'Give craftsmanship a second life',
  },
];

export default function TrustBanner() {
  return (
    <div className="bg-[#2D5A4E] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {trusts.map((t) => (
            <div key={t.title} className="flex items-start gap-3">
              <span className="text-2xl mt-0.5">{t.icon}</span>
              <div>
                <div className="text-sm font-semibold">{t.title}</div>
                <div className="text-xs text-white/70 mt-0.5">{t.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
