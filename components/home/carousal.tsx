import React, { useState, useEffect } from 'react';
import { Dimensions, View, StyleSheet, Image, FlatList } from 'react-native';

const { width } = Dimensions.get('window');

const imageData = [
  'https://previews.123rf.com/images/margouillat/margouillat1801/margouillat180100604/93958084-assorted-health-food-on-white-background.jpg',
  'https://i.pinimg.com/564x/4f/e9/1f/4fe91f28cb9e0add473b85d523180079.jpg',
  'https://i.pinimg.com/564x/1d/3f/60/1d3f60d5b1ae11bfc8aa92f769bfe95a.jpg',
];

const ImageCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageData.length);
    }, 3000); // Adjust interval as needed (milliseconds)

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <View style={styles.carouselContainer}>
      <FlatList
        data={imageData}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View style={styles.carouselItem}>
            <Image source={{ uri: item }} style={styles.image} />
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
        initialScrollIndex={currentIndex}
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        onViewableItemsChanged={({ viewableItems }) => {
          if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index || 0);
          }
        }}
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
    width: width - 50, // Adjusted to fit within margins
    height: width / 2, // Fixed height for each carousel item
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25, // Rounded corners
    borderColor: '#009867', // Border color
    borderWidth: 2, // Border width
    marginHorizontal: 5, // Spacing between items
    overflow: 'hidden', // Ensures images are clipped to rounded corners
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

export default ImageCarousel;
