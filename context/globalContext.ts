import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import AppNavigator from './components/footer/footerTab';

// Define the shape of your global context
interface GlobalContextType {
  userDetails: any;
  setUserDetails: (details: any) => void;
  globalVariable: string;
  setGlobalVariable: (value: string) => void;
}

// Create the context with default values
export const GlobalContext = createContext<GlobalContextType>({
  userDetails: null,
  setUserDetails: () => {},
  globalVariable: 'Initial Value',
  setGlobalVariable: () => {},
});

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [globalVariable, setGlobalVariable] = useState('Initial Value');

  return (
    <GlobalContext.Provider value={{ userDetails, setUserDetails, globalVariable, setGlobalVariable }}>
      {children}
    </GlobalContext.Provider>
  );
};
