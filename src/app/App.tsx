import React from 'react';
import { RouterProvider } from 'react-router';
import { preloadRouteChunks, router } from './routes';
import { CartProvider } from './cart/CartContext';
import { ContentProvider } from './content/ContentContext';
import { AuthProvider } from './auth/AuthContext';
import { CustomerAuthProvider } from './auth/CustomerAuthContext';

function App() {
  React.useEffect(() => {
    const onIdle = () => {
      void preloadRouteChunks();
    };
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const id = window.requestIdleCallback(onIdle);
      return () => window.cancelIdleCallback(id);
    }
    const timeoutId = window.setTimeout(onIdle, 250);
    return () => window.clearTimeout(timeoutId);
  }, []);

  return (
    <AuthProvider>
      <CustomerAuthProvider>
        <ContentProvider>
          <CartProvider>
            <RouterProvider router={router} />
          </CartProvider>
        </ContentProvider>
      </CustomerAuthProvider>
    </AuthProvider>
  );
}

export default App;