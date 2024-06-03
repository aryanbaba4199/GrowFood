import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '../../redux/actions/productActions'; // Assuming this fetches categories with image links

type Category = {
  name: string;
  
};

const Categories: React.FC = () => {
  const dispatch: any = useDispatch();
  const categories = useSelector<any, Category[]>((state) => state.products.categories);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const renderCategoryItem = ({ item }: { item: Category }) => (
    <View style={styles.categoryItem}>
      <Image source={{ uri: "https://img.freepik.com/premium-vector/abstract-bird-logo-design_99536-200.jpg?w=740" }} style={styles.categoryImage} />
      <Text style={styles.categoryName}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {categories.length > 0 && ( // Check if categories exist
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.name}
          numColumns={3} 
          contentContainerStyle={styles.categoryContainer}
        />
      )}
      {categories.length === 0 && ( // Show a loading message or placeholder if categories are empty
        <Text style={styles.loadingText}>Loading categories...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
    paddingHorizontal: 10,
  },
  categoryContainer: {
    
    justifyContent: 'center',
  },
  categoryItem: {
    flex: 1,
    alignItems: 'center',
    margin: 5,
    padding : 5,
    paddingHorizontal : 10,
    borderWidth : 1,
    borderRadius : 10,
    shadowColor : 'darkblue',
    shadowRadius : 10,
    
    
    
  },
  categoryImage: {
    width: 100,
    height: 80,
    borderRadius: 10,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color : 'darkblue',
    marginTop: 5,
  },
  loadingText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Categories;
