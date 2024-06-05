import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Product from '../components/menu/product';
import ProductDetails from '../components/product/productDetails';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/actions/productActions';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../components/menu/interface/rootStackParams';


const Stack = createStackNavigator<RootStackParamList>();

const ProductStackNavigator = () => {
  const dispatch: any = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      await dispatch(getProducts());
      setLoading(false);
    };

    fetchProducts();
  }, [dispatch]);

  const products = useSelector((state: any) => state.products.products);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Products"
        component={Product}
        initialParams={{ products }}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ProductStackNavigator;

export interface PageProps<T extends keyof RootStackParamList> {
  navigation: NativeStackNavigationProp<RootStackParamList, T>;
}

