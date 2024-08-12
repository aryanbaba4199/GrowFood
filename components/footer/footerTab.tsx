import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Appbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeNavigator from '../../Navigation/homeNavigator';
import CategoriesScreen from '../menu/cart';
import OrdersScreen from '../menu/order';
import ProductStackNavigator from '../../Navigation/navigationRoute';
import ProfileNavigator from '../../Navigation/appNavigator';
import { View, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

function CustomHeader({ title }: any) {
  return (
    <View style={styles.headerContainer}>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title={title} titleStyle={styles.headerTitle} />
      </Appbar.Header>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 56,
    backgroundColor: '#009867',
  },
  header: {
    backgroundColor: 'transparent',
  },
  headerTitle: {
    color: 'white',
    fontFamily: 'sans-serif',
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconActive: {
    width: 40,
    height: 40,
    backgroundColor: '#CDE8E5',
    borderRadius : 50,
  },
  tabBarStyle: {
    backgroundColor: '#050C9C',
    borderTopColor: '#2B0058',
    paddingBottom: 5,
    paddingTop: 5,
    height: 60,
  },
});

function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          header: () => <CustomHeader title="Grow Food" />,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            switch (route.name) {
              case 'Home':
                iconName = 'home-outline';
                break;
              case 'Cart':
                iconName = 'list-outline';
                break;
              case 'Products':
                iconName = 'server';
                break;
              case 'Orders':
                iconName = 'cart-outline';
                break;
              case 'Profile':
                iconName = 'person-outline';
                break;
              default:
                iconName = 'circle-outline';
                break;
            }

            return (
              <View style={[styles.tabIconContainer, focused && styles.tabIconActive]}>
                <Icon name={iconName} size={size} color={focused ? '#3572EF' : color} />
              </View>
            );
          },
          tabBarActiveTintColor: '#A7E6FF',
          tabBarInactiveTintColor: 'white',
          tabBarStyle: styles.tabBarStyle,
          tabBarLabelStyle: styles.tabLabel,
        })}
      >
        <Tab.Screen name="Home" component={HomeNavigator} />
        <Tab.Screen name="Cart" component={CategoriesScreen} />
        <Tab.Screen name="Products" component={ProductStackNavigator} />
        <Tab.Screen name="Orders" component={OrdersScreen} />
        <Tab.Screen name="Profile" component={ProfileNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
