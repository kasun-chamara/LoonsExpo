import { authRoleAccess } from 'auth/AuthRoleAccess'
import { lazy } from 'react'

const VisitorRegistration = lazy(() => import('./VisitorRegistration'))

const visitorRegistrationRoutes = [
    {
        path: '/visitor-registration',
        component: VisitorRegistration,
        auth: authRoleAccess.dashborad,
    },
]

export default visitorRegistrationRoutes
