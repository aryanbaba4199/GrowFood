import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';

const categories = [
  { id: '1', title: 'Veera', image: 'https://raw.githubusercontent.com/dohooo/react-native-reanimated-carousel/HEAD/assets/home-banner.png' },
  { id: '2', title: 'Dabour', image: 'https://raw.githubusercontent.com/dohooo/react-native-reanimated-carousel/HEAD/assets/home-banner.png' },
  { id: '3', title: 'India Delights', image: 'https://raw.githubusercontent.com/dohooo/react-native-reanimated-carousel/HEAD/assets/home-banner.png' },
  { id: '4', title: 'Jain Dairy', image: 'https://raw.githubusercontent.com/dohooo/react-native-reanimated-carousel/HEAD/assets/home-banner.png' },
  { id: '5', title: 'McCain', image: 'https://raw.githubusercontent.com/dohooo/react-native-reanimated-carousel/HEAD/assets/home-banner.png' },
];

type propsType = {
  brands : any
}
const BrandSlider = (props : propsType) => {
  return (
    <View style={styles.container}>
        <Text style = {styles.text}>Brands</Text>
      <FlatList
        data={props.brands}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.categoryItem}>
            <Image source={{ uri: 'https://raw.githubusercontent.com/dohooo/react-native-reanimated-carousel/HEAD/assets/home-banner.png' }} style={styles.image} />
            <Text style={styles.title}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
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
    borderRadius: 10,
    marginBottom: 5,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color : 'darkblue',
  },
  text : {
    marginHorizontal : 10,
    fontWeight : '700',
    fontSize : 18,
    color : 'white',
    backgroundColor : 'black',
    paddingHorizontal : 10,
    borderRadius : 5,
    paddingVertical : 2,
    marginVertical : 10,
  }
});

export default BrandSlider;
