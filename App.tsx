import React, { useEffect, createContext, useState, ReactNode } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import AppNavigator from './components/footer/footerTab';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, StatusBar, StyleSheet, View } from 'react-native';
import { Provider as ReduxProvider } from 'react-redux';
import store from './redux/store';
import { getProducts } from './redux/actions/productActions';
import { getUserApi } from './components/API';

import { GestureHandlerRootView } from 'react-native-gesture-handler'; // Import this

// Define the shape of your global context
interface GlobalContextType {
  userDetails: any;
  refreshUser: boolean;
  setRefreshUser: (refreshUser: boolean) => void;
  setUserDetails: (details: any) => void;
  address: any;
  setAddress: (address: any) => void;
  notifier: any;
  setNotifier: (notifier: any) => void;
  globalVariable: string;
  setGlobalVariable: (value: string) => void;
}

// Create the context with default values
export const GlobalContext = createContext<GlobalContextType>({
  userDetails: null,
  setUserDetails: () => { },
  refreshUser: false,
  setRefreshUser: () => { },
  address: null,
  setAddress: () => { },
  globalVariable: 'Initial Value',
  notifier : {title : String, text : String, icon : String},
  setNotifier : () => { },
  setGlobalVariable: () => { },
});

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [userDetails, setUserDetails] = useState({
    id: '', name: '', email: '', avatar: '', shopName: '', mobile: '',
  });
  const [address, setAddress] = useState(null);
  const [globalVariable, setGlobalVariable] = useState('Initial Value');
  const [refreshUser, setRefreshUser] = useState(true);
  const [notifier, setNotifier] = useState({
    title : '',
    text : '',
    icon : '',
  });

  useEffect(() => {
    fetchUserData();
    setRefreshUser(false);
  }, [refreshUser]);

  const fetchUserData = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        const userRes = await axios.get(`${getUserApi}/me`);
        if (userRes.status === 200) {

          setUserDetails({
            mobile: userRes.data.user.mobile ?? "na",
            shopName: userRes.data.user.shopName,
            id: userRes.data.user._id,
            name: userRes.data.user.name,
            email: userRes.data.user.email,
            avatar: userRes.data.user.image ?? "",
          });

          const addressRes = await axios.get(`${getUserApi}/getAddress/${userRes.data.user._id}`);
          if (addressRes.status === 200) {
            setAddress(addressRes.data);
          }
        } else {
          Alert.alert('Failed to fetch user data');
        }
      }
    } catch (error) {
      console.error('Fetch user error:', error);
      Alert.alert('Something went wrong while fetching user data');
    }
  };



  return (
    <>
    <GlobalContext.Provider value={{
       refreshUser: false, setRefreshUser, userDetails, setUserDetails, address, setAddress, globalVariable,
        setGlobalVariable, notifier, setNotifier
        }}>
      {children}
    </GlobalContext.Provider>
    </>
  );
};

function App(): React.ReactElement {
  

  return (
    <>
      
      <StatusBar backgroundColor="#15892e" barStyle="light-content" />
  
    <GlobalProvider>
      <ReduxProvider store={store}>
        <GestureHandlerRootView style={{ flex: 1 }}>

          <PaperProvider>
            <AppNavigator />
          </PaperProvider>

        </GestureHandlerRootView>
      </ReduxProvider>
    </GlobalProvider>
    </>
  );
}

export default App;
