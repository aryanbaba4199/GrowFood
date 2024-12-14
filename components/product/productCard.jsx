import React from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { Image } from 'react-native';

const ProductCard = ({ product }) => {
  return (
    <Card style={{ margin: 10, elevation: 3 }}>
      {/* ScrollView with pagingEnabled to show one image at a time */}
      <ScrollView
        horizontal
        pagingEnabled
        style={{ height: 200 }}
        showsHorizontalScrollIndicator={false}
      >
        {product.image.map((image, index) => (
          <View
            key={index}
            style={{
              width: Dimensions.get('window').width, // Ensure one image is visible at a time
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              source={{ uri: image }}
              style={{
                width: '100%', // Full width of the parent container
                height: '100%', // Full height of the container
                resizeMode: 'cover', // Ensure image is not stretched
              }}
            />
          </View>
        ))}
      </ScrollView>

      {/* Card content displaying product info */}
      <Card.Content>
        <Title>{product.name}</Title>
        <Paragraph numberOfLines={2} ellipsizeMode="tail">
          {product.description}
        </Paragraph>
        <Text style={{ fontWeight: 'bold', marginTop: 5 }}>
          ${product.sellingPrice}
        </Text>
      </Card.Content>

      {/* Actions */}
      
    </Card>
  );
};

export default ProductCard;
