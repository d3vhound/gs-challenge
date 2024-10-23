import React from 'react'
import Block from '../Block'
import { Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { IProduct } from '@/types'
import AddToCartButton from '../add-to-cart-button'
import { useProduct } from '@/hooks/useProduct'

type Props = {
    product: IProduct
    onPress: () => void
}

const ProductCard = (props: Props) => {
    const { product, onPress } = props;
    const { addProductToCart, isProductInCart } = useProduct(product.id);

    return (
        <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
            <Block card>
                <Block style={styles.imageContainer}>
                    <Image
                        source={{ uri: product.image }}
                        style={{ width: 100, height: 100 }}
                    />
                </Block>
                <Text style={styles.productName}>{product.name}</Text>

                <Block style={styles.addToCartButton}>
                    <AddToCartButton title="Add to Cart" onPress={() => addProductToCart(product)} />
                </Block>
            </Block>
        </TouchableOpacity>
    )
}

export default ProductCard

const styles = StyleSheet.create({
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    addToCartButton: {
        marginTop: 10,
    }
})