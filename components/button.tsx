import { TouchableOpacity, StyleSheet, Text, ViewStyle } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'

type Props = {
    onPress: () => void,
    title?: string,
    style?: ViewStyle,
    variant?: 'primary' | 'secondary',
    disabled?: boolean
}

const Button = (props: Props) => {
  const { onPress, title, style, variant, disabled } = props;

  return (
    <TouchableOpacity activeOpacity={0.8} style={[styles.container, style, variant === 'secondary' && styles.secondary, disabled && styles.disabled]} onPress={onPress} disabled={disabled}>
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
    },
    secondary: {
        backgroundColor: Colors.light.mutedForeground,
    },
    disabled: {
        opacity: 0.5,
    }
})

export default Button