import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  Image,
  Text,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { getProductsApi } from '../../appApi';

const Product = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false);

  useEffect(() => {
    loadProducts(); // Initial load
  }, []);

  const loadProducts = async () => {
    if (loading || allLoaded) return; // Prevent duplicate loading
    setLoading(true);
    try {
      const res = await axios.get(`${getProductsApi}/${page}`);
      if (res.status === 200) {
        const newProducts = res.data.data;
        if (newProducts.length === 0) {
          setAllLoaded(true); // No more products to load
        } else {
          setProducts((prev) => [...prev, ...newProducts]);
          setPage((prevPage) => prevPage + 1); // Increment page for next fetch
        }
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = ({ nativeEvent }) => {
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 20) {
      loadProducts();
    }
  };

  const handleProductPress = (item) => {
    navigation.navigate('ProductDetails', { product: item });
  };

  return (
    <ScrollView
      onScroll={handleScroll}
      scrollEventThrottle={16}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <View style={styles.container}>
        <View style={styles.productList}>
          {products.map((item, index) => (
            <TouchableOpacity
              key={index.toString()}
              style={styles.productItem}
              onPress={() => handleProductPress(item)}
            >
              {/* Product Image */}
              <View style={styles.imageCard}>
                <Image
                  style={styles.image}
                  source={{
                    uri: item.image[0] ??
                      'https://www.thegrowfood.com/_next/image?url=%2Ffavicon.ico&w=64&q=75',
                  }}
                />
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

        {loading && (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#15892e" />
          </View>
        )}
        {allLoaded && (
          <View style={styles.endMessage}>
            <Text style={styles.endText}>No more products to load.</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    marginTop: 10,
    paddingHorizontal: 5,
  },
  productList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productItem: {
    width: '48%',
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  imageCard: {
    position: 'relative',
    height: 150,
    overflow: 'hidden',
    backgroundColor: '#fff',
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
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  currentPrice: {
    color: '#333',
    fontSize: 14,
    fontWeight: 'bold',
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
  loading: {
    marginTop: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  endMessage: {
    marginTop: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  endText: {
    color: '#15892e',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Product;
