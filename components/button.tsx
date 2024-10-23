import { TouchableOpacity, StyleSheet, Text, ViewStyle, useColorScheme } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'

type Props = {
    onPress: () => void,
    title?: string,
    style?: ViewStyle | ViewStyle[],
    variant?: 'primary' | 'secondary',
    disabled?: boolean
}

const Button = (props: Props) => {
  const { onPress, title, style, variant, disabled } = props;
  const theme = useColorScheme() ?? 'light';

  return (
    <TouchableOpacity activeOpacity={0.8} style={[{ backgroundColor: Colors[theme].primary }, styles.container, style, variant === 'secondary' && { backgroundColor: Colors[theme].mutedForeground }, disabled && styles.disabled]} onPress={onPress} disabled={disabled}>
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
    },
    disabled: {
        opacity: 0.5,
    }
})

export default Button