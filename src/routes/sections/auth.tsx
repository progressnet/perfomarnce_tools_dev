import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AuthSplitLayout } from 'src/layouts/auth-split';

import { SplashScreen } from 'src/components/loading-screen';


// ----------------------------------------------------------------------



const SSO = {
  SignInPage: lazy(() => import('src/pages/auth/sso/sign-in')),
};


// ----------------------------------------------------------------------


const authSSO = {
  path: 'sso',
  children: [
    {
      path: 'sign-in',
      element: (
        <AuthSplitLayout section={{ title: 'Hi, Welcome back' }}>
          <SSO.SignInPage />
        </AuthSplitLayout>
      ),
    },
  ]
}
export const authRoutes = [
  {
    path: '/FinanceFactoryTimesheet/auth',
    element: (
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    ),
    children: [
      authSSO,
    ],
  },
];
