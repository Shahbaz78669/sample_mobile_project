import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Product } from '../types';

export type RootStackParamList = {
  MainTabs: undefined;
  Detail: { product: Product };
};

export type MainTabParamList = {
  Home: undefined;
  Favorites: undefined;
};

export type DetailScreenProps = NativeStackScreenProps<RootStackParamList, 'Detail'>;
