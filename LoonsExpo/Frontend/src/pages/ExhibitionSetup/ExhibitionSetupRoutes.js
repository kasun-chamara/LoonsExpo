import { authRoleAccess } from 'auth/AuthRoleAccess'
import { lazy } from 'react'

const ExhibitionSetup = lazy(() => import('./ExhibitionSetup'))

const exhibitionSetupRoutes = [
    {
        path: '/exhibition-setup',
        component: ExhibitionSetup,
        auth: authRoleAccess.dashborad,
    },
]

export default exhibitionSetupRoutes
