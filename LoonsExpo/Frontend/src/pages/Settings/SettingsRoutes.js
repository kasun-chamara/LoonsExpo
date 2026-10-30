import { authRoleAccess } from 'auth/AuthRoleAccess'
import { lazy } from 'react'

const Settings = lazy(() => import('./Settings'))

const settingsRoutes = [
    {
        path: '/settings',
        component: Settings,
        auth: authRoleAccess.dashborad,
    },
]

export default settingsRoutes
