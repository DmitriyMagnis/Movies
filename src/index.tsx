import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { LinearProgress } from '@mui/material';
import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import { ErrorBoundary } from './ErrorBoundary';
import AuthCallback from './auth/AuthCallback';
import { AuthenticatedGuard } from './auth/AuthenticatedGuard';
import { CustomAuthProvider } from './auth/CustomAuthProvider';
import About from './features/About/About';
import { Extra } from './features/Extra/Extra';
import { Home } from './features/Home/Home';
import { Profile } from './features/Profile/Profile';
import reportWebVitals from './reportWebVitals';
import store from './store';

const AppEntryPoint = () => {
  return (
    <CustomAuthProvider>
      <Provider store={store}>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </Provider>
    </CustomAuthProvider>
  );
};
const Movies = lazy(() => import('./features/Movies/Movies'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppEntryPoint />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/profile',
        element: <AuthenticatedGuard component={Profile} />,
      },
      {
        path: '/extra',
        element: <Extra />,
      },
      {
        path: '/callback',
        element: <AuthCallback />,
      },
      {
        path: '/movies',
        element: (
          <Suspense fallback={<LinearProgress sx={{ mt: 10 }} />}>
            <Movies />
          </Suspense>
        ),
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
