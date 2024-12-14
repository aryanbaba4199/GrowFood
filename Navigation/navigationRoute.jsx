import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProductList from '../components/menu/product';
import ProductDetailsScreen from '../components/product/productDetails';
import CheckoutScreen from '../components/product/checkOut';
import { useDispatch, useSelector } from 'react-redux';

import NewProductSlider from '../components/home/newProduct';

const Stack = createStackNavigator();

const ProductStackNavigator = () => {
  
  const products = useSelector((state) => state.products.products);
  


  // Extracted function for NewProductSlider to avoid inline function
  const RenderNewProductSlider = (props) => <NewProductSlider {...props} products={products} />;
  
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="ProductsList" 
        component={ProductList} 
        initialParams={{ products }} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="ProductDetails" 
        component={ProductDetailsScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Checkout" 
        component={CheckoutScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen
        name="NewProduct"
        component={RenderNewProductSlider} 
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ProductStackNavigator;
