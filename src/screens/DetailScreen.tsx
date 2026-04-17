import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { DetailScreenProps } from '../navigation/types';
import { useAppDispatch, useAppSelector } from '../hooks';
import { toggleFavorite } from '../store/slices/favoritesSlice';

const DetailScreen = ({ route }: DetailScreenProps) => {
  const { product } = route.params;
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.favorites);
  
  const isFavorite = favorites.some((item) => item.id === product.id);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(product));
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Image source={{ uri: product.thumbnail }} style={styles.image} resizeMode="contain" />
      
      <View style={styles.detailsContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.price}>${product.price}</Text>
        </View>

        <Text style={styles.brand}>{product.brand}</Text>
        
        <View style={styles.metaInfo}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{product.category}</Text>
          </View>
          <Text style={styles.rating}>⭐ {product.rating.toFixed(1)}</Text>
        </View>

        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{product.description}</Text>
        
        <Text style={styles.stockInfo}>
          Availability: <Text style={styles.stockBold}>{product.stock} units</Text>
        </Text>

        <TouchableOpacity 
          style={[styles.favoriteBtn, isFavorite ? styles.favoriteBtnActive : null]} 
          onPress={handleToggleFavorite}
          activeOpacity={0.8}
        >
          <Text style={[styles.favoriteBtnText, isFavorite ? styles.favoriteBtnTextActive : null]}>
            {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    paddingBottom: 40,
  },
  image: {
    width: '100%',
    height: 300,
    backgroundColor: '#f5f5f5',
  },
  detailsContainer: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,
    marginRight: 16,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  brand: {
    fontSize: 16,
    color: '#8E8E93',
    marginBottom: 16,
    textTransform: 'uppercase',
  },
  metaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  badge: {
    backgroundColor: '#E5F1FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 12,
  },
  badgeText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  rating: {
    fontSize: 16,
    color: '#FF9500',
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 24,
  },
  stockInfo: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  stockBold: {
    fontWeight: '600',
  },
  favoriteBtn: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  favoriteBtnActive: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#007AFF',
  },
  favoriteBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  favoriteBtnTextActive: {
    color: '#007AFF',
  },
});

export default DetailScreen;
