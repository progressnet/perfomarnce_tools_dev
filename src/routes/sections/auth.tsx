import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AuthSplitLayout } from 'src/layouts/auth-split';

import { SplashScreen } from 'src/components/loading-screen';


// ----------------------------------------------------------------------



const SSO = {
  SignInPage: lazy(() => import('src/pages/auth/sso/sign-in')),
};


// ----------------------------------------------------------------------

const mode = import.meta.env.VITE_SERVER_MODE;

const SSOElement = () => {
  if(mode === 'development') {
    return (
      <AuthSplitLayout section={{ title: 'Hi, Welcome back' }}>
        <SSO.SignInPage />
      </AuthSplitLayout>
    );
  }
    return (
      <SSO.SignInPage />
    )


}
const authSSO = {
  path: 'sso',
  children: [
    {
      path: 'sign-in',
      element: (
       <SSOElement />
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
