import { useSelector } from 'react-redux';
import { Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from './components/layouts/DashboardLayout';
import GachaPage from './pages/GachaPage';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import RedirectPage from './pages/RedirectPage';
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
                        {
                            path: 'gacha',
                            element: <GachaPage />,
                        },
                    ],
                },
                {
                    path: 'login',
                    element: <Login />,
                },
                {
                    path: 'login/redirect',
                    element: <RedirectPage />,
                },
                { path: '404', element: <NotFound /> },
                { path: '*', element: <Navigate to="/404" /> },
            ],
        },
        { path: '*', element: <Navigate to="/404" replace /> },
    ]);
}
