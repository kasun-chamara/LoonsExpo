
import { authRoleAccess } from 'auth/AuthRoleAccess'
import { lazy } from 'react'

const ThemeExamples = lazy(() => import('./index'))

const ThemeExamplesRoutes = [
    {
        path: '/themes/examples',
        component: ThemeExamples,
        auth:authRoleAccess.themeExamples,
    },

]

export default ThemeExamplesRoutes
