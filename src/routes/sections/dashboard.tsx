import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { DashboardLayout } from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import TestPage from "../../pages/dashboard/test";
import {SSOGuard} from "../../auth/guard/sso-guard";
import {MyTasksLayout} from "../../sections/mytasks/layout";
import MyTasksProcess from "../../pages/dashboard/my-tasks/process";

import MyTasksEntities from "../../pages/dashboard/my-tasks/entities";
import {MyTasksSubProcessView} from "../../sections/mytasks/subProcesses";

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
        element: <MyTasksLayout />,
        children: [
          { path: 'process', element: <MyTasksProcess /> },
          { path:'subprocess', element: <MyTasksSubProcessView/> },
          { path:'task', element: <MyTasksSubProcessView/> },
          { path: 'entities', element: <MyTasksEntities /> },
        ],
      },
      { path: 'test', element: <TestPage /> },
    ],
  },
];
