// src/Navigation/navigationRoute.tsx
import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProductList from '../components/menu/product';
import ProductDetailsScreen from '../components/product/productDetails';
import CheckoutScreen from '../components/product/checkOut';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/actions/productActions';
import { RootStackParamList } from '../components/menu/interface/rootStackParams';
import NewProductSlider from '../components/home/newProduct';

const Stack = createStackNavigator<RootStackParamList>();

const ProductStackNavigator = () => {
  const dispatch : any = useDispatch();
  const products = useSelector((state: any) => state.products.products);

  useEffect(() => {
    const fetchProducts = () => {
      dispatch(getProducts());
    };
    fetchProducts();
  }, [dispatch]);

  return (
    <Stack.Navigator>
      <Stack.Screen name="ProductsList" component={ProductList} initialParams={{ products }} options={{ headerShown: false }} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ headerShown: false }} />
      <Stack.Screen
        name="NewProduct"
        component={(props : any) => <NewProductSlider {...props} products={products} />}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ProductStackNavigator;
