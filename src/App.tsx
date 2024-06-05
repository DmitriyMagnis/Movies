import {
  AppBar,
  CssBaseline,
  Link,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from '@mui/material';
import { type ReactNode } from 'react';

import { LiveTvOutlined } from '@mui/icons-material';
import { teal } from '@mui/material/colors';
import { Outlet, Link as RouterLink } from 'react-router-dom';

const HeaderLink = ({ children, to }: { to: string; children: ReactNode }) => {
  return (
    <Link
      component={RouterLink}
      to={to}
      variant="button"
      color="inherit"
      sx={{ my: 1, mx: 1.5 }}
    >
      {children}
    </Link>
  );
};

const defaultTheme = createTheme({
  palette: {
    primary: teal,
    secondary: {
      main: '#96000f',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar>
        <Toolbar>
          <LiveTvOutlined sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            The Movies DB
          </Typography>
          <nav>
            <HeaderLink to="/">Home</HeaderLink>

            <HeaderLink to="/movies">Movies</HeaderLink>

            <HeaderLink to="/about">About</HeaderLink>
          </nav>
        </Toolbar>
      </AppBar>
      <main>
        <Outlet />
      </main>
    </ThemeProvider>
  );
}

export default App;
