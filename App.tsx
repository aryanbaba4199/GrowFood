import React, { useEffect } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { Provider as PaperProvider } from 'react-native-paper'; // Import PaperProvider
import store from './redux/store';
import AppNavigator from './components/footer/footerTab';
import { getProducts } from './redux/actions/productActions';

function App(): React.JSX.Element {
  useEffect(() => {
    store.dispatch(getProducts());
  }, []);

  return (
    <ReduxProvider store={store}>
      <PaperProvider>
        <AppNavigator />
      </PaperProvider>
    </ReduxProvider>
  );
}

export default App;
