import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import { Card } from 'react-native-paper';
import { gfApi } from '../API';

const Brands = ({ brands }) => {
  return (
    <ScrollView
      contentContainerStyle={styles.scrollViewContainer}
      horizontal // For horizontal scrolling
      showsHorizontalScrollIndicator={false}
    >
      {brands.map((item, index) => (
        <View style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Card key={index} elevation={1} style={styles.card}>
          <Card.Cover 
            source={{ uri: item.image || gfApi.image }} 
            style={styles.cardCover} 
          />
          
        </Card>
        <Text style={styles.cardTitle}>{item.name}</Text>

        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  card: {
    width: 70,
    height : 70, // Adjust width as needed
    backgroundColor: '#ccffbf',
    borderRadius: 10, // Rounded corners for the card
    overflow: 'hidden',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    
  },
  cardCover: {
    marginTop : 5,
    width: 60, // Make cover take full width of the card
    height: 60, // Adjust height to match your design
    borderRadius: 10, // Rounded corners for the image
  },
  cardTitle: {
    fontWeight: '400',
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
    marginTop: 5,
    flexWrap: 'wrap',  
    width: 100, 
  },
  
});

export default Brands;
