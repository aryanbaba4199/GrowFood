import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, getBrands, getCategories } from '../../redux/actions/productActions';
import { ActivityIndicator } from 'react-native-paper';
import ImageCarousel from '../home/carousal';
import SliderMenu from '../home/sliderMenu';
import Search from '../NavMenu/search';
import BrandSlider from '../home/brands';
import NewArrivalSlider from '../home/newProduct';

const HomeScreen: React.FC = () => {
  const dispatch : any = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getBrands());
    dispatch(getCategories());
  }, [dispatch]);

  const products = useSelector((state: any) => state.products.products);
  const brands = useSelector((state: any) => state.products.brands);
  const categories = useSelector((state: any) => state.products.categories);

  if (!products || !brands || !categories) {
    return <ActivityIndicator animating={true} size="large" />;
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Search />
      <SliderMenu category={categories} />
      <ImageCarousel />
      <BrandSlider brands={brands} />
      <NewArrivalSlider products={products} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
});

export default HomeScreen;
