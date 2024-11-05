import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { DashboardLayout } from 'src/layouts/dashboard';
import DashboardMytasks from "src/pages/dashboard/my-tasks";

import { LoadingScreen } from 'src/components/loading-screen';

import TestPage from "../../pages/dashboard/test";
import {SSOGuard} from "../../auth/guard/sso-guard";

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
    path: `/FinanceFactoryTimesheet/dashboard`,
    element: <SSOGuard>{layoutContent}</SSOGuard>,
    children: [
      { element:  <CalendarPage />,  index: true },
      {
        path: 'my-tasks',
        element: <DashboardMytasks />,
      },
      { path: 'test', element: <TestPage /> },
    ],
  },
];
