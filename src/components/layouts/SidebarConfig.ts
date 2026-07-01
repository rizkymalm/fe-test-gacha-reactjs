export const sidebarConfig = [
    {
        name: 'Dashboard',
        icon: 'mdi:view-dashboard-outline',
        link: '/dashboard',
        pathMatch: '/dashboard',
        type: 'menu',
        submenu: [
            {
                name: 'Revenue',
                link: '/dashboard/revenue',
                pathMatch: '/dashboard/revenue',
                type: 'menu',
            },
            {
                name: 'E-Commerce',
                link: '/dashboard/ecommerce',
                pathMatch: '/dashboard/ecommerce',
                type: 'menu',
            },
            {
                name: 'Game',
                link: '/dashboard/game',
                pathMatch: '/dashboard/game',
                type: 'menu',
            },
            {
                name: 'Health',
                link: '/dashboard/health',
                pathMatch: '/dashboard/health',
                type: 'menu',
            },
        ],
    },
    {
        name: 'Charts & Maps',
        icon: 'mdi:chart-finance',
        link: '/charts',
        pathMatch: '/charts',
        type: 'menu',
        submenu: [
            {
                name: 'Line Charts',
                link: '/charts/line',
                pathMatch: '/charts/line',
                type: 'menu',
            },
            {
                name: 'Column Charts',
                link: '/charts/column',
                pathMatch: '/charts/column',
                type: 'menu',
            },
            {
                name: 'Bar Charts',
                link: '/charts/bar',
                pathMatch: '/charts/bar',
                type: 'menu',
            },
            {
                name: 'Pie & Donut Charts',
                link: '/charts/pie-donut',
                pathMatch: '/charts/pie-donut',
                type: 'menu',
            },
        ],
    },
    {
        name: 'Layouts',
        icon: 'mdi:view-grid-outline',
        link: '/layouts',
        pathMatch: '/layouts',
        type: 'menu',
    },
    {
        name: 'Apps & Wigets',
        type: 'header',
    },
    {
        name: 'Email',
        icon: 'mdi:email-outline',
        link: '/email',
        pathMatch: '/email',
        type: 'menu',
    },
    {
        name: 'Calendar',
        icon: 'mdi:calendar-month-outline',
        link: '/calendar',
        pathMatch: '/calendar',
        type: 'menu',
    },
    {
        name: 'Cards',
        icon: 'mdi:card-bulleted-outline',
        link: '/cards',
        pathMatch: '/cards',
        type: 'menu',
    },
    {
        name: 'Forms & Tables',
        type: 'header',
    },
    {
        name: 'Forms',
        icon: 'mdi:form-select',
        link: '/forms',
        pathMatch: '/forms',
        type: 'menu',
    },
    {
        name: 'Tables',
        icon: 'mdi:table-large',
        link: '/tables',
        pathMatch: '/tables',
        type: 'menu',
    },
    {
        name: 'Typography',
        icon: 'mdi:format-font',
        link: '/typography',
        pathMatch: '/typography',
        type: 'menu',
    },
    {
        name: 'Buttons & Icons',
        icon: 'mdi:gesture-tap-button',
        link: '/buttons-icons',
        pathMatch: '/buttons-icons',
        type: 'menu',
        submenu: [
            {
                name: 'Buttons',
                link: '/buttons-icons/buttons',
                pathMatch: '/buttons-icons/buttons',
                type: 'menu',
            },
            {
                name: 'Icons',
                link: '/buttons-icons/icons',
                pathMatch: '/buttons-icons/icons',
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
