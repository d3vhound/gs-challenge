import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'

type Props = {
    onPress: () => void
    title: string
}

const AddToCartButton = (props: Props) => {
  const { onPress, title } = props;

  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: Colors.light.primary,
        borderRadius: 10,
        alignItems: 'center',
    },
    text: {
        color: Colors.light.background,
        fontWeight: 'bold',
    }
})

export default AddToCartButton