export type Category = 'dresses' | 'shoes' | 'jewellery' | 'accessories';

export interface Seller {
  id: string;
  name: string;
  city: string;
  country: string;
  countryFlag: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  joinedYear: number;
  avatar: string;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  currency: string;
  category: Category;
  condition: 'New with tags' | 'Like new' | 'Good' | 'Fair';
  size?: string;
  brand?: string;
  origin: string;
  description: string;
  tags: string[];
  images: string[];
  seller: Seller;
  location: string;
  shippingTime: string;
  likes: number;
  views: number;
  postedDaysAgo: number;
  featured?: boolean;
}

export const sellers: Seller[] = [
  {
    id: 's1',
    name: 'Ayesha K.',
    city: 'Amsterdam',
    country: 'Netherlands',
    countryFlag: '🇳🇱',
    rating: 4.9,
    reviewCount: 48,
    verified: true,
    joinedYear: 2022,
    avatar: 'AK',
  },
  {
    id: 's2',
    name: 'Nadia R.',
    city: 'London',
    country: 'United Kingdom',
    countryFlag: '🇬🇧',
    rating: 4.8,
    reviewCount: 112,
    verified: true,
    joinedYear: 2021,
    avatar: 'NR',
  },
  {
    id: 's3',
    name: 'Sana M.',
    city: 'Paris',
    country: 'France',
    countryFlag: '🇫🇷',
    rating: 5.0,
    reviewCount: 23,
    verified: true,
    joinedYear: 2023,
    avatar: 'SM',
  },
  {
    id: 's4',
    name: 'Fatima A.',
    city: 'Madrid',
    country: 'Spain',
    countryFlag: '🇪🇸',
    rating: 4.7,
    reviewCount: 67,
    verified: false,
    joinedYear: 2022,
    avatar: 'FA',
  },
  {
    id: 's5',
    name: 'Zara H.',
    city: 'Berlin',
    country: 'Germany',
    countryFlag: '🇩🇪',
    rating: 4.9,
    reviewCount: 89,
    verified: true,
    joinedYear: 2020,
    avatar: 'ZH',
  },
  {
    id: 's6',
    name: 'Mariam T.',
    city: 'Milan',
    country: 'Italy',
    countryFlag: '🇮🇹',
    rating: 4.6,
    reviewCount: 34,
    verified: true,
    joinedYear: 2023,
    avatar: 'MT',
  },
];

export const products: Product[] = [
  {
    id: 'p1',
    title: 'Silk Embroidered Anarkali — Forest Green',
    price: 145,
    currency: 'EUR',
    category: 'dresses',
    condition: 'Like new',
    size: 'M',
    brand: 'Sapphire',
    origin: 'Lahore, Pakistan',
    description:
      'Stunning silk anarkali with hand-embroidered gold zari work on the bodice and sleeves. Worn once for Eid. Comes with matching dupatta and inner lining. The craftsmanship is exceptional — you can feel the quality of Lahori silk immediately. Perfect for weddings, mehndi nights or formal dinners.',
    tags: ['anarkali', 'eid', 'silk', 'embroidered', 'formal', 'green'],
    images: ['/api/placeholder/600/800'],
    seller: sellers[0],
    location: 'Amsterdam, NL',
    shippingTime: '2–3 days within EU',
    likes: 34,
    views: 289,
    postedDaysAgo: 2,
    featured: true,
  },
  {
    id: 'p2',
    title: 'Pakistani Khussa — Ivory & Gold',
    price: 55,
    currency: 'EUR',
    category: 'shoes',
    condition: 'Good',
    size: '38',
    origin: 'Multan, Pakistan',
    description:
      'Authentic Multani khussa with intricate thread embroidery and mirror work. Genuine leather sole, extremely comfortable once broken in. A true artisan piece that pairs beautifully with both eastern and western outfits.',
    tags: ['khussa', 'embroidered', 'leather', 'artisan', 'bridal'],
    images: ['/api/placeholder/600/800'],
    seller: sellers[1],
    location: 'London, UK',
    shippingTime: '3–4 days within EU',
    likes: 21,
    views: 156,
    postedDaysAgo: 5,
  },
  {
    id: 'p3',
    title: 'Polki Choker Set — Ruby & Gold',
    price: 220,
    currency: 'EUR',
    category: 'jewellery',
    condition: 'New with tags',
    origin: 'Karachi, Pakistan',
    description:
      'Breathtaking polki and ruby choker with matching earrings and maang tikka. Sterling silver base with 22k gold plating. Sourced from a heritage jeweller in Karachi. Never worn — bought for a wedding that was eventually held abroad. Perfect for mehndi or bridal wear.',
    tags: ['polki', 'choker', 'bridal', 'ruby', 'gold', 'heritage'],
    images: ['/api/placeholder/600/800'],
    seller: sellers[2],
    location: 'Paris, FR',
    shippingTime: '2–3 days within EU',
    likes: 89,
    views: 712,
    postedDaysAgo: 1,
    featured: true,
  },
  {
    id: 'p4',
    title: 'Zara Shahjahan Lawn Suit — Blush Pink',
    price: 75,
    currency: 'EUR',
    category: 'dresses',
    condition: 'Like new',
    size: 'S',
    brand: 'Zara Shahjahan',
    origin: 'Lahore, Pakistan',
    description:
      'Unstitched Zara Shahjahan premium lawn suit in blush pink with intricate digital print. Purchased directly from the brand in Pakistan. Includes lawn shirt, cotton dupatta, and trouser fabric. Beautiful for summer wear or casual gatherings.',
    tags: ['lawn', 'zara shahjahan', 'summer', 'casual', 'blush'],
    images: ['/api/placeholder/600/800'],
    seller: sellers[3],
    location: 'Madrid, ES',
    shippingTime: '3–5 days within EU',
    likes: 45,
    views: 334,
    postedDaysAgo: 7,
  },
  {
    id: 'p5',
    title: 'Hand-Painted Ajrak Shawl — Indigo',
    price: 95,
    currency: 'EUR',
    category: 'accessories',
    origin: 'Sindh, Pakistan',
    condition: 'New with tags',
    description:
      'Authentic Sindhi ajrak hand-block printed using natural indigo and madder dyes. A UNESCO-recognised craft — each piece is unique and takes 16 steps to complete. Luxuriously soft, large enough to style as a wrap dress or statement shawl.',
    tags: ['ajrak', 'sindhi', 'block print', 'shawl', 'natural dye', 'heritage'],
    images: ['/api/placeholder/600/800'],
    seller: sellers[4],
    location: 'Berlin, DE',
    shippingTime: '2–3 days within EU',
    likes: 67,
    views: 498,
    postedDaysAgo: 3,
    featured: true,
  },
  {
    id: 'p6',
    title: 'Sana Safinaz Formal Organza — Midnight Blue',
    price: 185,
    currency: 'EUR',
    category: 'dresses',
    condition: 'Like new',
    size: 'M',
    brand: 'Sana Safinaz',
    origin: 'Lahore, Pakistan',
    description:
      'Gorgeous organza formal by Sana Safinaz — sequin embellished bodice with a flowy A-line silhouette. Worn once. The midnight blue catches light beautifully. Comes with a matching organza dupatta.',
    tags: ['organza', 'sana safinaz', 'formal', 'sequin', 'blue'],
    images: ['/api/placeholder/600/800'],
    seller: sellers[5],
    location: 'Milan, IT',
    shippingTime: '2–4 days within EU',
    likes: 58,
    views: 441,
    postedDaysAgo: 4,
  },
  {
    id: 'p7',
    title: 'Hyderabadi Jhumkas — Antique Gold',
    price: 65,
    currency: 'EUR',
    category: 'jewellery',
    condition: 'Good',
    origin: 'Hyderabad, Pakistan',
    description:
      'Classic Hyderabadi jhumkas with fine granulation work in antique gold finish. Lightweight despite appearance — no ear pulling. These complement both salwar kameez and casual western outfits. A timeless everyday piece.',
    tags: ['jhumka', 'earrings', 'antique', 'gold', 'hyderabadi'],
    images: ['/api/placeholder/600/800'],
    seller: sellers[0],
    location: 'Amsterdam, NL',
    shippingTime: '2–3 days within EU',
    likes: 29,
    views: 203,
    postedDaysAgo: 9,
  },
  {
    id: 'p8',
    title: 'Pakistani Clutch — Zardozi Embroidered',
    price: 80,
    currency: 'EUR',
    category: 'accessories',
    condition: 'New with tags',
    origin: 'Karachi, Pakistan',
    description:
      'Exquisite zardozi hand-embroidered clutch with silver and gold thread work. Hard-box style with magnetic closure and detachable chain strap. Fits phone, cards and essentials. Perfect for weddings and formal events.',
    tags: ['clutch', 'zardozi', 'embroidered', 'bridal', 'silver'],
    images: ['/api/placeholder/600/800'],
    seller: sellers[1],
    location: 'London, UK',
    shippingTime: '3–4 days within EU',
    likes: 41,
    views: 317,
    postedDaysAgo: 6,
    featured: true,
  },
  {
    id: 'p9',
    title: 'Maria B. Chiffon Saree — Coral',
    price: 130,
    currency: 'EUR',
    category: 'dresses',
    condition: 'Like new',
    size: 'Free size',
    brand: 'Maria B.',
    origin: 'Lahore, Pakistan',
    description:
      'Beautiful Maria B. chiffon saree in coral with silver border embellishment. Comes pre-stitched — just drape and go. Worn once at a family wedding. Unbelievably light and easy to wear, even if you\'re new to sarees.',
    tags: ['saree', 'maria b', 'chiffon', 'coral', 'wedding'],
    images: ['/api/placeholder/600/800'],
    seller: sellers[2],
    location: 'Paris, FR',
    shippingTime: '2–3 days within EU',
    likes: 72,
    views: 556,
    postedDaysAgo: 2,
  },
  {
    id: 'p10',
    title: 'Leather Kolhapuri Sandals — Tan',
    price: 45,
    currency: 'EUR',
    category: 'shoes',
    condition: 'Good',
    size: '37',
    origin: 'Peshawar, Pakistan',
    description:
      'Handcrafted vegetable-tanned leather sandals from a small workshop in Peshawar. Extremely durable and get more beautiful with age. Perfect for summer and pair effortlessly with casual western or eastern looks.',
    tags: ['sandals', 'leather', 'artisan', 'kolhapuri', 'casual'],
    images: ['/api/placeholder/600/800'],
    seller: sellers[3],
    location: 'Madrid, ES',
    shippingTime: '3–5 days within EU',
    likes: 18,
    views: 142,
    postedDaysAgo: 11,
  },
  {
    id: 'p11',
    title: 'Pashmina Wrap — Ivory with Sozni Embroidery',
    price: 160,
    currency: 'EUR',
    category: 'accessories',
    condition: 'New with tags',
    origin: 'Kashmir, Pakistan',
    description:
      'Genuine 100% Pashmina with delicate Sozni needle embroidery across the border. Incredibly soft — the kind of softness that makes cashmere jealous. A statement piece for European winters. Certificate of authenticity included.',
    tags: ['pashmina', 'kashmir', 'sozni', 'embroidered', 'luxury'],
    images: ['/api/placeholder/600/800'],
    seller: sellers[4],
    location: 'Berlin, DE',
    shippingTime: '2–3 days within EU',
    likes: 93,
    views: 789,
    postedDaysAgo: 1,
    featured: true,
  },
  {
    id: 'p12',
    title: 'Bridal Nath — Pearl & Kundan',
    price: 175,
    currency: 'EUR',
    category: 'jewellery',
    condition: 'Like new',
    origin: 'Lahore, Pakistan',
    description:
      'Stunning bridal nath (nose ring) with pearl drops and kundan setting. This is a clip-on style — no piercing needed. Adjustable fit. Worn for one wedding shoot. Comes in original velvet box with anti-tarnish cloth.',
    tags: ['nath', 'bridal', 'kundan', 'pearl', 'nose ring'],
    images: ['/api/placeholder/600/800'],
    seller: sellers[5],
    location: 'Milan, IT',
    shippingTime: '2–4 days within EU',
    likes: 54,
    views: 412,
    postedDaysAgo: 8,
  },
];

export const categories = [
  { id: 'all', label: 'All', emoji: '✨' },
  { id: 'dresses', label: 'Dresses', emoji: '👗' },
  { id: 'shoes', label: 'Shoes', emoji: '👠' },
  { id: 'jewellery', label: 'Jewellery', emoji: '💎' },
  { id: 'accessories', label: 'Accessories', emoji: '🧣' },
];
