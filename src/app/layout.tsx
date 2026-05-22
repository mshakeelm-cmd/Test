import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Pehnaava — Pre-loved Pakistani Fashion in Europe',
  description:
    'Buy and sell pre-loved Pakistani dresses, jewellery, shoes and accessories. Shipped fast across Europe with buyer protection.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-[#FAF7F2]">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
