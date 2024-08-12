

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../components/menu/profile';
import SignInScreen from '../components/user/auth';

import ProductDetailsScreen from '../components/product/productDetails';
import ProductStackNavigator from './navigationRoute';
import { RootStackParamList } from '../components/menu/interface/rootStackParams';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="ProfileSection">
      <Stack.Screen name="ProfileSection" component={ProfileScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
      
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ProductsList" component={ProductStackNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
