import { productImage } from "@/lib/catalog";
import type { CartItem, Product } from "@/types/catalog";
import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const STORAGE_KEY = "galsen-gaming-cart";

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: bigint;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: bigint) => void;
  updateQuantity: (productId: bigint, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function readStoredItems(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Array<
      Omit<CartItem, "productId"> & { productId: string }
    >;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((item) => item && typeof item.productId === "string")
      .map((item) => ({
        productId: BigInt(item.productId),
        name: item.name,
        price: BigInt(item.price),
        image: item.image,
        quantity: Math.max(1, Number(item.quantity) || 1),
      }));
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(readStoredItems);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const serializable = items.map((item) => ({
      ...item,
      productId: item.productId.toString(),
      price: item.price.toString(),
    }));
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(serializable));
  }, [items]);

  const addItem = useCallback((product: Product, quantity = 1) => {
    setItems((current) => {
      const existing = current.find((item) => item.productId === product.id);
      if (existing) {
        return current.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [
        ...current,
        {
          productId: product.id,
          name: product.name,
          price: product.price,
          image: productImage(product),
          quantity,
        },
      ];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((productId: bigint) => {
    setItems((current) =>
      current.filter((item) => item.productId !== productId),
    );
  }, []);

  const updateQuantity = useCallback((productId: bigint, quantity: number) => {
    setItems((current) =>
      current
        .map((item) =>
          item.productId === productId
            ? { ...item, quantity: Math.max(0, quantity) }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const value = useMemo<CartContextValue>(() => {
    const itemCount = items.reduce((total, item) => total + item.quantity, 0);
    const subtotal = items.reduce(
      (total, item) => total + item.price * BigInt(item.quantity),
      0n,
    );
    return {
      items,
      itemCount,
      subtotal,
      isOpen,
      openCart,
      closeCart,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    };
  }, [
    items,
    isOpen,
    openCart,
    closeCart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart doit être utilisé dans un CartProvider");
  }
  return context;
}
