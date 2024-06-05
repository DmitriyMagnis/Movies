import { createContext } from 'react';

export interface AuthInfo {
  user: {
    name: string;
  };
}

export const anonimousUser = {
  name: 'anonimous',
};

export const AuthContext = createContext<AuthInfo>({ user: anonimousUser });
