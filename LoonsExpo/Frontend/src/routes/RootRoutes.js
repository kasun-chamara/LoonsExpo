import React from 'react'
import { Navigate } from 'react-router-dom'

import { DashboardRoutes as dashboardRoutes } from '../pages/Dashboard'
import { ExhibitionSetupRoutes as exhibitionSetupRoutes } from '../pages/ExhibitionSetup'
import { ExhibitorsRoutes as exhibitorsRoutes } from '../pages/Exhibitors'
import { SettingsRoutes as settingsRoutes } from '../pages/Settings'
import { VisitorRegistrationRoutes as visitorRegistrationRoutes } from '../pages/VisitorRegistration'

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
    ...exhibitionSetupRoutes,
    ...exhibitorsRoutes,
    ...settingsRoutes,
    ...visitorRegistrationRoutes,
    ...themeExamplesRoutes,
    ...errorRoute,
    { path: '*', component: () => <Navigate to="/session/404" replace /> },
]

export default routes
