import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { DashboardLayout } from 'src/layouts/dashboard';
import DashboardMytasks from "src/pages/dashboard/my-tasks";

import { LoadingScreen } from 'src/components/loading-screen';

import {SSOGuard} from "../../auth/guard/sso-guard";
import MyReports from "../../pages/dashboard/my-reports";
import LeaveRequests from "../../pages/dashboard/leave-requests";

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
      }
      ,{
        path: 'leave-requests',
        element: <LeaveRequests />,
      },
      {
        path: 'my-reports',
        element: <MyReports/>,
      },

    ],
  },
];
