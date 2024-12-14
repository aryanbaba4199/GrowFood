import React from 'react';
import { View, FlatList, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, NavigationProp, RouteProp } from '@react-navigation/native';
import { Card, Title, Paragraph, Button, Avatar } from 'react-native-paper';
import { RootStackParamList } from '../menu/interface/rootStackParams';
import { ScrollView } from 'react-native-gesture-handler';

interface ProductItemProps {
  item: any;
  index: number;
}

type ProductsScreenRouteProp = RouteProp<RootStackParamList, 'FilterView'>;

interface ProductProps {
  route: ProductsScreenRouteProp;
}

const FilterProduct = ({ route }: ProductProps) => {
  const { filterProducts } = route.params;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const screenWidth = Dimensions.get('window').width;

  const renderProductItem = ({ item }: ProductItemProps) => {
    const itemWidth = screenWidth / 2 - 16;

    const handleProductPress = (item: any) => {
      navigation.navigate('homeProductDetails', { product: item });
      
    };
  

    return (
      <TouchableOpacity style={{ width: itemWidth, padding: 8 }} onPress={() => handleProductPress(item)}>
        <Card style={styles.card}>
          <Card.Cover source={{ uri: item.image[0] }} style={styles.cardImage} />
          <Card.Content>
            <Title style={styles.cardTitle}>{item.name}</Title>
            <Paragraph style={styles.cardPrice}>Price: {item.price || 1000}/-</Paragraph>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <FlatList
        data={filterProducts}
        renderItem={renderProductItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
    </ScrollView>
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
    // Use the same styles from product.tsx for cardTitle
    fontSize: 16,
    fontWeight: 'bold',
    color: 'darkblue',
  },
  cardPrice: {
    // Use the same styles from product.tsx for cardPrice
    fontSize: 14,
    color: 'darkgreen',
    fontWeight: '600',
  },
});

export default FilterProduct;
