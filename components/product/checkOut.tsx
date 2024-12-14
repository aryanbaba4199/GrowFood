import React, { useState, useContext, useEffect } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import LoaderComponent from '../../context/LoaderComponent';
import { Button, Card, DataTable, Text, Title } from 'react-native-paper';
import CreateAddress from '../user/CreateAddress';
import ProductSection from "./checkout/productDisplay"
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../menu/interface/rootStackParams';
import { GlobalContext } from '../../App';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';

import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { globalStyles } from '../../globalStyles';
import { useDispatch } from 'react-redux';
import { setGlobalVar } from '../../redux/Reducers/globalVariableReducers';
import { createOrderAPI } from '../../appApi';


const CheckoutPage = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'Checkout'>>();
  const { products, quantity } = route.params;
  // const [qty, setQty] = useState(quantity);
  const { userDetails, address } = useContext(GlobalContext);
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  // const [paymentId, setPaymentId] = useState('');
  const [addressId, setAddressId] = useState(0);
  const [loader, setLoader] = useState(false);
  const [subTotal, setSubTotal] = useState(0);
  const [addressMode, setAddressMode] = useState(false);

  const dispatch : any = useDispatch();
  const navigation: any = useNavigation();


  const handlePaymentMethodChange = (method: any) => {
    setPaymentMethod(method);


  };


const handleOrder = async () => {
  if (address.length === 0) {
    Alert.alert('Please Add an address first');
  } else if (addressId === 0) {
    Alert.alert('Select an address');
  } else {
    try {
      setLoader(true);

      const orders = products.map((item: any) => {
        return {
          productId: item.productItem._id,
          userId: userDetails.id,
          quantity: item.quantity,
          paymentId: "na", 
          paymentMode: paymentMethod, 
          orderAmount: item.productItem.sellingPrice * item.quantity,
          addressId: addressId, 
        };
      });
      const res = await axios.post(createOrderAPI, { formData : orders });

      if (res.status === 200) {
        Alert.alert('Order Created Successfully');
        navigation.goBack(); 
      } else {
        Alert.alert('Order Creation Failed');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Order Creation Failed');
    } finally {
      setLoader(false);
    }
  }
};








  return (
    <>
      {loader ? <LoaderComponent /> : <>

        {addressMode ? <CreateAddress setCreateAddressMode={setAddressMode} /> :
          <>
            <ScrollView>
              <View style={styles.container}>
                <Card>
                  <DataTable.Row>
                    <DataTable.Cell>Product</DataTable.Cell>
                    <DataTable.Cell>Quantity</DataTable.Cell>
                    <DataTable.Cell>Rate</DataTable.Cell>
                    <DataTable.Cell>Total</DataTable.Cell>
                  </DataTable.Row>
                  {products && products.map((product: any, index: any) => (

                    <ProductSection
                      subTotal={subTotal}
                      setSubTotal={setSubTotal}
                      product={product.productItem}
                      qty={product.quantity}

                    />


                  ))}
                  <DataTable.Row>
                    <DataTable.Cell>Total Payable</DataTable.Cell>
                    <DataTable.Cell>{subTotal}</DataTable.Cell>
                  </DataTable.Row>
                </Card>

                <Card style={styles.card}>

                  <Card.Content >

                    {/* <Text>Amount : {product.price * qty}</Text> */}
                    <View style={styles.paymentSection}>

                      <Button
                        mode={paymentMethod == 'Cash' ? 'contained' : 'outlined'}
                        onPress={() => handlePaymentMethodChange('Cash')}
                        style={{
                          backgroundColor : '#15892e', 
                          width : 200,
                        }}
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

                    <View style={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '100%',
                      justifyContent: 'space-between',
                      padding: 10,
                    }}>
                      <Title style={{
                        ...globalStyles.text
                      }}>Shipping Address</Title>
                      <Icon name='plus-square-o' size={24} style={{ marginRight: 10 }} color='#a854ab' onPress={() => setAddressMode(true)} />
                    </View>
                    <Card.Content>
                      <>


                        {address.map((item: any, index: number) => (
                          <>
                            <View style={{ justifyContent: 'space-between', display: 'flex', backgroundColor: `${item._id === addressId ? '#ecebdd' : ''}`, padding: 8 }}>
                              <TouchableOpacity onPress={() => setAddressId(item._id)} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View>
                                  <Text> Name : {item.name}</Text>
                                  <Text>Mobile : {item.mobile}</Text>
                                  <Text>Address : {item.locality}, {item.city}, {item.state}, {item.zip}</Text>
                                </View>
                                <View>
                                  {addressId === item._id &&
                                    <View style={{ marginTop: 12 }}>
                                      <Icon name='check-square-o' size={24} color='green' />
                                    </View>
                                  }

                                </View>


                              </TouchableOpacity>

                            </View>

                          </>

                        ))}

                      </>

                    </Card.Content>
                  </Card>
                )}

              </View>
            </ScrollView>
            <View style={{ bottom: 0 }}>
              {subTotal !== 0 && subTotal >= 2000 ?
                <Button
                  disabled={subTotal<2000}
                  mode='contained' style={{ ...globalStyles.bgcolor, borderRadius : 0 }} onPress={handleOrder}>
                  Buy Now
                </Button>
                :
                <Button 
                mode='contained' style={{ ...globalStyles.bgcolor, borderRadius : 0 }} onPress={() => {
                  Alert.alert("Checkout Button Locked, Unlock on order amount atleast 2000/-");
                }}>Minimum Order is 2000/-</Button>
              }

            </View>
          </>
        }

      </>
      }
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginVertical: 10,
  },
  paymentSection: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',

  },
  buttonPay: {
    flex: 1,

    marginHorizontal: 8,
  },
  orderButton: {
    backgroundColor: '#15892e',
    color: '#fff',
    borderRadius: 0,
  }
});

export default CheckoutPage;
