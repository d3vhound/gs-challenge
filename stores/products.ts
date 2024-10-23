import { IProduct } from '@/types';
import { create } from 'zustand';

interface ProductState {
    products: IProduct[];
    setProducts: (products: IProduct[]) => void;
}

export const useProductStore = create<ProductState>((set) => ({
    products: [],
    setProducts: (products: IProduct[]) => set({ products }),
}))