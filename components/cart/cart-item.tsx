import { View, Text, Image, StyleSheet, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import { CartProduct, useCartStore } from '@/stores/cart'
import Block from '../Block'
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import ThemedText from '../themed-text'

type Props = {
    cart_product: CartProduct
}

const CartItem = (props: Props) => {
  const { removeProductVariantFromCart } = useCartStore();
  const { cart_product } = props;

  const handleRemove = () => {
    removeProductVariantFromCart(cart_product.id, cart_product.selected_variant);
  }

  return (
    <Block row card>
      <Image source={{ uri: cart_product.image }} style={styles.image} />
      <Block style={styles.info}>
        <ThemedText style={styles.name}>{cart_product.name}</ThemedText>
        <ThemedText style={styles.variant}>{cart_product.selected_variant}</ThemedText>
        <ThemedText style={styles.quantity}>Quantity: {cart_product.quantity}</ThemedText>
      </Block>
      <Block style={styles.remove}>
        <TouchableOpacity onPress={handleRemove}>
          <Ionicons name="trash" size={20} color={Colors.light.destructive} />
        </TouchableOpacity>
      </Block>
    </Block>
  )
}

export default CartItem

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    marginRight: 20
  },
  info: {
    paddingTop: 10,
    gap: 5,
    marginRight: 'auto',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  variant: {
    fontSize: 14,
  },
  quantity: {
    fontSize: 14,
  },
  remove: {
    marginRight: 10,
    alignItems: 'flex-end',
    justifyContent: 'center'
  }
})