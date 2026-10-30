import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import AppContext from './contexts/AppContext'
import routes from './routes/RootRoutes'
import { Store } from './redux/Store'
import GlobalCss from './styles/GlobalCss'
import LoonsSuspense from './components/themeFiles/LoonsSuspense'
import LoonsLayout from './components/themeFiles/LoonsLayout'
import { AuthRoutes as sessionRoutes } from './pages/auth'
import PublicRoutes from './routes/PublicRoutes'
import AuthGuard from './auth/AuthGuard'
import { SettingsProvider } from './contexts/SettingsContext'
import LoonsTheme from 'components/themeFiles/LoonsTheme'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

window.dashboardVariables = {}



const AppRoutes = () => {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      {/* AUTHENTICATION PAGES (SIGNIN, SIGNUP ETC.) */}
      {sessionRoutes.map((item, i) => (
        <Route
          key={i}
          path={item.path}
          element={<item.component />}
        />
      ))}
      {PublicRoutes.map((item, i) => (
        <Route
          key={i}
          path={item.path}
          element={<item.component />}
        />
      ))}
      {/* AUTH PROTECTED DASHBOARD PAGES */}
      <Route
        path="/*"
        element={
          <AuthGuard>
            <LoonsLayout />
          </AuthGuard>
        }
      />
    </Routes>
  );
};

const App = () => {
    return (
        <AppContext.Provider value={{ routes }}>
            <Provider store={Store}>
                <SettingsProvider>
                    <LoonsTheme>
                        <GlobalCss />
                        <ToastContainer
                            position="top-right"
                            autoClose={4000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="colored"
                        />
                        <Router>
                            <LoonsSuspense>
                                <AppRoutes />
                            </LoonsSuspense>
                        </Router>
                    </LoonsTheme>
                </SettingsProvider>
            </Provider>
        </AppContext.Provider>
    )
}

export default App
