import React from 'react';
import RootStack from './navigation/RootStack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {
  return (
    <GestureHandlerRootView>
      <SafeAreaProvider>
        <RootStack />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;
