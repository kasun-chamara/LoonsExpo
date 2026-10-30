import React from 'react'
import { Navigate } from 'react-router-dom'

import { DashboardRoutes as dashboardRoutes } from '../pages/Dashboard'

const redirectRoute = [
    {
        path: '/',
        exact: true,
        component: () => <Navigate to="/dashboard" />,
    },
]

const errorRoute = [
    {
        component: () => <Navigate to="/session/404" replace />,
    },
]

const themeExamplesRoutes =
    process.env.NODE_ENV === 'production'
        ? []
        : require('../pages/ThemeComponentsexamples/ThemeExamplesRoutes').default

const routes = [
    ...redirectRoute,
    ...dashboardRoutes,
    ...themeExamplesRoutes,
    ...errorRoute,
    { path: '*', component: () => <Navigate to="/session/404" replace /> },
]

export default routes
