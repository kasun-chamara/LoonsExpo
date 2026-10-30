import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import MainLayout from './MainLayout'
import RootRoutes from '../../routes/RootRoutes'
import ProtectedRoute from '../../auth/ProtectedRoute'
import CenteredSpinner from '../CenteredSpinner'

const LoonsLayout = () => {
    return (
        <MainLayout>
      <Routes>
        {RootRoutes.map((route, i) => (
          <Route
            key={i}
            path={route.path}
            element={
              <ProtectedRoute requiredRoles={route.auth || []}>
                <Suspense fallback={<CenteredSpinner />}>
                  <div style={{ zoom: 0.9 }}>
                    <route.component />
                  </div>
                </Suspense>
              </ProtectedRoute>
            }
          />
        ))}
      </Routes>
        </MainLayout>
    )
}

export default LoonsLayout
