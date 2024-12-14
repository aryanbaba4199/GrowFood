import React, { useState, useEffect, useContext } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Text,
  Alert,
  RefreshControl,
} from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import axios from 'axios';
import { GlobalContext } from '../../App';
import { getCartbyUser, getProductbyId, deleteCartItem } from '../API';
import { useNavigation } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LoaderComponent from '../../context/LoaderComponent';
import { globalStyles } from '../../globalStyles';
import { cartApi } from '../../appApi';

const CartHome = () => {
  const { userDetails } = useContext(GlobalContext);
  const [cart, setCart] = useState([]);
  const [productsData, setproductsData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [group, setGroup] = useState([]);

  const screenWidth = Dimensions.get('window').width;
  const navigation = useNavigation();



  const handleCheckoutAll = () => {
    // Create a new array combining each product with its corresponding quantity
    const checkoutItems = productsData.map((product, index) => {
      return {
        productItem: product,  // The product object itself
        quantity: cart[index]?.qty || 1,  // Corresponding quantity from cart or default to 1
      };
    });
  

  
  
    
    navigation.navigate('Checkout', { products: checkoutItems, quantity: checkoutItems.length });
  };
  
  

  const groupCartItems = (items) => {
    const groupedItems = {};

    items.forEach((item) => {
      if (groupedItems[item.productId]) {
        groupedItems[item.productId].qty += item.qty;
      } else {
        groupedItems[item.productId] = { ...item };
      }
    });

    return Object.values(groupedItems);
  };

  const getCartData = async () => {;
    try {
      const res = await axios.get(`${cartApi}/${userDetails.id}`);
      if (res.status===200){

        setGroup(res.data);
        const groupedItems = groupCartItems(res.data);
        const productIds = groupedItems.map((item) => item.productId);
        await fetchproductsData(productIds);
        setCart(groupedItems);
      }
    } catch (e) {
      console.error(e);
    }
  };


  const fetchproductsData = async (productIds) => {
    setLoader(true);
    try {
      const productsDataData = await Promise.all(
        productIds.map(async (id) => {
          const res = await axios.get(`${getProductbyId}/${id}`);
          return res.data;
        })
      );
      setproductsData(productsDataData);
      setLoader(false);
    } catch (e) {
      
      setLoader(false);
    }
  };

  const handleCartItemClick = (item) => {
    navigation.navigate('cartDetails', { product: item });
  };

  

  const handleDeleteCartItem = async (itemId) => {
    setLoader(true);
    let count = group.map(item=>item.productId===itemId).filter(item=>item===true).length;

    try {
      const productIds = group
        .filter((item) => item.productId === itemId)
        .map((item) => item._id);
      for (const item of productIds) {
        try {
          await axios.delete(`${deleteCartItem}/${item}`);
          count--;
       
        } catch (e) {
          console.error(e);
        }

        if (count === 0) {
          Alert.alert('Cart deleted successfully');
          getCartData();
          setLoader(false);
        }
      }
    } catch (err) {
      console.error(err);
      setLoader(false);
      Alert.alert('Failed to delete');
    }
  };

  useEffect(() => {
    getCartData();
  }, []);

  const renderProductItem = ({ item }) => {
  
    const product = productsData.find((product) => product._id === item.productId);
    const itemWidth = screenWidth / 2 - 16;

    if (!product) return null;

    return (
      <TouchableOpacity
        style={{ width: itemWidth, padding: 8 }}
        onPress={() => handleCartItemClick(product)}>
        <Card style={styles.card}>
          <Card.Cover
            source={{ uri: product.image[0] ?? "https://www.nbu.ac.in/img/dept/anthropology/slider/slider3.jpg"}}
            style={styles.cardImage  }
          />
          <Card.Content>
            <Title style={styles.cardTitle}>{product.name}</Title>
            <View style={styles.cardDetails}>
              <Paragraph style={styles.cardPrice}>
                Price: {product.sellingPrice ?? 1000}/- (Quantity: {item.qty})
              </Paragraph>
              <Icon
                name="delete"
                size={24}
                color="#f50a1d"
                onPress={() => handleDeleteCartItem(item.productId)}
              />
            </View>
          </Card.Content>
        </Card>
        
      </TouchableOpacity>
    );
  };

  return (
    <>
      {loader ? (
        <LoaderComponent />
      ) : (
        <>
          {userDetails.id ? (
            <GestureHandlerRootView style={{ flex: 1 }}>
              <FlatList
                data={cart}
                renderItem={renderProductItem}
                keyExtractor={(item) => item.productId.toString()}
                numColumns={2}
                contentContainerStyle={styles.flatListContent}
                columnWrapperStyle={styles.row}
                refreshControl={
                  <RefreshControl refreshing={refresh} onRefresh={getCartData} />
                }
                ListEmptyComponent={
                  <Text style={styles.noproductsDataText}>
                    No productsData in cart
                  </Text>
                }
              />
            </GestureHandlerRootView>
          ) : (
            <View style={styles.loginPrompt}>
              <Text style={styles.loginPromptText}>
                Please Log in to see your cart details
              </Text>
              <Button
                mode="contained"
                style={styles.loginButton}
                onPress={() => navigation.navigate('SignIn')}>
                Log In
              </Button>
            </View>
          )}
        </>
      )}
      <View style={{
          width : Dimensions.get('screen').width,
         
          position : 'absolute',
          bottom : 0,
        }}>
          <Button
          style={{
            padding : 0,
            margin : 0,
            borderRadius : 0,
            ...globalStyles.bgcolor,
            elevation : 5,
          }}
          onPress={()=>handleCheckoutAll()}
          mode='contained'
          >Checkout All</Button>
        </View>
    </>
  );
};

export default CartHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  flatListContent: {
    padding: 8,
  },
  card: {
    margin: 8,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
    width: '100%',
    elevation: 4,
  },
  cardImage: {
    height: 150,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'darkblue',
  },
  cardPrice: {
    fontSize: 14,
    color: 'darkgreen',
    fontWeight: '600',
  },
  noproductsDataText: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
    color: 'gray',
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  loginPrompt: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  loginPromptText: {
    alignSelf: 'center',
    fontSize: 20,
    color: '#000000',
  },
  loginButton: {
    width: 200,
    alignSelf: 'center',
    marginTop: 20,
  },
});
