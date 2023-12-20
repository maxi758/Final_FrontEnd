import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

import { CircularProgress } from '@mui/material';

const Products = React.lazy(() => import('./products/pages/GetProducts'));
const Order = React.lazy(() => import('./orders/pages/GetOrder'));

const App = () => {
  return (
    <React.Suspense fallback={<CircularProgress />}>
      <Router>
        <Routes>
          <Route path="/products" element={<Products />} />
          <Route path="/orders/:orderId" element={<Order />} />
          <Route path="/" element={<Navigate to="/products" />} />
        </Routes>
      </Router>
    </React.Suspense>
  );
};

export default App;