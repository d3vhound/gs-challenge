import { create } from 'zustand'
import { IProduct } from '@/types';

export interface CartProduct extends IProduct {
    quantity: number;
    selected_variant: string;
    cart_id: string;
}

interface CartState {
    cart: CartProduct[];
    addToCart: (product: CartProduct) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
    removeProductVariantFromCart: (productId: string, variant: string) => void;
}

export const useCartStore = create<CartState>((set) => ({
  cart: [],
  addToCart: (product: CartProduct) => set((state) => {
    const existingProductIndex = state.cart.findIndex(
        item => item.id === product.id && item.selected_variant === product.selected_variant
    );
    if (existingProductIndex !== -1) {
      const updatedCart = [...state.cart];
      updatedCart[existingProductIndex].quantity += product.quantity;
      return { cart: updatedCart };
    } else {
      return { cart: [...state.cart, product] };
    }
  }),
  removeFromCart: (productId: string) => set((state) => ({ cart: state.cart.filter((product) => product.id !== productId) })),
  removeProductVariantFromCart: (productId: string, variant: string) => set((state) => ({ cart: state.cart.filter((product) => product.id !== productId || product.selected_variant !== variant) })),
  clearCart: () => set({ cart: [] }),
}))