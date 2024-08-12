import React, { useEffect, createContext, useState, ReactNode } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import AppNavigator from './components/footer/footerTab';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { Provider as ReduxProvider } from 'react-redux';
import store from './redux/store';
import { getProducts } from './redux/actions/productActions';
import { getUserApi } from './components/API';

// Define the shape of your global context
interface GlobalContextType {
  userDetails: any;
  setUserDetails: (details: any) => void;
  address: any;
  setAddress: (address: any) => void;
  globalVariable: string;
  setGlobalVariable: (value: string) => void;
}

// Create the context with default values
export const GlobalContext = createContext<GlobalContextType>({
  userDetails: null,
  setUserDetails: () => {},
  address: null,
  setAddress: () => {},
  globalVariable: 'Initial Value',
  setGlobalVariable: () => {},
});

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [address, setAddress] = useState(null);
  const [globalVariable, setGlobalVariable] = useState('Initial Value');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          const userRes = await axios.get(`${getUserApi}/me`);
          if (userRes.status === 200) {
            setUserDetails({
              id: userRes.data._id,
              name: userRes.data.name,
              email: userRes.data.email,
              avatar: 'https://example.com/default-profile-image.jpg'
            });

            const addressRes = await axios.get(`${getUserApi}/getAddress/${userRes.data._id}`);
            if (addressRes.status === 200) {
              setAddress(addressRes.data);
            }
          } else {
            Alert.alert('Failed to fetch user data');
          }
        } else {
          // Handle unauthenticated state or navigate to SignIn
        }
      } catch (error) {
        console.error('Fetch user error:', error);
        Alert.alert('Something went wrong while fetching user data');
      }
    };

    fetchUserData();
  }, []);

  return (
    <GlobalContext.Provider value={{ userDetails, setUserDetails, address, setAddress, globalVariable, setGlobalVariable }}>
      {children}
    </GlobalContext.Provider>
  );
};

function App(): React.ReactElement {
  useEffect(() => {
    // Fetch products as soon as the app starts
    store.dispatch(getProducts());
  }, []);

  return (
    <GlobalProvider>
      <ReduxProvider store={store}>
        <PaperProvider>
          <AppNavigator />
        </PaperProvider>
      </ReduxProvider>
    </GlobalProvider>
  );
}

export default App;
