import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Text, Title } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProductSection from "./checkout/productDisplay"
import auth from '@react-native-firebase/auth'
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../menu/interface/rootStackParams';
import { createOrder } from '../../redux/actions/orderAction';
import { GlobalContext } from '../../App';
import CardContent from 'react-native-paper/lib/typescript/components/Card/CardContent';
import { ScrollView } from 'react-native-gesture-handler';


const CheckoutPage = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Checkout'>>();
  const dispatch: any = useDispatch();
  const { product, quantity } = route.params;
  const [qty, setQty] = useState(quantity);

  const { userDetails, address } = useContext(GlobalContext);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentId, setPaymentId] = useState('');


  console.log('User is ', address);

  const handlePaymentMethodChange = (method: any) => {
    setPaymentMethod(method);
  };

  const handleOrder = () => {
    const productId = product._id;
    const userId = userDetails.id;
    const quantity = qty;
    const orderAmount = product.price * qty
    const order = { productId, quantity, userDetails, userId, orderAmount, paymentId, paymentMode: paymentMethod }
    if (paymentMethod === 'Cash') {
      dispatch(createOrder(order))
    } else {
      dispatch(createOrder(order));
    }
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <ProductSection
          product={product}
          qty={qty}
          setQty={setQty}
        />
        <Card style={styles.card}>

          <Card.Content>
            <Title>Select Payment Method</Title>
            <Text>Amount : {product.price * qty}</Text>
            <View style={styles.paymentSection}>
              <Button
                mode={paymentMethod == 'Cash' ? 'contained' : 'outlined'}
                onPress={() => handlePaymentMethodChange('Cash')}
                style={styles.buttonPay}
              >
                Cash
              </Button>
              <Button
                // mode={paymentMethod === 'Online' ? 'contained' : 'outlined'}
                // onPress={() => handlePaymentMethodChange('Online')}
                onPress={() => Alert.alert('Online Payment Coming Soon...')}
                style={styles.buttonPay}

              >
                Online
              </Button>
            </View>
          </Card.Content>
        </Card>



        {userDetails && (
          <Card style={styles.card}>
            <Card.Title title="Shipping Address" />
            <Card.Content>
              <>
                <Text>
                  Address:
                </Text>
                {address.map((item: any, index: number) => (
                  <>
                    <View>
                      <Text>{item.name}</Text>
                      <Text>{item.mobile}</Text>

                    </View>
                    <View>
                      <Text>{item.locality}, {item.city}, {item.state}, {item.zip}</Text>
                    </View>
                  </>


                ))}


              </>

            </Card.Content>
          </Card>
        )}
        <Button mode='contained' style={styles.orderButton} onPress={handleOrder}>Order</Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  paymentSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
  },
  buttonPay: {
    flex: 1,

    marginHorizontal: 8,
  },
  orderButton: {
    backgroundColor: '#0013F7',
    color: '#fff',
  }
});

export default CheckoutPage;
