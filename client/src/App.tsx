import React, { useState } from 'react';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Route, Routes, useNavigate } from 'react-router-dom';
import globalRouter from './globalRouter';
import HomeComponent from './components/home/HomeComponent';
import LoginComponent from './components/login/LoginComponent';
import UserComponent from './components/users/UserComponents';
import ResponsiveAppBar from './components/navbar/NavbarComponent';
import AccountComponent from './components/account/AccountComponent';
import ProtectedRoute from './components/RouteComponents/ProtectedRoute';
import LogoutComponent from './components/logout/LogoutComponent';
import { ThemeProvider } from './theme/ThemeProvider';

const App = () => {
  const navigate = useNavigate();
  globalRouter.navigate = navigate;

  const [snackbarInfo, setSnackbarInfo] = useState({
    open: false,
    message: '',
    type: 'success',
    onClose: () => setSnackbarInfo((prev) => ({ ...prev, open: false })),
  });

  const showSnackbar = (message: string, type: 'success' | 'error' | 'info' | 'warning') => {
    setSnackbarInfo({
      open: true,
      message,
      type,
      onClose: () => setSnackbarInfo((prev) => ({ ...prev, open: false })),
    });
  };

  return (
    <ThemeProvider>
      <div className="App">
        <ResponsiveAppBar />

        <Routes>
          <Route path="/login" element={<LoginComponent />} />

          <Route path="/" element={<HomeComponent />} />
          <Route
            path="/logout"
            element={
              <ProtectedRoute>
                <LogoutComponent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRoute>
                <UserComponent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <AccountComponent showSnackbar={showSnackbar} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;
