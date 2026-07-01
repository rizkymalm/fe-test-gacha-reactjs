import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import IconSquare from '../../assets/icon-dark.png';
import { sidebarConfig } from './SidebarConfig';

const DashboardSidebarCollapse = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [accordion, setAccordion] = useState('');
    const handleSubmenuAccordion = (path: string) => {
        setAccordion(path);
    };
    return (
        <div>
            <img
                src={IconSquare}
                alt="Logo"
                className="mx-auto my-2 w-8/12 max-w-20"
            />

            <div className="flex">
                <ul className="w-full list-none p-4">
                    {sidebarConfig.map(
                        item =>
                            item.type === 'menu' && (
                                <li
                                    className={`relative my-2 flex cursor-pointer justify-center rounded-md p-2 ${location.pathname === item.pathMatch && 'bg-accent-light/40 dark:bg-accent-dark/40'} text-text-light-primary hover:bg-accent-light/20 dark:text-text-dark-primary hover:dark:bg-accent-dark/20`}
                                    key={item.pathMatch}
                                >
                                    <div
                                        className="flex w-full"
                                        onClick={() =>
                                            item.link && !item.submenu
                                                ? navigate(item.link)
                                                : item.link && item.submenu
                                                  ? handleSubmenuAccordion(
                                                        item.pathMatch ===
                                                            accordion
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
                                            width="28"
                                            height="28"
                                        />
                                    </div>
                                    {item.submenu && (
                                        <Icon
                                            icon="mdi:keyboard-arrow-right"
                                            width="20"
                                            height="20"
                                            className={`absolute inset-y-0 left-10 m-auto flex items-center justify-center ${accordion === item.pathMatch ? 'rotate-180' : ''}`}
                                        />
                                    )}
                                    {item.submenu && (
                                        <span
                                            className={`border-outset absolute left-16 top-0 flex overflow-hidden ${accordion === item.pathMatch ? 'w-50' : 'w-0'} ty-body-sm rounded-r-md bg-light-1 font-semibold shadow-custom-light transition-all duration-300 dark:bg-dark-1`}
                                        >
                                            <ul className="w-full">
                                                {item.submenu.map(subitem => (
                                                    <li
                                                        className={`flex whitespace-nowrap px-4 py-2 hover:bg-accent-light/20 hover:dark:bg-accent-dark/20 ${location.pathname === subitem.pathMatch && 'bg-accent-light/40 dark:bg-accent-dark/40'}`}
                                                        key={subitem.link}
                                                        onClick={() =>
                                                            navigate(
                                                                subitem.link
                                                            )
                                                        }
                                                    >
                                                        {subitem.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        </span>
                                    )}
                                </li>
                            )
                    )}
                </ul>
            </div>
        </div>
    );
};

export default DashboardSidebarCollapse;
