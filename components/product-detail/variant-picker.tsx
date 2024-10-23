import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Block from '../Block'
import { Colors } from '@/constants/Colors'
import Button from '../button'

export enum ProductType {
  GAME = 'video games',
  CLOTHING = 'clothing',
  CONSOLE = 'console',
}

type Props = {
    product_type: ProductType.GAME | ProductType.CONSOLE | ProductType.CLOTHING
    selectedVariant: string | null
    setSelectedVariant: (variant: string) => void
}

const getProductVariants = (product_type: ProductType) => {
  switch (product_type) {
    case ProductType.GAME:
      return ['Digital', 'New', 'Pre-Owned'];
    case ProductType.CONSOLE:
      return ['New', 'Pre-Owned', 'Refurbished'];
    case ProductType.CLOTHING:
      return ['Small', 'Medium', 'Large'];
  }
}

const ProductVariantPicker = (props: Props) => {
  const { product_type, selectedVariant, setSelectedVariant } = props;
  const variants = getProductVariants(product_type);

  return (
    <Block>
      <Block row style={styles.variants}>
        {variants.map((variant) => (
        <Button 
            key={variant} 
            title={variant}
            style={[styles.variant, selectedVariant !== variant ? { opacity: 0.5 } : {}]}
            variant={selectedVariant === variant ? 'primary' : 'secondary'}
            onPress={() => setSelectedVariant(variant)}
          />
        ))}
      </Block>
    </Block>
  )
}

export default ProductVariantPicker

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  variants: {
    gap: 10,
    marginBottom: 20,
  },
  variant: {
    padding: 10,
    borderRadius: 5,
  }
})