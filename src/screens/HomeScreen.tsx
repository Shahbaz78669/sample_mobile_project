import React, { useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TextInput, RefreshControl } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getProducts, setQuery } from '../store/slices/productsSlice';
import { ProductCard } from '../components/ProductCard';

interface Props {
  navigation: NativeStackNavigationProp<RootStackParamList, 'MainTabs'>;
}

const HomeScreen = ({ navigation }: Props) => {
  const dispatch = useAppDispatch();
  const { items, isLoading, isFetchingMore, hasMore, error, query } = useAppSelector((state) => state.products);

  // Debouncing logic for the search input
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(getProducts({ refresh: true }));
    }, 500); // 500ms debounce
    return () => clearTimeout(timeoutId);
  }, [query, dispatch]);

  const handleSearch = (text: string) => {
    dispatch(setQuery(text));
  };

  const handleLoadMore = () => {
    if (hasMore && !isFetchingMore && !isLoading) {
      dispatch(getProducts({}));
    }
  };

  const handleRefresh = useCallback(() => {
    dispatch(getProducts({ refresh: true }));
  }, [dispatch]);

  const renderFooter = () => {
    if (!isFetchingMore) return null;
    return (
      <View style={styles.footerLoader}>
        <ActivityIndicator size="small" color="#007AFF" />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          placeholderTextColor="#999"
          value={query}
          onChangeText={handleSearch}
          clearButtonMode="while-editing"
        />
      </View>
      
      {isLoading && items.length === 0 ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      ) : error ? (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ProductCard 
              product={item} 
              onPress={() => navigation.navigate('Detail', { product: item })}
            />
          )}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          refreshControl={
            <RefreshControl refreshing={isLoading && items.length > 0} onRefresh={handleRefresh} />
          }
          ListEmptyComponent={
            <View style={styles.centerContainer}>
              <Text style={styles.emptyText}>No products found.</Text>
            </View>
          }
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  searchContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#C6C6C8',
  },
  searchInput: {
    backgroundColor: '#ECECEC',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
  },
  listContent: {
    paddingBottom: 24,
    paddingTop: 8,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 16,
  },
  emptyText: {
    color: '#8E8E93',
    fontSize: 16,
  },
  footerLoader: {
    paddingVertical: 20,
    alignItems: 'center',
  },
});

export default HomeScreen;
