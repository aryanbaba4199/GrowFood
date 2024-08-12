import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../menu/interface/rootStackParams';
import { Card, Title, Paragraph } from 'react-native-paper';

type Props = {
  products: any[];
};

const NewProductSlider: React.FC<Props> = ({ products }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleProductPress = (item: any) => {
    navigation.navigate('ProductDetails', { product: item });
    
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>New Products</Text>
      <View style={styles.productList}>
        {products.map((item, index) => (
          <TouchableOpacity
            key={index.toString()}
            style={styles.productItem}
            onPress={() => handleProductPress(item)}
          >
            <Card style={styles.card}>
              <Card.Cover source={{ uri: item.image[0] }} style={styles.cardImage} />
              <Card.Content>
                <Title style={styles.cardTitle}>{item.name}</Title>
                <Paragraph style={styles.cardPrice}>Price: {item.price || 1000}/-</Paragraph>
              </Card.Content>
            </Card>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: '700',
    color: 'black',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
    marginBottom: 5,
    fontFamily: 'sans-serif',
    alignSelf: 'flex-start',
  },
  productList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  productItem: {
    width: '48%', // Adjust as per your design needs
    marginBottom: 10,
  },
  card: {
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 4,
  },
  cardImage: {
    height: 150,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'darkblue',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  cardPrice: {
    fontSize: 14,
    color: 'darkgreen',
    fontWeight: '600',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
});

export default NewProductSlider;
