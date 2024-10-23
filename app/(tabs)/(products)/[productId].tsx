import AddToCartButton from '@/components/add-to-cart-button';
import Block from '@/components/Block';
import ProductVariantPicker, { ProductType } from '@/components/product-detail/variant-picker';
import { Colors } from '@/constants/Colors';
import { useProduct } from '@/hooks/useProduct';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

type Props = {}

function ProductDetailScreen({}: Props) {
  const { productId } = useLocalSearchParams();
  const { product, addProductToCart } = useProduct(productId as string);
  const navigation = useNavigation();
  const [selectedVariant, setSelectedVariant] = useState<string | null>(product?.variations[0] || null);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: product?.name
    });
  }, [productId]);

  const handleAddToCart = () => {
    if (product && selectedVariant) {
      addProductToCart(product, selectedVariant);
      navigation.getParent()?.navigate('(cart)');
    }
  }

  if (!product) {
    return null;
  }

  return (
    <Block scroll style={styles.container}>
      <Block style={styles.imageContainer}>
        <Image source={{ uri: product?.image }} style={styles.image} resizeMode='contain' />
      </Block>
      <Text style={styles.productName}>{product?.name}</Text>
      <Text style={styles.productDetails}>{product?.details}</Text>

      <ProductVariantPicker selectedVariant={selectedVariant} setSelectedVariant={setSelectedVariant} product_type={product?.type as ProductType} />

      <AddToCartButton title="Add to Cart" onPress={handleAddToCart} />
    </Block>
  )
}

export default ProductDetailScreen

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  image: {
    width: '100%',
    height: 300,
  },
  imageContainer: {
    width: '100%',
    height: 300,
    marginBottom: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  productDetails: {
    fontSize: 16,
    color: Colors.light.text,
    marginBottom: 20,
  },
});