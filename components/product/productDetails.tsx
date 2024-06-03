import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  StyleSheet,
  FlatList,
} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Card, Title, Paragraph, Button, Chip } from 'react-native-paper';
import { RootStackParamList } from '../../Navigation/navigationRoute';
import Icon from 'react-native-vector-icons/FontAwesome';

const ProductDetails = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'ProductDetails'>>();
  const { product } = route.params;

  const [rate, setRate] = useState(0);
  const [images, setImages] = useState<string[]>([]); // State to store product images

  useEffect(() => {
    const price = product.price || 1000;
    const discount = product.discount || 5;
    const rate = price - ((price * discount) / 100);
    setRate(rate); // Format rate with two decimal places
    setImages(product.image || []);
  }, [product]);

  const renderImage = ({ item }: { item: string }) => {
    return (
      <Card style={styles.imageCard}>
        <Card.Cover style={styles.image} source={{ uri: item }} />
      </Card>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.imageListContainer}>
          <FlatList
            data={images}
            renderItem={renderImage}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.imageList}
          />
        </View>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>{product.name}</Title>
            <Paragraph style={styles.description}>{product.description}</Paragraph>
            <View style={styles.rateContainer}>
              <Paragraph style={styles.discountChip}>{product.discount || 5}% Off</Paragraph>
              <View style={styles.priceContainer}>
                <Icon name='rupee' size={17} style={styles.priceSymbol} />
                <Paragraph style={styles.price}>{product.price || 1000}</Paragraph>
              </View>
              <View style={styles.rateContainer}>
                <Icon name='rupee' style={styles.rateSymbol} size={23} />
                <Title style={styles.rate}>{rate}</Title>
              </View>
            </View>
            <View style={styles.detailsContainer}>
              <Paragraph style={styles.detailItem}>Quantity: {product.productQty}</Paragraph>
              <Paragraph style={styles.detailItem}>Brand: {product.brand}</Paragraph>
              <Paragraph style={styles.detailItem}>Category: {product.categories}</Paragraph>
              <Paragraph style={styles.detailItem}>Food Preference: {product.foodPrefence}</Paragraph>
              <Paragraph style={styles.detailItem}>Life: {product.life}</Paragraph>
              <Paragraph style={styles.detailItem}>Minimum Order: {product.minimumOrderQty}</Paragraph>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button mode="contained" style={styles.addToCartButton}>Add to Cart</Button>
        <Button mode="contained" style={styles.buyNowButton}>Buy Now</Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  scrollContent: {
    paddingBottom: 100, // Ensure there's enough space at the bottom for the fixed buttons
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
    height: 300,
    resizeMode: 'cover',
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
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
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
    paddingHorizontal : 10,
    paddingVertical : 5,
    borderRadius : 10,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceSymbol: {
    color: 'grey',
  },
  price: {
    fontSize: 15,
    color: 'grey',
    marginLeft: 2,
  },
  rateSymbol: {
    color: 'darkblue',
  },
  rate: {
    color: 'darkblue',
    fontSize: 22,
    fontWeight: '700',
  },
  detailsContainer: {
    marginTop: 20,
  },
  detailItem: {
    fontSize: 16,
    color: 'navy',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#ddd',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  addToCartButton: {
    backgroundColor: 'blue',
    padding: 10,
    width: '40%',
    borderRadius: 5,
  },
  buyNowButton: {
    backgroundColor: 'green',
    padding: 10,
    width: '40%',
    fontSize: 18,
    borderRadius: 5,
  },
});

export default ProductDetails;
