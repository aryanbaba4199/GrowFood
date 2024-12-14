import React, { useState, useEffect, useRef } from 'react';
import { Dimensions, View, StyleSheet, Image, FlatList } from 'react-native';

const { width } = Dimensions.get('window');

const imageData = [
  'https://previews.123rf.com/images/margouillat/margouillat1801/margouillat180100604/93958084-assorted-health-food-on-white-background.jpg',
  'https://i.pinimg.com/564x/4f/e9/1f/4fe91f28cb9e0add473b85d523180079.jpg',
  'https://i.pinimg.com/564x/1d/3f/60/1d3f60d5b1ae11bfc8aa92f769bfe95a.jpg',
];

const ImageCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % imageData.length;
      setCurrentIndex(nextIndex);

      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({ animated: true, index: nextIndex });
      }
    }, 3000); // Adjust interval as needed (milliseconds)

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [currentIndex]);

  return (
    <View style={styles.carouselContainer}>
      <FlatList
        ref={flatListRef}
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
        getItemLayout={(data, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        onScrollToIndexFailed={(error) => {
          const offset = error.averageItemLength * error.index;
          flatListRef.current?.scrollToOffset({ offset, animated: true });
          setTimeout(() => {
            flatListRef.current?.scrollToIndex({ index: error.index, animated: true });
          }, 100); // Reattempt scrolling to the index
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    marginTop : 10,
    marginHorizontal: 10,
  },
  carouselItem: {
    width: width - 50, 
    height: width / 2, 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25, // Rounded corners
   
   
    marginHorizontal: 5, // Spacing between items
    overflow: 'hidden', // Ensures images are clipped to rounded corners
  },
  image: {
    width: width,
    height: '100%',
    paddingHorizontal : 10,
    resizeMode: 'cover',
  },
});

export default ImageCarousel;
