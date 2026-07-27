export interface ProductSpec {
  key: string;
  value: string;
}

export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  reviews: number;
  stock: number;
  category: string;
  specs: Record<string, string>;
  colors: string[];
  description: string;
  badge?: string;
  images?: { url: string; isMain: boolean }[];
}

export interface CartItem extends Product {
  quantity: number;
}

export type SortOption = "popular" | "price-low" | "price-high" | "rating";
