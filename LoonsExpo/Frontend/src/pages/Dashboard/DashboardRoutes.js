import { authRoleAccess } from 'auth/AuthRoleAccess'
import { lazy } from 'react'

const Dashboard = lazy(() => import('./Dashboard'))
const Profile = lazy(() => import('../Profile'))

const dashboardRoutes = [
    {
        path: '/dashboard',
        component: Dashboard,
        auth: authRoleAccess.dashborad,
    },
    {
        path: '/profile',
        component: Profile,
        auth: authRoleAccess.profile,
    },
]

export default dashboardRoutes
