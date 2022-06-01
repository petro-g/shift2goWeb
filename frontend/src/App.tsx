import React, { FunctionComponent } from 'react';
import { ThemeProvider } from 'styled-components';

import GlobalStyle from '@styles/global';
import theme from '@styles/theme';
import '@styles/app.scss';
import AppRoutes from '@utils/routes'

const App: FunctionComponent = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppRoutes />
      <GlobalStyle />
    </ThemeProvider>
  );
};

export default App;
