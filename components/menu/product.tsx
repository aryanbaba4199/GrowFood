import React from 'react';
import { View, FlatList, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp, RouteProp } from '@react-navigation/native';
import { Card, Title, Paragraph, Button, Avatar } from 'react-native-paper';
import { RootStackParamList } from '../../Navigation/navigationRoute';

interface ProductItemProps {
  item: any;
  index: number;
}

type ProductsScreenRouteProp = RouteProp<RootStackParamList, 'Products'>;

interface ProductProps {
  route: ProductsScreenRouteProp;
}

const Product = ({ route }: ProductProps) => {
  const { products } = route.params;
  console.log("Product component products:", products);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const screenWidth = Dimensions.get('window').width;

  const renderProductItem = ({ item }: ProductItemProps) => {
    const itemWidth = screenWidth / 2 - 16;

    const handleProductPress = (item: any) => {
      navigation.navigate('ProductDetails', { product: item }); // Pass product data
    };

    return (
      <TouchableOpacity style={{ width: itemWidth, padding: 8 }} onPress={() => handleProductPress(item)}>
        <Card style={styles.card}>
          <Card.Cover source={{ uri: item.image[0] }} style={styles.cardImage} />
          <Card.Content>
            <Title style={styles.cardTitle}>{item.name}</Title>
            <Paragraph style={styles.cardPrice}>Price: {item.price || 1000}/-</Paragraph>
          </Card.Content>
          {/* <Card.Actions>
            <Button onPress={() => handleProductPress(item)}>Details</Button>
          </Card.Actions> */}
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id} 
        numColumns={2}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

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
});

export default Product;
