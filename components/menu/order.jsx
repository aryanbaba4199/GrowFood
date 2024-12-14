import React, { useEffect, useState, useContext } from 'react';
import { View, Alert, } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OrdersScreen from '../Orders/Orders';
import OrderItemDetail from '../Orders/OrderItemDetail';
import axios from 'axios';
import { getOrdersByUser, getProductbyId } from '../API';
import { GlobalContext } from '../../App';
import { useNavigation } from '@react-navigation/native';

const Order = () => {
  const Stack = createNativeStackNavigator();
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(false);
  const {userDetails} = useContext(GlobalContext);
  const [refreshing, setRefreshing] = useState(false);


  const navigation = useNavigation();

  useEffect(() => {
    if (userDetails.id) {
      getOrders(userDetails.id);
    } else {
      Alert.alert('Please log in to get your orders list');
    }
  }, [userDetails]);

  const getOrders = async id => {
    setLoader(true);
    try {
      const res = await axios.get(`${getOrdersByUser}/${id}`);
      if (res.status === 200) {
        setOrders(res.data);
        const productIds = res.data.map(item => item.productId);
        await getProducts(productIds);
      } else {
        setOrders([]);
        setLoader(false);
      }
    } catch (err) {
      console.error(err);
      setLoader(false);
      Alert.alert('Something went wrong in getting Orders');
    }
  };

  const getProducts = async ids => {
    setLoader(true);
    try {
      const productData = await Promise.all(
        ids.map(async id => {
          const res = await axios.get(`${getProductbyId}/${id}`);
          return res.data;
        }),
      );
      setProducts(productData);
      setLoader(false);
    } catch (err) {
      setLoader(false);
      console.error(err);
      Alert.alert('Something went wrong in getting Products');
    }
  };

  const handleOrderClick = (id) => {
    const productDetails = products.find(product => product._id === id);
    const orderDetails = orders.find(item => item.productId === id);
    navigation.navigate('orderItemDetails', { productDetails, orderDetails });
  };

  return (
    <Stack.Navigator>
      <Stack.Screen 
        name='OrdersDetails' 
        options={{ headerShown: false }}
      >
        {(props) => (
          <OrdersScreen 
            {...props} 
            userDetails={userDetails}
            loader={loader}
            handleOrderClick={handleOrderClick}
            orders={orders}
            getOrders={getOrders}
            products={products}
            refreshing = {refreshing}
            setRefreshing = {setRefreshing}
          />
        )}
      </Stack.Screen>
      <Stack.Screen 
        name='orderItemDetails' 
        options={{ headerShown: false }}>
          {(props)=>(
            <OrderItemDetail
              {...props}
              getOrders={getOrders}
              loader={loader}
              setLoader={setLoader}
              userDetails = {userDetails}
            />
            
          )}
          
          </Stack.Screen> 
      
    </Stack.Navigator>
  );
};

export default Order;
