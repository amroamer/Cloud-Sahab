import { createContext, useContext, useReducer, type ReactNode } from "react";
import type { CatalogProduct } from "@/lib/catalog-data";

export interface CartItem {
  product: CatalogProduct;
  quantity: number;
  format: string;
}

interface CartState {
  items: CartItem[];
  promoCode: string | null;
  promoDiscount: number;
}

type CartAction =
  | { type: "ADD_TO_CART"; product: CatalogProduct; format?: string }
  | { type: "REMOVE_FROM_CART"; productId: string }
  | { type: "CLEAR_CART" }
  | { type: "APPLY_PROMO"; code: string }
  | { type: "REMOVE_PROMO" };

const VALID_PROMOS: Record<string, number> = {
  GACA2026: 0.1,
  SAHAB10: 0.1,
  AVIATION20: 0.2,
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existing = state.items.find((i) => i.product.id === action.product.id);
      if (existing) return state;
      return {
        ...state,
        items: [...state.items, { product: action.product, quantity: 1, format: action.format || action.product.format }],
      };
    }
    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter((i) => i.product.id !== action.productId),
      };
    case "CLEAR_CART":
      return { items: [], promoCode: null, promoDiscount: 0 };
    case "APPLY_PROMO": {
      const discount = VALID_PROMOS[action.code.toUpperCase()];
      if (discount) {
        return { ...state, promoCode: action.code.toUpperCase(), promoDiscount: discount };
      }
      return state;
    }
    case "REMOVE_PROMO":
      return { ...state, promoCode: null, promoDiscount: 0 };
    default:
      return state;
  }
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  discount: number;
  vat: number;
  total: number;
  promoCode: string | null;
  promoDiscount: number;
  addToCart: (product: CatalogProduct, format?: string) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  applyPromo: (code: string) => boolean;
  removePromo: () => void;
  isInCart: (productId: string) => boolean;
}

const CartContext = createContext<CartContextType | null>(null);

const VAT_RATE = 0.15;

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    promoCode: null,
    promoDiscount: 0,
  });

  const subtotal = state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = subtotal * state.promoDiscount;
  const afterDiscount = subtotal - discount;
  const vat = Math.round(afterDiscount * VAT_RATE);
  const total = afterDiscount + vat;

  const value: CartContextType = {
    items: state.items,
    itemCount: state.items.length,
    subtotal,
    discount,
    vat,
    total,
    promoCode: state.promoCode,
    promoDiscount: state.promoDiscount,
    addToCart: (product, format) => dispatch({ type: "ADD_TO_CART", product, format }),
    removeFromCart: (productId) => dispatch({ type: "REMOVE_FROM_CART", productId }),
    clearCart: () => dispatch({ type: "CLEAR_CART" }),
    applyPromo: (code) => {
      const valid = !!VALID_PROMOS[code.toUpperCase()];
      if (valid) dispatch({ type: "APPLY_PROMO", code });
      return valid;
    },
    removePromo: () => dispatch({ type: "REMOVE_PROMO" }),
    isInCart: (productId) => state.items.some((i) => i.product.id === productId),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
