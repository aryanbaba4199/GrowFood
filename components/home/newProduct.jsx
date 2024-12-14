import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions, Image } from 'react-native';
import { Card, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

const NewProductSlider = ({ products }) => {
  const width = Dimensions.get('window').width;
  const navigation = useNavigation();
  const handleProductPress = (item) => {
    navigation.navigate('homeProductDetails', { product: item });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>New Products</Text>
      <View style={styles.productList}>
        {products.map((item, index) => (
          <TouchableOpacity
            key={index.toString()}
            style={styles.productItem}
            onPress={() => handleProductPress(item)}
          >
            {/* Image Card */}
            <View style={styles.imageCard}>
              <Image
                style={styles.image}
                source={{ uri: item.image[0]??'https://www.thegrowfood.com/_next/image?url=%2Ffavicon.ico&w=64&q=75' }}
              />
              {/* Discount Percentage */}
              <View style={styles.discountContainer}>
                <Text style={styles.discountText}>↓ {parseInt(item.discount)}%</Text>
              </View>
            </View>

            {/* Product Information */}
            <Text style={styles.productName}>{item.name.slice(0, 20)}...</Text>

            <View style={styles.priceContainer}>
              <View style={styles.priceRow}>
              <Text style={styles.originalPrice}>₹{item.price}</Text>
                <Text style={styles.currentPrice}>₹{item.sellingPrice}</Text>
                
              </View>
              <Text style={styles.deliveryText}>Free delivery</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  productList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  productItem: {
    width: '48%',
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  imageCard: {
    elevation : 0,
    overflow: 'hidden',
    position: 'relative',
    height: 150,
    backgroundColor : 'white',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  discountContainer: {
    position: 'absolute',
    top: 5,
    left: 5,
    backgroundColor: '#d4f7dc',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 5,
  },
  discountText: {
    color: '#15892e',
    fontSize: 12,
    fontWeight: 'bold',
  },
  productName: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
    marginVertical: 5,
    marginHorizontal: 5,
  },
  priceContainer: {
    marginHorizontal: 5,
    marginBottom: 5,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent : 'space-evenly'
  },
  currentPrice: {
    color: '#333',
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 5,
  },
  originalPrice: {
    color: '#888',
    fontSize: 12,
    textDecorationLine: 'line-through',
  },
  deliveryText: {
    color: '#15892e',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 3,
  },
});

export default NewProductSlider;
