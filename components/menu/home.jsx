import { View, Text, Dimensions, ScrollView, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import SliderMenu from '../home/sliderMenu';
import ImageCarousel from '../home/carousal';
import { useDispatch, useSelector } from 'react-redux';
import {
  getBrands,
  getCategories,
  getProducts as fetchProducts,
} from '../../redux/actions/productActions';
import Categories from '../home/Categories';
import Brands from '../home/brands';
import NewProductSlider from '../home/newProduct';
import axios from 'axios';
import { getProductsApi, productApi } from '../../appApi';

const Home = () => {
  const [productsData, setProductsData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [allLoaded, setAllLoaded] = useState(false); // To track when all products are loaded
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getBrands());
    loadProducts(); // Initial load
  }, []);

  const categories = useSelector((state) => state.products.categories);
  const brands = useSelector((state) => state.products.brands);

  const loadProducts = async () => {
    if (loading || allLoaded) return; 
    setLoading(true);
    try {
      const res = await axios.get(`${getProductsApi}/${page}`);
      if (res.status === 200) {
        const newProducts = res.data.data;
        if (newProducts.length === 0) {
          setAllLoaded(true);
        } else {
          setProductsData((prev) => [...prev, ...newProducts]);
          setPage((prevPage) => prevPage + 1);
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = ({ nativeEvent }) => {
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 20) {
      loadProducts();
    }
  };

  return (
    <ScrollView
      onScroll={handleScroll}
      scrollEventThrottle={16}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <View style={{ padding: 10 }}>
        <ImageCarousel />
        <View style={{ marginTop: 20 }}>
          <Text
            style={{
              paddingLeft: 20,
              fontWeight: 'bold',
              fontSize: 20,
              color: 'black',
            }}
          >
            Shop By Category
          </Text>
          <Categories categories={categories} />
        </View>
        <View style={{ marginTop: 20 }}>
          <Text
            style={{
              paddingLeft: 20,
              fontWeight: 'bold',
              fontSize: 20,
              color: 'black',
            }}
          >
            Shop By Brands
          </Text>
          <Brands brands={brands} />
        </View>
        <View style={{ marginTop: 20 }}>
          {productsData.length > 0 ? (
            <NewProductSlider products={productsData} />
          ) : (
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: Dimensions.get('screen').width,
              }}
            >
              <Text>Loading...</Text>
            </View>
          )}
          {loading && (
            <View
              style={{
                marginTop: 10,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <ActivityIndicator size="large" color="#15892e" />
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;
