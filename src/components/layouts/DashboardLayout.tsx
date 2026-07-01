import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { useTheme } from '../../contexts/themeProvider';
import { ButtonThemeSwitch } from '../buttons';
import DashboardSidebar from './DashboardSidebar';
import DashboardSidebarCollapse from './DashboardSidebarCollapse';
import { menuProfile } from './SidebarConfig';

export default function DashboardLayout() {
    const dispatch = useDispatch();
    const [toggleSidebar, setToggleSidebar] = useState<string>('expand');
    const [profileCard, setProfileCard] = useState(false);
    const handleSidebarToggle = () => {
        setToggleSidebar(prevState =>
            prevState === 'collapse' ? 'expand' : 'collapse'
        );
    };
    const handleProfileCard = () => {
        setProfileCard(!profileCard);
    };
    const handleLogout = () => {
        dispatch<any>({
            type: 'LOGOUT',
        });
    };
    const { theme, toggleTheme } = useTheme();
    return (
        <div className="relative flex min-h-screen max-w-full overflow-hidden bg-bg-light-1 transition-colors duration-300 dark:bg-bg-dark-1">
            <div className="bgGradient fixed inset-0 z-0 m-auto h-screen w-screen" />
            <div className="fixed right-0 top-5 z-99 my-auto h-[50px] w-[90px]">
                <ButtonThemeSwitch theme={theme} onClick={toggleTheme} />
            </div>
            <div
                className={`border-outset fixed inset-y-0 left-0 z-999 m-auto ${toggleSidebar === 'expand' ? 'w-60' : 'w-20'} border-r-2 border-accent-light/50 bg-bg-light-1 text-text-light-primary shadow-custom-light transition-all duration-300 dark:border-accent-dark/50 dark:bg-bg-dark-1 dark:text-text-dark-primary`}
            >
                {toggleSidebar === 'expand' ? (
                    <DashboardSidebar />
                ) : (
                    <DashboardSidebarCollapse />
                )}
                <div className="ty-body-sm absolute bottom-0 m-auto w-full p-4 text-center marker:rounded">
                    <div
                        className="relative z-99 flex w-full cursor-pointer rounded-full bg-accent-light transition-all duration-300 dark:bg-accent-dark"
                        onClick={handleProfileCard}
                        role="button"
                        tabIndex={0}
                    >
                        <div className="ty-body-lg flex size-12 cursor-pointer items-center justify-center px-4 font-bold text-text-light-primary">
                            RM
                        </div>
                        <div
                            className={`${toggleSidebar === 'expand' ? 'w-full pl-2 pr-4' : 'w-0 px-0'} flex grow flex-col items-start justify-center overflow-hidden text-text-light-primary`}
                        >
                            <h4 className="ty-body-sm font-semibold">Nama</h4>
                            <p className="text-text-xs font-medium">
                                email@email.com
                            </p>
                        </div>
                        {toggleSidebar === 'expand' && (
                            <div className="flex items-center px-2">
                                <Icon
                                    width="28"
                                    height="28"
                                    icon="mdi:keyboard-arrow-right"
                                    className={`${profileCard && 'rotate-180'} text-textlight-primary transition-all duration-300`}
                                />
                            </div>
                        )}
                    </div>
                    <div
                        className={`absolute -top-80 left-4 h-90 ${profileCard ? 'w-70 opacity-100' : 'w-0 opacity-0'} overflow-hidden rounded-md border-2 border-accent-dark/50 bg-white pb-6 shadow-custom-light transition-all duration-300 dark:bg-dark-1`}
                    >
                        <div className="relative h-25 w-full rounded-t-md bg-accent-dark">
                            <div className="absolute inset-x-0 -bottom-10 m-auto flex size-20 items-center justify-center rounded-full border-4 border-dark-1 bg-accent-dark">
                                <h2 className="ty-h4 font-bold">RM</h2>
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center pt-10">
                            <h2 className="ty-body-lg font-bold">
                                Rizki Malem
                            </h2>
                            <h2 className="text-text-xs font-light">
                                rizkymalm@gmail.com
                            </h2>
                        </div>
                        <nav className="py-4">
                            <ul className="w-full">
                                {menuProfile.map(item => (
                                    <li
                                        className="ty-body flex w-full cursor-pointer items-center px-4 py-2 text-left font-semibold text-text-light-primary transition-all duration-200 hover:bg-accent-light dark:text-text-dark-primary hover:dark:bg-accent-dark/20"
                                        key={item.name}
                                    >
                                        <Icon
                                            icon={item.icon}
                                            width="24"
                                            height="24"
                                            className="mr-4"
                                        />
                                        {item.name}
                                    </li>
                                ))}
                                <li
                                    className="ty-body flex w-full cursor-pointer items-center px-4 py-2 text-left font-semibold text-text-light-primary transition-all duration-200 hover:bg-accent-light dark:text-text-dark-primary hover:dark:bg-accent-dark/20"
                                    onClick={handleLogout}
                                >
                                    <Icon
                                        icon="mdi:logout"
                                        width="24"
                                        height="24"
                                        className="mr-4"
                                    />
                                    Logout
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
            <div
                className={`fixed ${toggleSidebar === 'expand' ? 'left-59' : 'left-18 hover:left-20'} inset-y-0 z-99 m-auto flex size-15 w-8 items-center justify-center transition-all duration-300`}
            >
                <Icon
                    icon={
                        toggleSidebar === 'collapse'
                            ? 'mdi:keyboard-arrow-right'
                            : 'mdi:keyboard-arrow-left'
                    }
                    width="32"
                    height="32"
                    className="cursor-pointer text-textlight-primary dark:text-textDarkPrimary"
                    onClick={() => handleSidebarToggle()}
                />
            </div>
            <div
                className={`relative z-1 ${toggleSidebar === 'expand' ? 'ml-60' : 'ml-20'} no-scrollbar min-h-screen flex-1 overflow-auto p-4 transition-all duration-300`}
            >
                <Outlet />
            </div>
        </div>
    );
}
