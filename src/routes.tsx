import { useSelector } from 'react-redux';
import { Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from './components/layouts/DashboardLayout';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import type { Reducers } from './redux/types';
// layouts

// ----------------------------------------------------------------------

export default function Router() {
    const authState = useSelector((state: Reducers) => state.auth);
    return useRoutes([
        {
            path: '/',
            children: [
                {
                    path: '',
                    element: authState?.login?.isLogin ? (
                        <DashboardLayout />
                    ) : (
                        <Navigate to="login" />
                    ),
                    children: [
                        {
                            path: 'dashboard',
                            element: 'dashboard',
                        },
                    ],
                },
                {
                    path: 'login',
                    element: authState?.login?.isLogin ? (
                        <Navigate to="/dashboard" />
                    ) : (
                        <Login />
                    ),
                },
                { path: '404', element: <NotFound /> },
                { path: '*', element: <Navigate to="/404" /> },
            ],
        },
        { path: '*', element: <Navigate to="/404" replace /> },
    ]);
}
