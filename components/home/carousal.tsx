// components/home/carousal.tsx

import React from 'react';
import { Dimensions, View, StyleSheet, Image, FlatList } from 'react-native';

const { width } = Dimensions.get('window');

const imageData = [
  'https://raw.githubusercontent.com/dohooo/react-native-reanimated-carousel/HEAD/assets/home-banner.png',
  'https://raw.githubusercontent.com/dohooo/react-native-reanimated-carousel/HEAD/assets/home-banner.png',
];

const ImageCarousel: React.FC = () => {
  return (
    <View style={styles.carouselContainer}>
      <FlatList
        data={imageData}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.carouselItem}>
            <Image source={{ uri: item }} style={styles.image} />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    flex: 1,
    
    marginHorizontal: 10,
  },
  carouselItem: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: width / 2,
    resizeMode: 'cover',
  },
});

export default ImageCarousel;
