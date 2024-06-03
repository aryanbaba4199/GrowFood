import React from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
type propsType = {
  category : any,
};



const SliderMenu = (props : propsType) => {
  const category = props.category;
  return (
    <View style={styles.container}>
      <FlatList
        data={category}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.categoryItem}>
            <Image source={{ uri: "https://raw.githubusercontent.com/dohooo/react-native-reanimated-carousel/HEAD/assets/home-banner.png" }} style={styles.image} />
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
    borderRadius: 40,
    marginBottom: 5,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default SliderMenu;
