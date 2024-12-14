// src/Navigation/homeNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../components/menu/home';
import FilterProduct from '../components/product/filterProduct';
import { RootStackParamList } from '../components/menu/interface/rootStackParams';
import ProductDetails from '../components/product/productDetails';
import CheckoutPage from '../components/product/checkOut';
const Stack = createStackNavigator<RootStackParamList>();

const HomeNavigator = () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="FilterView" component={FilterProduct} options={{ headerShown: false }} />
    <Stack.Screen name = 'homeProductDetails' component={ProductDetails} options={{ headerShown: false }} />
    <Stack.Screen name = 'Checkout' component={CheckoutPage} options={{ headerShown: false }} />
  </Stack.Navigator>
);

export default HomeNavigator;
