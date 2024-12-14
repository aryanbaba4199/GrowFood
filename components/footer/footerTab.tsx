import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeNavigator from '../../Navigation/homeNavigator';
import CategoriesScreen from '../menu/cart';
import OrdersScreen from '../menu/order';
import ProductStackNavigator from '../../Navigation/navigationRoute';
import ProfileNavigator from '../../Navigation/appNavigator';
import CustomHeader from '../NavMenu/navbar';
import { View, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

type RouteName = 'Home' | 'Cart' | 'Products' | 'Orders' | 'Profile';

// Mapping of route names to icon names
const iconMapping: Record<RouteName, string> = {
  Home: 'home-outline',
  Cart: 'list-outline',
  Products: 'server',
  Orders: 'cart-outline',
  Profile: 'person-outline',
};

// Function to render tab bar icons outside of screen options
const renderTabBarIcon = (routeName: RouteName, focused: boolean, size: number) => {
  const iconName = iconMapping[routeName] || 'circle-outline';
  return (
    <View style={[styles.tabIconContainer, focused && styles.tabIconActive]}>
      <Icon name={iconName} size={size} color={focused ? '#059212' : '#000000'} />
    </View>
  );
};



// Static header component
const customHeader = () => <CustomHeader />;

function AppNavigator() {
  return (
    
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          header: customHeader,
          tabBarActiveTintColor: '#15892e',
          tabBarInactiveTintColor: '#000000',
          tabBarStyle: styles.tabBarStyle,
          tabBarLabelStyle: styles.tabLabel,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeNavigator}
          options={{
            tabBarIcon: ({ focused, size }) => renderTabBarIcon('Home', focused, size),
          }}
        />
        <Tab.Screen
          name="Cart"
          component={CategoriesScreen}
          options={{
            tabBarIcon: ({ focused, size }) => renderTabBarIcon('Cart', focused, size),
          }}
        />
        <Tab.Screen
          name="Products"
          component={ProductStackNavigator}
          options={{
            tabBarIcon: ({ focused, size }) => renderTabBarIcon('Products', focused, size),
          }}
        />
        <Tab.Screen
          name="Orders"
          component={OrdersScreen}
          options={{
            tabBarIcon: ({ focused, size }) => renderTabBarIcon('Orders', focused, size),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileNavigator}
          options={{
            tabBarIcon: ({ focused, size }) => renderTabBarIcon('Profile', focused, size),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
  },
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconActive: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  tabBarStyle: {
    backgroundColor: '#f9f2fa',
    // borderTopWidth: 2,
    // borderTopColor: '#15892e',
    paddingBottom: 5,
    paddingTop: 5,
    height: 60,
  },
});

export default AppNavigator;
