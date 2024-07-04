'use client';

import React from 'react';
import ProgressBar from './components/common/ProgressBar';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { ChakraProvider } from '@chakra-ui/react';

const PageWrapper = ({ children }: any) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ChakraProvider>
          <ProgressBar />
          <div className="bg-zinc-950 min-h-screen text-zinc-200">
            {children}
          </div>
        </ChakraProvider>
      </PersistGate>
    </Provider>
  );
};

export default PageWrapper;
