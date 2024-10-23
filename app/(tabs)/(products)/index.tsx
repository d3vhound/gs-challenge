import { StyleSheet, FlatList, TextInput, View, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import ProductCard from '@/components/product-card';
import Block from '@/components/Block';
import { useRouter } from 'expo-router';
import { useProductStore } from '@/stores/products';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export default function HomeScreen() {
  const router = useRouter();
  const { products } = useProductStore();
  const [searchQuery, setSearchQuery] = useState('');
  const theme = useColorScheme() ?? 'light';

  const { data } = useQuery({
    queryKey: ['products', searchQuery],
    queryFn: () => products.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase())),
  });

  const themedInputStyle = {
    borderColor: Colors[theme].border,
    color: Colors[theme].text,
    backgroundColor: Colors[theme].input,
  }

  return (
    <SafeAreaView style={{ paddingHorizontal: 20 }}>
      <View style={[styles.searchContainer, themedInputStyle]}>
        <Ionicons name="search" size={16} color={Colors[theme].icon} />
        <TextInput value={searchQuery} onChangeText={setSearchQuery} style={{ marginLeft: 10, color: Colors[theme].text }} placeholder="Search games, consoles, and more" />
      </View>
      <FlatList
        style={{ marginTop: 10, height: '100%' }}
        data={data}
        numColumns={2}
        columnWrapperStyle={{ marginVertical: 5, gap: 10 }}
        renderItem={({ item, index }) => {
          const lastItem = index === (data?.length ?? 0) - 1;
          return (
            <Block style={{ maxWidth: lastItem ? '50%' : '100%' }}>
              <ProductCard product={item} onPress={() => router.push(`/(products)/${item.id}`)} />
            </Block>
          )
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    height: 45.0,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10 + 5.0,
    marginBottom: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 5,
  },
});
