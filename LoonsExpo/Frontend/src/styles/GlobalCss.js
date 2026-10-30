import React from 'react'
import { GlobalStyles } from '@mui/material'

const GlobalCss = () => {
    return (
        <GlobalStyles
            styles={theme => ({
                '*': {
                    margin: 0,
                    padding: 0,
                    boxSizing: 'border-box',
                },
                html: {
                    WebkitFontSmoothing: 'antialiased',
                    MozOsxFontSmoothing: 'grayscale',
                    height: '100%',
                    width: '100%',
                },
                body: {
                    height: '100%',
                    width: '100%',
                },
                '#root': {
                   // height: '100%',
                    //width: '100%',
                    backgroundColor: theme.palette.background.default,
                },
                'input:-webkit-autofill': {
                    WebkitBoxShadow: '0 0 0 1000px white inset',
                },
            })}
        />
    )
}

export default GlobalCss
