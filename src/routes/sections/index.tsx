import { Navigate, useRoutes } from 'react-router-dom';

import Stack from "@mui/material/Stack";
import { authRoutes } from './auth';
import {CONFIG} from "../../config-global";
import { dashboardRoutes } from './dashboard';

// ----------------------------------------------------------------------


export function Router() {
  return useRoutes([
    // {
    //   path: '/',
    //   element: <Navigate to={CONFIG.auth.redirectPath} replace />,
    // },
    // {
    //   path: '/FinanceFactoryTimesheet/',
    //   element: <Navigate to={CONFIG.auth.redirectPath} replace />,
    // },
    {
      path: '/FinanceFactoryTimesheet/test',
      element: <Stack>TEST PAGE</Stack>,
    },
    ...authRoutes,
    ...dashboardRoutes,
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
