import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CartHome from '../cart/CartHome';
import ProductDetails from '../product/productDetails';
import CheckoutPage from '../product/checkOut';


const Stack = createNativeStackNavigator()

const Cart = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='CartHome' component={CartHome} options={{headerShown : false}}/>
      <Stack.Screen name ='cartDetails' component={ProductDetails} options={{headerShown : false}}/>
      <Stack.Screen name = 'cartCheckout' component={CheckoutPage} options={{headerShown : false}}/>
     
    </Stack.Navigator>
  );
}

export default Cart;
