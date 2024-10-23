import React from 'react'
import { Stack } from 'expo-router';
import { Colors } from '@/constants/Colors';

const ProductsLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name='checkout'
        options={{
          headerShown: true,
          headerBackTitle: 'Back',
          headerTintColor: Colors.light.tint,
          headerTitle: 'Checkout'
        }}
      />
    </Stack>
  );
};

export default ProductsLayout;