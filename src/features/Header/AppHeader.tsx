import { useAuth0 } from '@auth0/auth0-react';
import { LiveTvOutlined } from '@mui/icons-material';
import { AppBar, Box, Link, Toolbar, Typography } from '@mui/material';
import { type ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { AuthSection } from './AppSection';

export const AppHeader = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <AppBar>
      <Toolbar>
        <LiveTvOutlined sx={{ mr: 2 }} />
        <Typography variant="h6" color="inherit" noWrap>
          The Movies DB
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <nav>
            <HeaderLink to="/">Home</HeaderLink>
            <HeaderLink to="/movies">Movies</HeaderLink>
            <HeaderLink to="/extra">Extra</HeaderLink>
            {isAuthenticated && (
              <HeaderLink to="/protected">Protected</HeaderLink>
            )}
            <HeaderLink to="/about">About</HeaderLink>
          </nav>
        </Box>
        <AuthSection />
      </Toolbar>
    </AppBar>
  );
};

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
