import React from 'react';
import { RouterProvider } from 'react-router';
import { router } from './routes';
import { CartProvider } from './cart/CartContext';
import { ContentProvider } from './content/ContentContext';
import { AuthProvider } from './auth/AuthContext';

function App() {
  return (
    <AuthProvider>
      <ContentProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </ContentProvider>
    </AuthProvider>
  );
}

export default App;