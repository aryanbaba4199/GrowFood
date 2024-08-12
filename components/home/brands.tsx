import { useNavigation, NavigationProp } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import { RootStackParamList } from '../menu/interface/rootStackParams';



type propsType = {
  brands : any
  products : any[]
}
const BrandSlider = (props : propsType) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
    const products = props.products;
  const handleClick = (brand : any) =>{
    console.log(brand)
    const filterProducts = products.filter(product =>product.brand===brand)
    console.log(filterProducts);  
    navigation.navigate('FilterView', { filterProducts: filterProducts });
  }

  return (
    <View style={styles.container}>
        <Text style = {styles.text}>Brands</Text>
      <FlatList
        data={props.brands}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.categoryItem} onPress={()=>handleClick(item.name)}>
            <Image source={{ uri: 'https://raw.githubusercontent.com/dohooo/react-native-reanimated-carousel/HEAD/assets/home-banner.png' }} style={styles.image} />
            <Text style={styles.title}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => {
          return  index.toString();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginTop: 20,
  },
  categoryItem: {
    alignItems: 'center',
    marginHorizontal: 10,
    
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginBottom: 5,
    borderWidth : 2,
    borderColor : 'black',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily : 'sans-serif',
    color : 'black',
  },
  text : {
    fontSize: 18,
    fontWeight: '700',
    fontFamily : 'sans-serif',
    color : 'black',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
    marginBottom: 5,
    alignSelf: 'flex-start',
  }
});

export default BrandSlider;
