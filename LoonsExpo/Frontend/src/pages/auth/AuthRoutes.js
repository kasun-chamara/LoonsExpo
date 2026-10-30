import { lazy } from 'react'

const Login = lazy(() => import('./Login'))
const SignUp = lazy(() => import('./SignUp'))
const NotFound = lazy(() => import('./NotFound'))
const compliteRegistration = lazy(() => import('./CompleteRegistration'))
const authRoutes = [
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/signup',
        component: SignUp,
    },
    {
        path: '/session/404',
        component: NotFound,
    },
    {
        path: '/complete_registration',
        component: compliteRegistration,
    },
]

export default authRoutes
