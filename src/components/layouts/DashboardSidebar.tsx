import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import LogoRectangle from '../../assets/logo.png';
import { sidebarConfig } from './SidebarConfig';

const DashboardSidebar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [accordion, setAccordion] = useState('');
    const handleSubmenuAccordion = (path: string) => {
        setAccordion(path);
    };
    return (
        <div className="max-h-screen text-text-light-primary dark:text-text-dark-primary">
            <img
                src={LogoRectangle}
                alt="Logo"
                className="mx-auto my-2 w-9/12"
            />
            <nav className="no-scrollbar flex max-h-[80vh] overflow-y-auto">
                <ul className="w-full list-none p-4">
                    {sidebarConfig.map(item =>
                        item.type === 'menu' ? (
                            <li className="relative my-2" key={item.pathMatch}>
                                <div
                                    className={`flex w-full cursor-pointer justify-start gap-1 rounded-md p-2 align-middle ${location.pathname === item.pathMatch && 'bg-accent-light/40 dark:bg-accent-dark/40'} hover:bg-accent-light/20`}
                                    onClick={() =>
                                        item.link && !item.submenu
                                            ? navigate(item.link)
                                            : item.link && item.submenu
                                              ? handleSubmenuAccordion(
                                                    item.pathMatch === accordion
                                                        ? ''
                                                        : item.pathMatch
                                                )
                                              : null
                                    }
                                    role="button"
                                    tabIndex={0}
                                >
                                    <Icon
                                        icon={item.icon ? item.icon : ''}
                                        width="22"
                                        height="22"
                                        className="align-middle"
                                    />
                                    <div className="ty-body relative grow font-medium">
                                        {item.name}
                                        {item.submenu && (
                                            <Icon
                                                icon="mdi:keyboard-arrow-down"
                                                width="20"
                                                height="20"
                                                className={`absolute inset-y-0 right-0 m-auto flex items-center justify-center ${accordion === item.pathMatch ? 'rotate-180' : ''} `}
                                            />
                                        )}
                                    </div>
                                </div>

                                {item.submenu && (
                                    <div
                                        className={`col-span-6 ml-4 mt-2 cursor-pointer ${accordion === item.pathMatch ? 'block' : 'hidden'} overflow-hidden border-l-2 border-accent-dark`}
                                    >
                                        <ul className="w-full p-0">
                                            {item.submenu.map(subitem => (
                                                <li
                                                    className={`ty-body-sm rounded-r-md py-2 pl-8 hover:bg-accent-light/20 hover:dark:bg-accent-dark/20 ${location.pathname === subitem.pathMatch && 'bg-accent-light/40 dark:bg-accent-dark/40'}`}
                                                    onClick={() =>
                                                        navigate(subitem.link)
                                                    }
                                                    key={subitem.pathMatch}
                                                >
                                                    {subitem.name}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </li>
                        ) : (
                            <li className="ty-body-sm my-4 px-2 font-semibold uppercase tracking-wider text-textDarkSecondary dark:text-textDarkSecondary">
                                {item.name}
                            </li>
                        )
                    )}
                </ul>
            </nav>
        </div>
    );
};

export default DashboardSidebar;
