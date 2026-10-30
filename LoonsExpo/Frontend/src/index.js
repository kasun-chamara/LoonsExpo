import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './styles/globle.css'
import './styles/buttonColors.css'
import './styles/fonts.css'
import PositioningGlobalStyles from './styles/PositioningGlobalStyles';
import SpacingGlobalStyles from './styles/SpacingGlobalStyles';
import ShadowGlobalStyles from './styles/ShadowGlobalStyles';
import BorderGlobalStyles from './styles/BorderGlobalStyles';
import AnimationGlobalStyles from 'styles/animations';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <PositioningGlobalStyles />
    <SpacingGlobalStyles />
    <ShadowGlobalStyles />
    <BorderGlobalStyles />
    <AnimationGlobalStyles />
    <App />
  </>
);
