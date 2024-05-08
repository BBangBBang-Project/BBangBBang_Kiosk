import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Stack from './navigations/Stack';
import { ResultProvider } from './service/ResultContext';

const App = () => {
  return (
    <ResultProvider>
    <NavigationContainer>
      <Stack />
    </NavigationContainer>
    </ResultProvider>
    
  );
};

export default App;
