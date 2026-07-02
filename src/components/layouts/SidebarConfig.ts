interface PropSubmenu {
    name: string;
    link: string;
    pathMatch: string;
    type: string;
}

interface PropSidebar {
    name: string;
    icon: string;
    link: string;
    pathMatch: string;
    type: string | 'menu' | 'header';
    submenu?: PropSubmenu[];
}

export const sidebarConfig: PropSidebar[] = [
    {
        name: 'Dashboard',
        icon: 'mdi:view-dashboard-outline',
        link: '/dashboard',
        pathMatch: '/dashboard',
        type: 'menu',
    },
    {
        name: 'Gacha',
        icon: 'ph:treasure-chest',
        link: '/gacha',
        pathMatch: '/gacha',
        type: 'menu',
    },
];

export const menuProfile = [
    {
        name: 'Profile',
        link: '/profile',
        icon: 'mdi:account-circle-outline',
    },
    {
        name: 'Settings',
        link: '/settings',
        icon: 'mdi:cog-outline',
    },
];
