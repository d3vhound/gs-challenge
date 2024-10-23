import { View, Text, TouchableOpacity, StyleSheet, useColorScheme } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'

type Props = {
    onPress: () => void
    title: string
}

const AddToCartButton = (props: Props) => {
  const { onPress, title } = props;
  const theme = useColorScheme() ?? 'light';

  return (
    <TouchableOpacity activeOpacity={0.8} style={[{ backgroundColor: Colors[theme].primary }, styles.container]} onPress={onPress}>
      <Text style={[{ color: Colors[theme].primaryForeground }, styles.text]}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    text: {
        fontWeight: 'bold',
    }
})

export default AddToCartButton