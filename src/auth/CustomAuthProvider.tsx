import { Auth0Provider, type AppState } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import configuration from '../configuration';

interface CustomAuthProviderProps {
  children: React.ReactNode;
}

const authConfig = {
  domain: configuration.auth0Domain!,
  clientId: configuration.auth0ClientId!,
  authorizationParams: {
    redirect_uri: configuration.auth0RedirectUri,
  },
};

export const CustomAuthProvider = ({ children }: CustomAuthProviderProps) => {
  const navigate = useNavigate();
  const onRedirectCallback = (appState?: AppState) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      {...authConfig}
      cacheLocation="localstorage"
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};
