interface PropSubmenu {
    name: string;
    link: string;
    pathMatch: string;
    type: string;
}

enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER',
}

interface PropSidebar {
    name: string;
    icon: string;
    link: string;
    pathMatch: string;
    type: string | 'menu' | 'header';
    submenu?: PropSubmenu[];
    category: UserRole[];
}

export const sidebarConfig: PropSidebar[] = [
    {
        name: 'Dashboard',
        icon: 'mdi:view-dashboard-outline',
        link: '/dashboard',
        pathMatch: '/dashboard',
        type: 'menu',
        category: [UserRole.ADMIN, UserRole.USER],
    },
    {
        name: 'Gacha',
        icon: 'ph:treasure-chest',
        link: '/gacha',
        pathMatch: '/gacha',
        type: 'menu',
        category: [UserRole.ADMIN, UserRole.USER],
    },
    {
        name: 'Admin',
        icon: 'ri:admin-line',
        link: '/admin',
        pathMatch: '/admin',
        type: 'menu',
        category: [UserRole.ADMIN],
        submenu: [
            // {
            //     name: 'User',
            //     link: '/admin/user',
            //     pathMatch: '/admin/user',
            //     type: 'menu',
            // },
            {
                name: 'Event',
                link: '/admin/event',
                pathMatch: '/admin/event',
                type: 'menu',
            },
            {
                name: 'Item',
                link: '/admin/item',
                pathMatch: '/admin/item',
                type: 'menu',
            },
            {
                name: 'History',
                link: '/admin/history',
                pathMatch: '/admin/history',
                type: 'menu',
            },
        ],
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
