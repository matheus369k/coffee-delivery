import { createBrowserRouter } from 'react-router-dom';

import { LayoutDefault } from '@/layout';
import { Checkout } from '@pages/Checkout';
import { Confirm } from '@pages/Confirm';
import { Home } from '@pages/Home';

export const router = createBrowserRouter([
  {
    path: '/coffee-delivery',
    element: <LayoutDefault />,
    children: [
      {
        path: '/coffee-delivery',
        element: <Home />,
      },
      {
        path: '/coffee-delivery/checkout',
        element: <Checkout />,
      },
      {
        path: '/coffee-delivery/confirm',
        element: <Confirm />,
      },
    ],
  },
]);
