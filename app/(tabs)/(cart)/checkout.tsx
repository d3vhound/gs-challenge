import React, { useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, useColorScheme } from 'react-native';
import { useForm, Controller } from "react-hook-form";
import { useCartStore } from '@/stores/cart';
import CartItem from '@/components/cart/cart-item';
import Block from '@/components/Block';
import Button from '@/components/button';
import { Colors } from '@/constants/Colors';
import { toast } from 'sonner-native';
import { useNavigation } from 'expo-router';
import EmptyCart from '@/components/cart/empty-cart';

type FormData = {
  name: string;
  phone: string;
  address: string;
  creditCard: string;
};

const Checkout = () => {
  const navigation = useNavigation();
  const theme = useColorScheme() ?? 'light';
  const { cart, clearCart } = useCartStore();
  const { control, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    defaultValues: {
      name: '',
      phone: '',
      address: '',
      creditCard: '',
    },
  });

  const onSubmit = (data: FormData) => {
    toast.promise(new Promise((resolve) => {
      setTimeout(resolve, 2000);
    }), {
        success: (result) => {
            clearCart();
            reset();
            return 'Order submitted successfully';
        },
        error: 'Failed to submit order',
        loading: 'Submitting order...'
    });

    return new Promise((resolve) => {
        setTimeout(resolve, 2000);
    })
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {
        color: Colors[theme].text,
      },
      headerTintColor: Colors[theme].text,
    });
  }, []);

  const themedInputStyle = {
    borderColor: Colors[theme].border,
    color: Colors[theme].text,
    backgroundColor: Colors[theme].input,
  }

  return (
    <ScrollView style={styles.container}>
      {cart.map((item) => (
        <Block key={item.cart_id} style={{ marginBottom: 10 }}>
          <CartItem cart_product={item} />
        </Block>
      ))}

      {cart.length > 0 ? (
        <Block card style={styles.form}>
          <Controller
            control={control}
          rules={{ required: "Name is required" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, themedInputStyle]}
              placeholder="Name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="name"
        />
        {errors.name && <Text style={styles.errorText}>{errors.name.message}</Text>}

        <Controller
          control={control}
          rules={{ 
            required: "Phone number is required",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Please enter a valid 10-digit phone number"
            }
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, themedInputStyle]}
              placeholder="Phone"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="phone-pad"
            />
          )}
          name="phone"
        />
        {errors.phone && <Text style={styles.errorText}>{errors.phone.message}</Text>}

        <Controller
          control={control}
          rules={{ required: "Address is required" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, themedInputStyle]}
              placeholder="Shipping Address"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              multiline
            />
          )}
          name="address"
        />
        {errors.address && <Text style={styles.errorText}>{errors.address.message}</Text>}

        <Controller
          control={control}
          rules={{ 
            required: "Credit card number is required",
            pattern: {
              value: /^[0-9]{16}$/,
              message: "Please enter a valid 16-digit credit card number"
            }
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, themedInputStyle]}
              placeholder="Credit Card Number"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="numeric"
            />
          )}
          name="creditCard"
        />
        {errors.creditCard && <Text style={styles.errorText}>{errors.creditCard.message}</Text>}
        </Block>
      ) : (
        <EmptyCart />
      )}

      <Button disabled={Object.keys(errors).length > 0 || cart.length === 0 || isSubmitting} title="Place Order" onPress={handleSubmit(onSubmit)} style={styles.submitButton} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  form: {
    marginTop: 20,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  submitButton: {
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default Checkout;
