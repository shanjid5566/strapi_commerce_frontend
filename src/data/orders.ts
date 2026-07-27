import type { Order } from "@/types";

export const mockOrders: Order[] = [
  {
    id: "ORD-7291",
    items: [
      { productId: 1, qty: 1 },
      { productId: 6, qty: 1 },
    ],
    total: 1548,
    status: "delivered",
    date: "2025-01-15",
  },
  {
    id: "ORD-6182",
    items: [{ productId: 2, qty: 1 }],
    total: 1299,
    status: "shipped",
    date: "2025-01-18",
  },
  {
    id: "ORD-5034",
    items: [
      { productId: 3, qty: 1 },
      { productId: 7, qty: 2 },
    ],
    total: 1897,
    status: "processing",
    date: "2025-01-20",
  },
  {
    id: "ORD-4521",
    items: [{ productId: 4, qty: 1 }],
    total: 799,
    status: "pending",
    date: "2025-01-22",
  },
  {
    id: "ORD-3892",
    items: [
      { productId: 5, qty: 1 },
      { productId: 8, qty: 1 },
    ],
    total: 1398,
    status: "cancelled",
    date: "2025-01-23",
  },
  {
    id: "ORD-2156",
    items: [{ productId: 1, qty: 2 }],
    total: 2398,
    status: "delivered",
    date: "2025-01-10",
  },
];
