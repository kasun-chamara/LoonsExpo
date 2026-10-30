import React, { createContext, useContext, useState } from 'react'

const SettingsContext = createContext()

export const useSettings = () => {
    const context = useContext(SettingsContext)
    if (!context) {
        throw new Error('useSettings must be used within a SettingsProvider')
    }
    return context
}

export const SettingsProvider = ({ children }) => {
    const [settings, setSettings] = useState({
        sidebarCollapsed: false,
        language: 'en',
        notifications: true,
    })

    const updateSettings = (newSettings) => {
        setSettings(prev => ({ ...prev, ...newSettings }))
    }

    const value = {
        settings,
        updateSettings,
    }

    return (
        <SettingsContext.Provider value={value}>
            {children}
        </SettingsContext.Provider>
    )
}
