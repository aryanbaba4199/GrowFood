import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import ProfileScreen from '../components/menu/profile';
import SignInScreen from '../components/user/auth';

import { RootStackParamList } from '../components/menu/interface/rootStackParams';

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    
      <Stack.Navigator initialRouteName='Profile'>
        
        <Stack.Screen name="Profile" component={ProfileScreen} options={{headerShown : false}} />
        <Stack.Screen name="SignIn" component={SignInScreen} options={{headerShown : false}}/>
        
      </Stack.Navigator>
   
  );
};

export default AppNavigator;
