import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './core/GlobalStyles.global';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './navigation/AppRoutes';
import { CategoryProvider } from './context/CategoryContext';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CategoryProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </CategoryProvider>
    </ThemeProvider>
  );
}

export default App;
