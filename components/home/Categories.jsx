import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import {Card} from 'react-native-paper';
import { gfApi } from '../API';



const Categories = ({categories}) => {
  return (
    <View style={styles.scrollViewContainer}>
      {categories.map((item, index) => (
        <View key={index} style={styles.cardContainer}>
          <Card style={styles.card}>
            <Card.Cover
              source={{uri: item.image ?? gfApi.image}}
              style={styles.cardCover}
            />
          </Card>
          <Text style={styles.cardTitle}>{item.name}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    width: 70, // Container width adjusts dynamically
  },
  card: {
    width : 60,
    height: 60,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  cardCover: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },
  cardTitle: {
    fontWeight: '500',
    fontSize: 12,
    textAlign: 'center',
    color: '#333',
    marginTop: 8,
    paddingHorizontal: 5,
  },
});

export default Categories;
