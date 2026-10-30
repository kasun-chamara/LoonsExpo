import { authRoleAccess } from "auth/AuthRoleAccess";
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';

export const navigationItems = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <GridViewOutlinedIcon />,
    roles: authRoleAccess.dashborad,
  }

/*   {
    title: 'Incidents',
    icon: <WarningAmberOutlinedIcon />,
    submenu: [
      {
        title: 'Incidents',
        path: '/incidents',
        roles: authRoleAccess.all_incidents_view,
      },
      {
        title: 'Create Incident',
        path: '/create_incidents',
        roles: authRoleAccess.all_incidents_view,
      }
    ],

  }, */

  /* {
    title: 'Documentation',
    path: '/themes/examples',
    icon: <GridViewOutlinedIcon />,
    roles: authRoleAccess.themeExamples,
  }, */

];
