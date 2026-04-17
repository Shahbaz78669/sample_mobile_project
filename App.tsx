import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { store, persistor } from './src/store';
import { RootNavigator } from './src/navigation';
import { useAppLifecycle } from './src/hooks';

// Local component to access Redux hooks
const AppContainer = () => {
  // Use lifecycle hook to satisfy the requirements (handle app state, active/background/etc)
  const appState = useAppLifecycle();

  useEffect(() => {
    // We could dispatch actions here depending on appState, e.g. refetch on active
    // For now, logging will be handled in the hook, showing lifecycle awareness.
    if (appState === 'active') {
      // e.g. dispatch(checkConnection())
    }
  }, [appState]);

  return <RootNavigator />;
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <AppContainer />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
