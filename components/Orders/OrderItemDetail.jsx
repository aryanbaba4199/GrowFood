import React, {useEffect, useState} from 'react';
import {Alert, ScrollView, StyleSheet, View} from 'react-native';
import {GestureHandlerRootView, FlatList} from 'react-native-gesture-handler';
import {
  Card,
  Title,
  Paragraph,
  Text,
  Button,
  TextInput,
} from 'react-native-paper';
import LoaderComponent from '../../context/LoaderComponent';
import {getDeliveryAddress, updateOrderbyId, deleteOrderbyId, getOrdersByUser} from '../API';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';


const OrderItemDetail = ({route, getOrders, loader, setLoader, userDetails}) => {
  const {productDetails, orderDetails} = route.params;
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [formData, setFormData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [qtyValid, setQtyValid] = useState();

  const navigation = useNavigation();

  const renderImage = ({item}) => (
    <Card style={styles.imageCard}>
      <Card.Cover style={styles.image} source={{uri: item}} />
    </Card>
  );

  useEffect(() => {
    checkValidation();

  }, [formData]);

  useEffect(() => {
    if (orderDetails) {
      getdeliveryAddress(orderDetails.addressId);
      setFormData(orderDetails);
    }
  }, [orderDetails]);

  const getdeliveryAddress = async id => {
    setLoader(true);
    try {
      const res = await axios.get(`${getDeliveryAddress}/${id}`);
      if (res.status === 200) {
        setDeliveryAddress(res.data);
        setLoader(false);
      }
    } catch (err) {
      console.error(err);
      setLoader(false);
    }
  };

  

  const checkValidation = () => {
    if (formData?.quantity >= productDetails?.minimumOrderQty) {

      setQtyValid(true);
    } else {

      setQtyValid(false);
    }
  };

  const handleEditOrder = async (id) => {
    setLoader(true);
    if (!qtyValid) {
      Alert.alert(
        `quantity can not be less than ${productDetails.minimumOrderQty}`,
      );
      setLoader(false);
      return;
    } else {
      try {
        const res = await axios.put(`${updateOrderbyId}/${id}`, {
          data: formData,
        });
        if (res.status === 200) {
          getOrders(userDetails.id)
          setLoader(false);
          navigation.goBack();
          
          Alert.alert('Updated Successfully');
        }
      } catch (e) {
        console.error(e);
        setLoader(false);
        Alert.alert('Error in updating order');
      }
    }
  };
  
  const handleDeleteOrder = async(id)=>{
    setLoader(true);
    try{
      const res = await axios.delete(`${deleteOrderbyId}/${id}`);
      if(res.status===200){
        getOrders(userDetails.id)
        navigation.goBack();
        Alert.alert('Order deleted successfully')
        setLoader(false);
      }
    }catch (e) {
      setLoader(false);
      Alert.alert('Error in deleting order');
      console.error(e);
    }
  }

  return (
    <>
    {loader ? <LoaderComponent/> : 
      <ScrollView style = {{marginBottom : 30}}>
        <GestureHandlerRootView style={{flex: 1}}>
          <Card style={styles.card} >
            <Card.Content style = {{
              display : 'flex',
              justifyContent : 'start',
              alignItems : 'start',
            }}>
              <FlatList
                data={productDetails.image}
                renderItem={renderImage}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.imagelist}
                style={styles.flatList}
              />
              <Title style={styles.title}>{productDetails.name}</Title>
              <Paragraph style={styles.paragraph}>
                Quantity: {orderDetails.quantity}
              </Paragraph>
              <Paragraph style={styles.paragraph}>
                Total Amount: {parseInt(orderDetails.orderAmount?.toFixed(2))}/-
              </Paragraph>
              <Paragraph style={styles.paragraph}>
                Description: {productDetails.description}
              </Paragraph>
              <Paragraph style={styles.paragraph}>
                Expected Delivery Date : null
              </Paragraph>
            </Card.Content>
            <Card.Content>
              <Title style={{marginTop: 20, color: 'black'}}>
                Delivery Address
              </Title>
              <Card.Content style={{paddingBottom : 20}}>
                {deliveryAddress &&
                  deliveryAddress.map((item, index) => (
                    <Card.Content >
                      <Text style={{color: 'black'}}>Name : {item.name}</Text>
                      <Text style={{color: 'black'}}>
                        Mobile : {item.mobile}
                      </Text>
                      <Text>
                        Address :{' '}
                        {`${item.locality} ${item.city} ${item.state} - ${item.zip}`}
                      </Text>
                    </Card.Content>
                  ))}
              </Card.Content>
            </Card.Content>
            {editMode && (
              <Card.Content style={{marginTop: 32}}>
                <TextInput
                  label="Quantity"
                  keyboardType="numeric"
                  inputMode="numeric"
                  textContentType=""
                  textColor={qtyValid ? `#399918` : '#F5004F'}
                  value={formData.quantity.toString()}
                  onChangeText={text => {
                    const parsedValue = parseInt(text);
                    // if(parseInt(formData.quantity)>=productDetails.minimumOrderQty){
                    //   setQtyValid(true);
                    // }else{
                    //   setQtyValid(false);
                    // }
                    setFormData(prev => ({
                      ...prev,
                      quantity: isNaN(parsedValue) ? '' : parsedValue,
                    }));
                  }}
                />

                
              </Card.Content>
            )}
          </Card>
        </GestureHandlerRootView>
      </ScrollView>
}

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          position: 'absolute',
          bottom: 1,
          paddingHorizontal : 2,
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Button mode="contained" style={{width: '49%', borderRadius : 5}} buttonColor="#d9534f"
        onPress={()=>{
          if(editMode){
            setEditMode(false);
          }else{
            handleDeleteOrder(orderDetails._id);
          }
        }}
        >
          {editMode ? 'Close' : 'Delete'}
        </Button>
        <Button
          mode="contained"
          
          style={{width: '49%', borderRadius : 5}}
          
          onPress={() => {
            if(editMode){
              handleEditOrder(orderDetails._id);
            }else{
              setEditMode(true);
            }
          }}>
          {editMode ? 'Update' : 'Edit Order'}
        </Button>
      </View>
    </>
  );
};

export default OrderItemDetail;

const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  imageCard: {
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  imagelist: {
    justifyContent: 'center', // Center the images horizontally
    paddingVertical: 10,
  },
  flatList: {
    alignSelf: 'center', // Center the FlatList within the parent view
  },
  image: {
    width: 150,
    height: 150,
  },
  title: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center', // Center the title
  },
  paragraph: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'left', // Center the paragraphs
  },
});
