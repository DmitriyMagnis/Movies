import {
  CssBaseline,
  ThemeProvider,
  createTheme,
} from '@mui/material'

import { teal } from '@mui/material/colors'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { AppHeader } from './AppHeader'
import { AuthContext, anonimousUser, type AuthInfo } from './AuthContext'




const defaultTheme = createTheme({
  palette: {
    primary: teal,

    secondary: {
      main: '#96000f',
    },
  },
});

const fakeAuth: AuthInfo = {
  user: {
    name: 'Dmitriy'
  }
}

function App() {
  const [auth, setAuth] = useState<AuthInfo>({user: anonimousUser})
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AuthContext.Provider value={auth}>
        <AppHeader onLogin={() => setAuth(fakeAuth)} onLogout={() => setAuth({user: anonimousUser})}/>
        <main>
          <Outlet />
        </main>
      </AuthContext.Provider>
    </ThemeProvider>
  );
}

export default App;
