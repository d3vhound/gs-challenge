import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { Toaster } from 'sonner-native';
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useColorScheme } from '@/hooks/useColorScheme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useProductStore } from '@/stores/products';
import productsJson from '@/data/products.json';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const queryClient = new QueryClient();
  const colorScheme = useColorScheme();
  const [fontsLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [loaded, setLoaded] = useState(false);
  const { setProducts } = useProductStore();

  useEffect(() => {
    if (fontsLoaded) {
      setProducts(productsJson.products);
      setLoaded(true);
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <Toaster />
        </ThemeProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
