import React, { createContext, useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

// Create the GlobalContext
export const GlobalContext = createContext({
  userDetails: null,
  setUserDetails: () => {},
  globalVariable: 'Initial Value',
  setGlobalVariable: () => {},
  notifier: { title: '', text: '', icon: '' },
  setNotifier: (notifier) => {}, 
});


// GlobalProvider component
export const GlobalProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState(null);
  const [globalVariable, setGlobalVariable] = useState('Initial Value');
  const [notifier, setNotifier] = useState({title : '', text : '', icon : ''});

  return (
    <GlobalContext.Provider
      value={{
        userDetails,
        setUserDetails,
        globalVariable,
        setGlobalVariable,
        notifier,
        setNotifier,
      }}
    >
      <PaperProvider>
        {children}
      </PaperProvider>
    </GlobalContext.Provider>
  );
};
