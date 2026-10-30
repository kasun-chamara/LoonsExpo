import { lazy } from 'react'
const NotFound = lazy(() => import('./NotFound'))
const NotFoundRoutes = [
    {
        path: '/session/404',
        component: NotFound,
    },
]

export default NotFoundRoutes
