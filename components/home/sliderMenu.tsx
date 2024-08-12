import { useNavigation, NavigationProp } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { RootStackParamList } from '../menu/interface/rootStackParams';

type propsType = {
  category: any[],
  products: any[],
};

const SliderMenu: React.FC<propsType> = ({ category, products }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);

  const handleClick = (categoryName: string) => {
    const filterProduct = products.filter(product => product.categories === categoryName);
    setFilteredProducts(filterProduct);

    navigation.navigate('FilterView', { filterProducts: filterProduct });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={category}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.categoryItem}
            onPress={() => handleClick(item.name)}
            activeOpacity={0.7} // Adjust the opacity when pressed
          >
            <Image
              source={{ uri: "https://raw.githubusercontent.com/dohooo/react-native-reanimated-carousel/HEAD/assets/home-banner.png" }}
              style={styles.image}
            />
            <Text style={styles.title}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  categoryItem: {
    alignItems: 'center',
    marginHorizontal: 10,
    
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    
    shadowColor: '#000', // Shadow color (for iOS)
    shadowOffset: { width: 0, height: 2 }, // Shadow offset (for iOS)
    shadowOpacity: 0.8, // Shadow opacity (for iOS)
    shadowRadius: 2, 
    elevation: 5, 
  },
  title: {
    marginTop : 5,
    fontSize: 14,
    fontWeight: '500',
    fontFamily : 'sans-serif',
    color : '#000',
  },
});

export default SliderMenu;
