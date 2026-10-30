import { authRoleAccess } from 'auth/AuthRoleAccess'
import { lazy } from 'react'

const AddExhibitor = lazy(() => import('./AddExhibitor'))
const ExistingExhibitors = lazy(() => import('./ExistingExhibitors'))

const exhibitorsRoutes = [
    {
        path: '/exhibitors/add',
        component: AddExhibitor,
        auth: authRoleAccess.dashborad,
    },
    {
        path: '/exhibitors',
        component: ExistingExhibitors,
        auth: authRoleAccess.dashborad,
    },
]

export default exhibitorsRoutes
