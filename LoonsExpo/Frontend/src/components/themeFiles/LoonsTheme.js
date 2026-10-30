import React from 'react'
import { useSelector } from 'react-redux'
import { ThemeProvider } from '@mui/material/styles'
import { lightTheme, darkTheme } from '../../theme'

const LoonsTheme = ({ children }) => {
    const { isDarkMode } = useSelector(state => state.theme)
    const themeObj = isDarkMode ? darkTheme : lightTheme

    return <ThemeProvider theme={themeObj}>{children}</ThemeProvider>
}

export default LoonsTheme
