import { Navigate, useRoutes } from 'react-router-dom';

import { authRoutes } from './auth';
import HomePage from "../../pages/home";
import {CONFIG} from "../../config-global";
import { dashboardRoutes } from './dashboard';

// ----------------------------------------------------------------------


export function Router() {
  return useRoutes([
    {
      path: '/',
      // element: <Navigate to={CONFIG.auth.redirectPath} replace />,
      element: <Navigate to='/FinanceFactoryTimesheet' replace />,
      // element: <HomePage />,
    },
    // Auth
    ...authRoutes,
    // Dashboard
    ...dashboardRoutes,
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
