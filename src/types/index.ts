import type { Product, CartItem } from "./product";
import type { User, Customer, StaffMember, RoleDefinition, Coupon, Address } from "./user";
import type { Order } from "./order";
import type { CMSContent } from "./cms";
import type { AnalyticsData } from "./admin";

export interface ThemeContextType {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export interface CartContextType {
  cart: CartItem[];
  cartTotal: number;
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
}

export interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

export interface CMSContextType {
  content: CMSContent;
  setContent: (content: CMSContent | ((prev: CMSContent) => CMSContent)) => void;
}

export interface WishlistContextType {
  wishlist: number[];
  toggleWishlist: (id: number) => void;
}

export interface AdminContextType {
  orders: Order[];
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  customers: Customer[];
  setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>;
  coupons: Coupon[];
  setCoupons: React.Dispatch<React.SetStateAction<Coupon[]>>;
  roles: RoleDefinition[];
  staff: StaffMember[];
  setStaff: React.Dispatch<React.SetStateAction<StaffMember[]>>;
}

export type { Product, CartItem, User, Customer, StaffMember, RoleDefinition, Coupon, Address, Order, CMSContent, AnalyticsData };
export * from "./product";
export * from "./order";
export * from "./user";
export * from "./cms";
export * from "./admin";
