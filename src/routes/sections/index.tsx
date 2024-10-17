import { Navigate, useRoutes } from 'react-router-dom';

import { authRoutes } from './auth';
import {CONFIG} from "../../config-global";
import { dashboardRoutes } from './dashboard';

// ----------------------------------------------------------------------


export function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Navigate to={CONFIG.auth.redirectPath} replace />,
    },   {
      path: '/FinanceFactoryTimesheet/',
      element: <Navigate to={CONFIG.auth.redirectPath} replace />,
    },
    ...authRoutes,
    ...dashboardRoutes,
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
