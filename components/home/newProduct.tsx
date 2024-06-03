import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';


type propsType = {
  products : any
}

const NewProductSlider = (props : propsType) => {
  return (
    <View style={styles.container}>
        <Text style = {styles.text}>New Products</Text>
      <FlatList
        data={props.products}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.categoryItem}>
            {item.image.length > 0 && (
              <Image source={{ uri: item.image[0] }} style={styles.image} />
            )}
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
    marginHorizontal: 15,
    width : 160,
    height : 170,
    justifyContent : 'center',
    alignContent: 'center',
  },
  image: {
    width: 150,
    height: 120,
    borderRadius: 10,
    marginBottom: 5,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color : 'darkblue',
    textAlign : 'center'
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

export default NewProductSlider;
