import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { system } from "./theme"; // Import the theme instead of system
import Fonts from './fonts';
import { AuthProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <ChakraProvider value={system}>
      <AuthProvider>
        <Fonts />
        <App />
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>
);