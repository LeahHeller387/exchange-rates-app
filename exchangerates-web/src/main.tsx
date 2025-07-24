import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import theme from './theme';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { CacheProvider } from '@emotion/react'; 
import createCache from '@emotion/cache';
import rtlPlugin from '@mui/stylis-plugin-rtl'; 

const rtlCache = createCache({
  key: 'muirtl',
  stylisPlugins: [rtlPlugin], 
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CacheProvider value={rtlCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </CacheProvider>
  </React.StrictMode>
);
