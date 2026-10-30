import { authRoleAccess } from "auth/AuthRoleAccess";

// `section` starts a new heading group in the sidebar; `iconPath` is the stroke path of a 24x24 icon.
export const navigationItems = [
  {
    section: 'Overview',
    title: 'Dashboard',
    path: '/dashboard',
    iconPath: 'M4 4h7v7H4zM13 4h7v7h-7zM4 13h7v7H4zM13 13h7v7h-7z',
    roles: authRoleAccess.dashborad,
  },
  {
    section: 'Event',
    title: 'Exhibition setup',
    path: '/exhibition-setup',
    iconPath: 'M4 7h10M18 7h2M4 17h2M10 17h10M14 5v4M8 15v4',
    roles: authRoleAccess.dashborad,
  },
  {
    title: 'Manage exhibitors',
    iconPath: 'M3 21h18M5 21V8l7-4 7 4v13M9 21v-6h6v6',
    submenu: [
      { title: 'Add exhibitor', path: '/exhibitors/add', roles: authRoleAccess.dashborad },
      { title: 'Existing exhibitors', path: '/exhibitors', roles: authRoleAccess.dashborad },
    ],
  },
  {
    title: 'Visitor registration',
    path: '/visitor-registration',
    iconPath: 'M7 3h10v18H7zM10 8h4M10 12h4M10 16h2',
    roles: authRoleAccess.dashborad,
  },
  {
    title: 'Tickets',
    path: '/tickets',
    iconPath: 'M3 9V7h18v2a2 2 0 000 6v2H3v-2a2 2 0 000-6zM14 7v10',
    roles: authRoleAccess.dashborad,
  },
  {
    section: 'People',
    title: 'Expo Portal setup',
    path: '/expo-portal',
    iconPath: 'M3 5h18v14H3zM8 11a2 2 0 100-4 2 2 0 000 4zM5.5 16c.5-2 5-2 5 0M14 10h4M14 14h4',
    roles: authRoleAccess.dashborad,
  },
  {
    title: 'Connect with Exhibitor',
    path: '/connect',
    iconPath: 'M4 13v-1a8 8 0 0116 0v1M4 13h3v5H4zM17 13h3v5h-3zM20 18v1a3 3 0 01-3 3h-3',
    roles: authRoleAccess.dashborad,
  },
  {
    section: 'Business',
    title: 'Finance',
    path: '/finance',
    iconPath: 'M4 7h15v12H4zM4 7l12-3v3M15 13h2',
    roles: authRoleAccess.dashborad,
  },
  {
    title: 'Settings',
    path: '/settings',
    iconPath: 'M12 15a3 3 0 100-6 3 3 0 000 6zM12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1',
    roles: authRoleAccess.dashborad,
  },
];
