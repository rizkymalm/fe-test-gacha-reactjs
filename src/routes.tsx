import { useSelector } from 'react-redux';
import { Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from './components/layouts/DashboardLayout';
import EventAdminPage from './pages/admin/EventAdminPage';
import EventDetailPage from './pages/admin/EventDetailPage';
import HistoryAdminPage from './pages/admin/HistoryAdminPage';
import ItemAdminPage from './pages/admin/ItemAdminPage';
import UserAdminPage from './pages/admin/UserAdminPage';
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
                        {
                            path: 'admin',
                            element: authState?.role?.data?.role !==
                                'ADMIN' && <Navigate to="/" />,
                            children: [
                                {
                                    path: 'user',
                                    element: <UserAdminPage />,
                                },
                                {
                                    path: 'event',
                                    element: <EventAdminPage />,
                                },
                                {
                                    path: 'event/detail/:event',
                                    element: <EventDetailPage />,
                                },
                                {
                                    path: 'item',
                                    element: <ItemAdminPage />,
                                },
                                {
                                    path: 'history',
                                    element: <HistoryAdminPage />,
                                },
                            ],
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
