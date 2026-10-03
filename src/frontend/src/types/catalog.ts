import type {
  Availability,
  Category,
  Order,
  OrderLine,
  Product,
  ShippingInfo,
} from "@/backend";

export type { Availability, Category, Order, OrderLine, Product, ShippingInfo };

export interface CartItem {
  productId: bigint;
  name: string;
  price: bigint;
  image: string;
  quantity: number;
}

export interface CategoryMeta {
  id: string;
  name: string;
  description: string;
  image: string;
  icon: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}
