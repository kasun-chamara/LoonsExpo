import React, { lazy } from 'react'

// Public registration flow for visitors (no sign-in and no organiser layout).
const RegistrationFlow = lazy(() => import('../pages/VisitorRegistration/RegistrationFlow'))

const PublicRoutes = [
    {
        path: '/public',
        component: () => <div>Public Page</div>,
    },
    {
        path: '/register',
        component: RegistrationFlow,
    },
]

export default PublicRoutes
