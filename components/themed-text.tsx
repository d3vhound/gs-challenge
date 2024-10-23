import { Text, useColorScheme, TextStyle } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'

type Props = {
    children: React.ReactNode,
    style?: TextStyle
}

const ThemedText = (props: Props) => {
  const { children, style } = props;
  const theme = useColorScheme() ?? 'light';

  return (
    <Text style={[{ color: Colors[theme].text }, style]}>
      {children}
    </Text>
  )
}

export default ThemedText
