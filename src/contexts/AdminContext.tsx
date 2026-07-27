'use client';

import { createContext, useContext, useState, useMemo, type ReactNode } from 'react';
import type { AdminContextType, Customer, Coupon, RoleDefinition, StaffMember } from '@/types';
import type { Order } from '@/types';
import { mockOrders } from '@/data/orders';

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const defaultRoles: RoleDefinition[] = [
  { id: 'super_admin', name: 'Super Admin', perms: ['Dashboard', 'Products', 'Orders', 'Brands', 'Customers', 'Coupons', 'Pages', 'Blogs', 'Staff', 'Settings'] },
  { id: 'product_manager', name: 'Product Manager', perms: ['Products', 'Brands', 'Coupons'] },
  { id: 'order_manager', name: 'Order Manager', perms: ['Orders', 'Customers'] },
  { id: 'content_editor', name: 'Content Editor', perms: ['Pages'] },
  { id: 'blog_manager', name: 'Blog Manager', perms: ['Blogs'] },
];

const defaultStaff: StaffMember[] = [
  { id: 1, name: 'Admin User', email: 'admin@mobilehub.com', role: 'super_admin', status: 'active', lastActive: '2 mins ago' },
  { id: 2, name: 'Product Mgr', email: 'product@mobilehub.com', role: 'product_manager', status: 'active', lastActive: '1 hour ago' },
  { id: 3, name: 'Order Mgr', email: 'order@mobilehub.com', role: 'order_manager', status: 'offline', lastActive: '2 days ago' },
];

const defaultCustomers: Customer[] = [
  { id: 1, name: 'Customer 1', email: 'customer1@email.com', orders: 4, spent: 1250, status: 'active' },
  { id: 2, name: 'Customer 2', email: 'customer2@email.com', orders: 2, spent: 450, status: 'active' },
  { id: 3, name: 'Customer 3', email: 'customer3@email.com', orders: 1, spent: 890, status: 'suspended' },
  { id: 4, name: 'Customer 4', email: 'customer4@email.com', orders: 5, spent: 3400, status: 'active' },
  { id: 5, name: 'Customer 5', email: 'customer5@email.com', orders: 3, spent: 2100, status: 'active' },
];

const defaultCoupons: Coupon[] = [
  { id: 1, code: 'WELCOME10', discount: 10, type: 'percent', active: true, uses: 234, target: 'all' },
  { id: 2, code: 'FLAT200', discount: 200, type: 'fixed', active: true, uses: 89, target: 'all' },
  { id: 3, code: 'SUMMER25', discount: 25, type: 'percent', active: false, uses: 567, target: 'all' },
];

interface AdminProviderProps {
  children: ReactNode;
}

export function AdminProvider({ children }: AdminProviderProps) {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [customers, setCustomers] = useState<Customer[]>(defaultCustomers);
  const [coupons, setCoupons] = useState<Coupon[]>(defaultCoupons);
  const [staff, setStaff] = useState<StaffMember[]>(defaultStaff);

  const value = useMemo(() => ({
    orders,
    setOrders,
    customers,
    setCustomers,
    coupons,
    setCoupons,
    roles: defaultRoles,
    staff,
    setStaff,
  }), [orders, customers, coupons, staff]);

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}
