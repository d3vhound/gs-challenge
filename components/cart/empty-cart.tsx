import { View, Text } from 'react-native'
import React from 'react'
import Block from '../Block'
import Button from '../button'
import { useNavigation } from 'expo-router'
import ThemedText from '../themed-text'

type Props = {}

const EmptyCart = (props: Props) => {
  const navigation = useNavigation();

  return (
    <Block align='center' justify='center' style={{ padding: 20, marginTop: 20 }}>
      <ThemedText style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>No items in cart</ThemedText>
      <Button onPress={() => navigation.getParent()?.navigate('(products)') } title='Continue Shopping' />
    </Block>
  )
}

export default EmptyCart