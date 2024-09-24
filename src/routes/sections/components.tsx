import {  Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { MainLayout } from 'src/layouts/main';

import { SplashScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------


// ----------------------------------------------------------------------

export const componentsRoutes = [
  {
    element: (
      <Suspense fallback={<SplashScreen />}>
        <MainLayout>
          <Outlet />
        </MainLayout>
      </Suspense>
    ),

  },
];
