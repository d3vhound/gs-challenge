import Block from '@/components/Block';
import Button from '@/components/button';
import CartItem from '@/components/cart/cart-item';
import EmptyCart from '@/components/cart/empty-cart';
import { Colors } from '@/constants/Colors';
import { useCartStore } from '@/stores/cart';
import { useRouter } from 'expo-router';
import { StyleSheet, SafeAreaView, Text, FlatList } from 'react-native';

export default function CartScreen() {
  const { cart, clearCart } = useCartStore();
  const router = useRouter();

  return (
    <SafeAreaView>
      <FlatList
        style={{ height: '100%' }}
        ItemSeparatorComponent={() => <Block style={{ height: 20 }} />}
        contentContainerStyle={{ padding: 20 }}
        data={cart}
        keyExtractor={(item) => `${item.id}-${item.selected_variant}`}
        ListEmptyComponent={<EmptyCart />}
        ListFooterComponent={() => {
          if (cart.length === 0) return null;

          return (
            <Block style={{ marginTop: 20 }}>
              <Button style={{ marginBottom: 10 }} title="Proceed to Checkout" onPress={() => router.push('/checkout')} />
              <Button style={{ backgroundColor: Colors.light.destructive }} title="Clear Cart" onPress={() => clearCart()} />
            </Block>
          )
        }}
        renderItem={({ item }) => (
          <CartItem cart_product={item} />
        )}
      />
    </SafeAreaView>
  );
}
