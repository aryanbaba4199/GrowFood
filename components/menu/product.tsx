import React from 'react';
import { View, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { RootStackParamList } from './interface/rootStackParams';

interface ProductProps {
  route: {
    params: {
      products: any[];
    };
  };
}

const Product: React.FC<ProductProps> = ({ route }) => {
  const { products } = route.params;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const screenWidth = Dimensions.get('window').width;

  const handleProductPress = (item: any) => {
    navigation.navigate('ProductDetails', { product: item });
  };

  const renderProductItem = ({ item }: { item: any }) => {
    const itemWidth = screenWidth / 2 - 20; // Adjusted for padding and margins

    return (
      <TouchableOpacity
        style={[styles.productItem, { width: itemWidth }]}
        onPress={() => handleProductPress(item)}
      >
        <Card style={styles.card}>
          <Card.Cover source={{ uri: item.image[0] }} style={styles.cardImage} />
          <Card.Content>
            <Title numberOfLines={2} style={styles.cardTitle}>
              {item.name}
            </Title>
            <Paragraph style={styles.cardPrice}>Price: {item.price || 1000}/-</Paragraph>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.productList}>
        {products.map((item, index) => (
          <View key={index.toString()}>{renderProductItem({ item })}</View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  productList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  productItem: {
    marginBottom: 15,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    elevation: 4,
    overflow: 'hidden',
  },
  card: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  cardImage: {
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
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

export default Product;
