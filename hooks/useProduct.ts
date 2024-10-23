import { useCartStore } from "@/stores/cart";
import { useProductStore } from "@/stores/products";
import { IProduct } from "@/types";
import { toast } from "sonner-native";

export function useProduct(productId: string) {
    const { products } = useProductStore();
    const product = products.find((product) => product.id === productId);
    const addToCart = useCartStore((state) => state.addToCart);
    const removeFromCart = useCartStore((state) => state.removeFromCart);
    const cart = useCartStore((state) => state.cart);
    const isProductInCart = cart.some((product) => product.id === productId);

    const addProductToCart = (product: IProduct, selected_variant?: string) => {
        addToCart({
            ...product,
            quantity: 1,
            selected_variant: selected_variant ? selected_variant : product.variations[0],
            cart_id: `${product.id}-${selected_variant ? selected_variant : product.variations[0]}`
        });

        toast.success('Product added to cart');
    }

    const removeProductFromCart = (productId: string) => {
        removeFromCart(productId);
        toast.success('Product removed from cart');
    }

    return {
        product,
        addProductToCart,
        removeProductFromCart,
        isProductInCart
    }
}