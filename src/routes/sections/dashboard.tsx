import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { DashboardLayout } from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import TestPage from "../../pages/dashboard/test";
import {SSOGuard} from "../../auth/guard/sso-guard";
import HomePage from "../../pages/home";

// ----------------------------------------------------------------------
const CalendarPage = lazy(() => import('src/pages/dashboard/calendar'));
// ----------------------------------------------------------------------

const layoutContent = (
  <DashboardLayout>
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  </DashboardLayout>
);

export const dashboardRoutes = [
  {
    path: `/dashboard`,
    // element: CONFIG.auth.skip ? <>{layoutContent}</> : <AuthGuard>{layoutContent}</AuthGuard>,
    element: <SSOGuard>{layoutContent}</SSOGuard>,
    children: [
      { element:  <CalendarPage />,  index: true },
      { path: 'test', element: <TestPage /> },
    ],
  },  {
    path: 'FinanceFactoryTimesheet',
    element: <CalendarPage/>,
  },
];
