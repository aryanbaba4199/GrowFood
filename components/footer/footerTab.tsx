import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../menu/home';
import CategoriesScreen from '../menu/category';
import OrdersScreen from '../menu/order';
import ProductStackNavigator from '../../Navigation/navigationRoute';
import ProfileScreen from '../menu/profile';
import { Appbar } from 'react-native-paper'; // Import Appbar
import AppNavigators from '../../Navigation/appNavigator';

const Tab = createBottomTabNavigator();

function CustomHeader({ title }: { title: string }) {
  return (
    <Appbar.Header>
      <Appbar.Content title={title} />
    </Appbar.Header>
  );
}

function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          header: () => <CustomHeader title="Grow Food" />,
          tabBarIcon: ({ color, size }) => {
            let iconName;

            switch (route.name) {
              case 'Home':
                iconName = 'home-outline';
                break;
              case 'Categories':
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
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'gold',
          tabBarInactiveTintColor: 'white',
          tabBarStyle: {
            backgroundColor: 'black',
            borderTopColor: '#101820',
            paddingBottom: 5,
            paddingTop: 5,
            height: 60,
          },
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: '600',
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Categories" component={CategoriesScreen} />
        <Tab.Screen name="Products" component={ProductStackNavigator} />
        <Tab.Screen name="Orders" component={OrdersScreen} />
        <Tab.Screen name="Profile" component={AppNavigators} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
