import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Appbar, Searchbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { getProducts, getBrands, getCategories } from '../../redux/actions/productActions';
import { useDispatch, UseDispatch, useSelector } from 'react-redux';
import { globalStyles } from '../../globalStyles';

function CustomHeader() {
  const [searchQuery, setSearchQuery] = useState('');

  const dispatch: any = useDispatch();

  useEffect(() => {
    console.log(searchQuery);
  }, [searchQuery])


  

  

  return (
    <View style={styles.headerContainer}>
      <LinearGradient colors={[ '#15892e', '#15892e',]} start={{ x: 0.5, y: 0.5 }} end={{ x: 1, y: 0.5 }}>
        <Appbar.Header style={styles.header}>
          <Image
            source={{ uri: 'https://www.thegrowfood.com/_next/image?url=%2Ffavicon.ico&w=64&q=75' }}  // Replace with your project icon URL
            style={styles.projectIcon}
          />



          <Searchbar
            onChangeText={(query) => setSearchQuery(query)}
            value={searchQuery}
            style={styles.searchbar}
          />

          {/* Profile Icon */}
          <TouchableOpacity>
            <Icon name="person-circle-outline" size={30} color="white" style={styles.profileIcon} />
          </TouchableOpacity>
        </Appbar.Header>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 56,
    backgroundColor: 'transparent',
  },
  header: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  projectIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius : 100,
  },
  searchbar: {
    flex: 1,
    borderRadius: 25,
    borderWidth: 2,
    height: 48,
    padding: 0,
    borderColor: '#009867',
  },
  profileIcon: {
    marginLeft: 10,
  },
});

export default CustomHeader;
