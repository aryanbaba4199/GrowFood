import React, {useEffect, useState, useContext, useRef} from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  StyleSheet,
  FlatList,
  Alert,
  Image,
} from 'react-native';
import {
  RouteProp,
  useRoute,
  useNavigation,
  NavigationProp,
  useScrollToTop,
} from '@react-navigation/native';
import {
  Card,
  Title,
  Paragraph,
  Button,
  DataTable,
  TextInput,
  Text,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {RootStackParamList} from '../menu/interface/rootStackParams';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GlobalContext} from '../../App';
import {createCartbyUser, getProductbySubCategory} from '../API';
import axios from 'axios';
import {globalStyles} from '../../globalStyles';
import ProductCard from '../Helpers/ProductCard';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {createCartApi, getBrandsProductApi, getCategoriesProductApi, getterFunction} from '../../appApi';
import Product from '../menu/product';

const ProductDetails = () => {
  const route = useRoute();
  let {product} = route.params;

  const navigation = useNavigation();

  const {userDetails} = useContext(GlobalContext);
  const [quantity, setQuantity] = useState(
    product.minimumOrderQt ? product.minimumOrderQt : 1,
  );
  const [productItem, setProductItem] = useState({...product});
  const [showMore, setShowMore] = useState(true);
  const [subProducts, setSubProducts] = useState([]);
  const scrollref = useRef(null);

  const description = productItem.description.split(' ');
  // const initDes = description.slice(0, 20).join(' ');

  useEffect(()=>{
    if(product){
      getSubProducts();
    }
  }, [Product])

  const getSubProducts = async()=>{
    try{
      const res = await getterFunction(`${getCategoriesProductApi}/${product.categories}`);
      setSubProducts(res);
    }catch(e){
      console.error(e);
    }
  }


  const handleIncrement = () => {
    setQuantity(prevQuantity => {
      const increaseBy = Number(product.incDecBy);
      if (prevQuantity + increaseBy > product.availableQty) {
        Alert.alert('Maximum quantity reached');
        return prevQuantity;
      }

      return prevQuantity + increaseBy;
    });
  };

  const handleDecrement = () => {
    setQuantity(prevQuantity => {
      const decreaseBy = Number(product.incDecBy);
      if (prevQuantity - decreaseBy < product.minimumOrderQty) {
        Alert.alert(`Quantity cannot be less than ${product.minimumOrderQty}`);
        return prevQuantity;
      }

      return prevQuantity - decreaseBy;
    });
  };

  const handleBuy = async () => {
    try {
      const user = await AsyncStorage.getItem('userToken');
      let products = [{productItem, quantity}];
      if (user) {
        navigation.navigate('Checkout', {products});
      } else {
        Alert.alert('You must be logged in');
        navigation.navigate('SignIn');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddToCart = async id => {
    const token = await AsyncStorage.getItem('userToken');
    const formData = {
      userId: userDetails.id,
      productId: id,
      qty: quantity,
    };
    if (token) {
      try {
        const res = await axios.post(createCartApi, formData);
        if (res.status === 200) {
          Alert.alert('Added to Cart');
        } else {
          Alert.alert('Failed');
        }
      } catch (err) {
        Alert.alert('Failure');
        console.error(err);
      }
    } else Alert.alert('You must be logged in to save the product in cart');
  };

  const [index, setIndex] = useState(0); // State to keep track of the current image index

  const handleScroll = event => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const imageWidth = Dimensions.get('window').width;
    const newIndex = Math.floor(contentOffsetX / imageWidth);
    if (newIndex < 0) {
      setIndex(0);
    } else if (newIndex >= productItem.image.length) {
      setIndex(productItem.image.length - 1);
    } else {
      setIndex(newIndex);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} ref={scrollref}>
        <View style={styles.imageListContainer} id="topId"></View>

        <Card style={styles.card}>
          <ScrollView
            horizontal
            pagingEnabled
            onScroll={handleScroll} // Track the scroll event
            showsHorizontalScrollIndicator={false}
            style={styles.cardImageWrapper}>
            {productItem.image.map((image, idx) => (
              <View key={idx} style={styles.imageWrapper}>
                <Image source={{uri: image}} style={styles.cardImage} />
              </View>
            ))}
          </ScrollView>
          <Card.Content>
            <View style={styles.quantityContainer}>
              <Icon
                name="minus-circle"
                style={styles.quantityButton}
                onPress={handleDecrement}
              />
              <TextInput
                style={styles.quantityInput}
                value={quantity?.toString()}
                onChangeText={text => setQuantity(parseInt(text))}
                keyboardType="numeric"
              />
              <Icon
                name="plus-circle"
                style={styles.quantityButton}
                onPress={handleIncrement}
              />
            </View>
            <Title style={styles.title}>{productItem.name}</Title>

            <View style={styles.rateContainer}>
              <View style={styles.rateContainer}>
                <Icon name="rupee" size={17} style={styles.priceSymbol} />
                <Paragraph style={styles.strikethroughPrice}>
                  {productItem.price || 1000}
                </Paragraph>
              </View>
              <Paragraph style={{...globalStyles.text}}>
                {productItem.discount ?? 5}% Off
              </Paragraph>

              <View
                style={{
                  ...globalStyles.bgcolor,
                  ...styles.rateContainer,
                  paddingHorizontal: 10,
                  borderRadius: 5,
                }}>
                <Icon
                  name="rupee"
                  style={{...globalStyles.bgcolor, marginTop: 1}}
                  size={21}
                />
                <Title style={{...globalStyles.bgcolor, marginLeft: 6}}>
                  {productItem.sellingPrice.toFixed(0)}
                </Title>
              </View>
            </View>

            <View style={styles.detailsContainer}>
              <DataTable.Row>
                <DataTable.Cell textStyle={{color: 'black', fontSize: 16}}>
                  Total Payable
                </DataTable.Cell>
                <DataTable.Cell textStyle={{color: 'black', fontSize: 16}}>
                  <View
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <Icon name="rupee" style={{marginRight: 6}} size={16} />

                    <Text>
                      {parseInt(productItem.sellingPrice * quantity)}/-
                    </Text>
                  </View>
                </DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell textStyle={{color: 'black', fontSize: 16}}>
                  Quantity
                </DataTable.Cell>
                <DataTable.Cell textStyle={{color: 'black', fontSize: 16}}>
                  {productItem.productQty}
                </DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell textStyle={{color: 'black', fontSize: 16}}>
                  Brand
                </DataTable.Cell>
                <DataTable.Cell textStyle={{color: 'black', fontSize: 16}}>
                  {productItem.brand}
                </DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell textStyle={{color: 'black', fontSize: 16}}>
                  Category
                </DataTable.Cell>
                <DataTable.Cell textStyle={{color: 'black', fontSize: 16}}>
                  {productItem.categories}
                </DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell textStyle={{color: 'black', fontSize: 16}}>
                  Sub Category
                </DataTable.Cell>
                <DataTable.Cell textStyle={{color: 'black', fontSize: 16}}>
                  {productItem.subCategory}
                </DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell textStyle={{color: 'black', fontSize: 16}}>
                  Packet of
                </DataTable.Cell>
                <DataTable.Cell
                  textStyle={{
                    color: 'black',
                    fontSize: 16,
                  }}>{`${product.productQty} ${product.unit ?? ''}`}</DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell textStyle={{color: 'black', fontSize: 16}}>
                  Minimum Order
                </DataTable.Cell>
                <DataTable.Cell textStyle={{color: 'black', fontSize: 16}}>
                  {productItem.minimumOrderQty}
                </DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell textStyle={{color: 'black', fontSize: 16}}>
                  Food Type
                </DataTable.Cell>
                <DataTable.Cell textStyle={{color: 'black', fontSize: 16}}>
                  {productItem.foodPrefence}
                </DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell textStyle={{color: 'black', fontSize: 16}}>
                  Life
                </DataTable.Cell>
                <DataTable.Cell textStyle={{color: 'black', fontSize: 16}}>
                  {productItem.life}
                </DataTable.Cell>
              </DataTable.Row>
              <DataTable.Row>
                <DataTable.Cell textStyle={{color: 'black', fontSize: 16}}>
                  {productItem.description}
                </DataTable.Cell>
              </DataTable.Row>
            </View>
            <Paragraph
              onPress={() => setShowMore(!showMore)}
              style={styles.description}>
              {productItem.description}
            </Paragraph>
          </Card.Content>
        </Card>
        <View style={styles.productList}>
          <Text style={styles.subTitle}>You may also like</Text>
          {subProducts.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setProductItem(item);

                if (scrollref.current) {
                  scrollref.current.scrollTo({y: 0, animated: true});
                }
              }}>
              <ProductCard item={item} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          style={styles.addToCartButton}
          onPress={() => handleAddToCart(productItem._id)}>
          Add to Cart
        </Button>
        <Button
          mode="contained"
          style={{...globalStyles.bgcolor, ...styles.buyNowButton}}
          onPress={handleBuy}>
          Buy Now
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  productList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  imageListContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  imageList: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageCard: {
    marginHorizontal: 10,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 4,
  },
  image: {
    width: Dimensions.get('window').width - 40,
    height: Dimensions.get('window').height - 500,
    resizeMode: 'contain',
    marginTop: 10,
  },
  card: {
    margin: 20,
    borderRadius: 10,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
    color: '#555',
    marginBottom: 20,
  },
  rateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  discountChip: {
    backgroundColor: 'darkgreen',
    color: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceSymbol: {
    color: 'grey',
  },
  strikethroughPrice: {
    fontSize: 15,
    color: 'grey',
    marginLeft: 2,
    textDecorationLine: 'line-through',
  },

  detailsContainer: {
    marginTop: 20,
  },

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',

    borderTopWidth: 1,
    borderColor: '#ddd',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  addToCartButton: {
    backgroundColor: '#FF9100',
    elevation: 2,
    width: '50%',
    borderRadius: 0,
  },
  subTitle : {
    fontWeight : 700,
    fontSize : 24,
    marginVertical : 10
  },

  buyNowButton: {
    elevation: 2,
    width: '50%',
    fontSize: 18,
    borderRadius: 0,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 22,
    justifyContent: 'center',
    paddingVertical: 10,
  },
  quantityButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 37,
    color: 'black',
  },
  quantityInput: {
    width: 100,
    marginHorizontal: 10,
    marginRight: 20,
    borderRadius: 10,
    height: 40,
    textAlign: 'center',
    fontSize: 22,
  },
  cardImageWrapper: {
    height: 250,
    width: Dimensions.get('screen').width - 20,
  },
  imageWrapper: {
    width: Dimensions.get('window').width - 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImage: {
    height: 250,
    width: 250,
    alignSelf: 'center',
    resizeMode: 'cover',
    objectFit: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
});

export default ProductDetails;
