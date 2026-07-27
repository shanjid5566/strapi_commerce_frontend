export type UserRole =
  | "super_admin"
  | "product_manager"
  | "order_manager"
  | "content_editor"
  | "blog_manager"
  | "customer";

export interface User {
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
}

export interface Address {
  id: number;
  label: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  orders: number;
  spent: number;
  status: "active" | "suspended";
}

export interface StaffMember {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "active" | "offline";
  lastActive: string;
}

export interface RoleDefinition {
  id: string;
  name: string;
  perms: string[];
}

export interface Coupon {
  id: number;
  code: string;
  discount: number;
  type: "percent" | "fixed";
  active: boolean;
  uses: number;
  target: string | number;
}
