import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import { globalStyles } from '../../globalStyles';
import { Image } from 'react-native';

const ProductCard = ({ item }) => {
  const [index, setIndex] = useState(0); 

  // Function to handle scrolling
  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const imageWidth = Dimensions.get('window').width;
    const newIndex = Math.floor(contentOffsetX / imageWidth);

    // Ensure index is within bounds
    if (newIndex < 0) {
      setIndex(0);
    } else if (newIndex >= item.image.length) {
      setIndex(item.image.length - 1);
    } else {
      setIndex(newIndex);
    }
  };

  return (
    <View style={styles.cardContainer}>
      <Card style={styles.card}>
        <ScrollView
          horizontal
          pagingEnabled
          onScroll={handleScroll} 
          showsHorizontalScrollIndicator={false}
          style={styles.cardImageWrapper}
        >
          {item.image.map((image, idx) => (
            <View key={idx} style={styles.imageWrapper}>
              <Image
                source={{ uri: image }}
                style={styles.cardImage}
              />
            </View>
          ))}
        </ScrollView>

        <Card.Content style={styles.cardContent}>
          <Title style={styles.cardTitle}>{item.name}</Title>
          <Text style={styles.cardCategory}>{item.categories}</Text>

          <View style={styles.priceContainer}>
            <View style={styles.priceRow}>
              <Icon name="rupee" size={14} style={styles.rupeeIcon} />
              <Paragraph style={styles.priceText}>
                {item.price || 1000}/-
              </Paragraph>
            </View>
            <Paragraph style={{ ...globalStyles.text, fontWeight: 600 }}>
              {parseInt(item.discount)}% off
            </Paragraph>

            <View
              style={{
                ...globalStyles.bgcolor,
                ...styles.sellingPriceContainer,
              }}
            >
              <Icon name="rupee" size={18} style={styles.sellingPriceIcon} />
              <Paragraph style={styles.sellingPriceText}>
                {item.sellingPrice}
              </Paragraph>
            </View>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: 16,
    width: Dimensions.get('screen').width - 20,
    paddingHorizontal: 8,
  },
  card: {
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 8,
  },
  cardImageWrapper: {
    height: 150,
    width: Dimensions.get('screen').width - 20,
  },
  imageWrapper: {
    width: Dimensions.get('window').width-20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImage: {
    height: 140,
    width: 140,
    alignSelf: 'center',
    resizeMode: 'cover', 
    objectFit: 'center',
    borderRadius : 10,
    marginTop: 10,
  },
  
  cardContent: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  cardTitle: {
    color: 'black',
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  cardCategory: {
    color: '#444',
    alignSelf: 'center',
    fontSize: 16,
    marginBottom: 8,
  },
  priceContainer: {
    display : 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width : Dimensions.get('screen').width-70,
    alignItems: 'center',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  rupeeIcon: {
    marginRight: 4,
  },
  priceText: {
    color: '#696b69',
  },
  sellingPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    borderRadius: 5,
    paddingVertical: 2,
  },
  sellingPriceIcon: {
    marginRight: 4,
    color: 'white',
  },
  sellingPriceText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ProductCard;
