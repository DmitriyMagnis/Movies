import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { UserSettingsMenu } from './UserSettingsMenu';

export const AuthSection = () => {
  const navigate = useNavigate();
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();

  const onLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };
  const onLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: '/',
      },
    });
  };
  if (isAuthenticated && user) {
    return (
      <UserSettingsMenu
        user={user}
        onLogout={onLogout}
        onOpenProfile={() => navigate('/profile')}
      />
    );
  }
  return (
    <Button color="inherit" variant="outlined" onClick={onLogin}>
      Log in
    </Button>
  );
};
