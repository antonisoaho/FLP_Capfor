import React, { useEffect, useState } from 'react';
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
import axiosInstance, { Logout } from './axios/AxiosInstance';
import { CircularProgress } from '@mui/material';
import CustomerComponent from './components/customers/CustomerComponent';
import { useSetRecoilState } from 'recoil';
import { userRoleState } from './recoil/RecoilAtoms';
import SnackbarComponent from './components/snackbar/SnackbarComponent';

const App = () => {
  const navigate = useNavigate();
  globalRouter.navigate = navigate;
  const [loading, setLoading] = useState<boolean>(true);
  const setUserRole = useSetRecoilState(userRoleState);

  useEffect(() => {
    const checkUserLogin = async () => {
      if (localStorage.getItem('TOKEN')) {
        try {
          const userRoleData = await axiosInstance.get('users/getme');
          setUserRole({ loggedIn: true, isAdmin: userRoleData.data.isAdmin });
        } catch (error) {
          Logout();
        }
      }
      setLoading(false);
    };

    checkUserLogin();
  }, []);

  return (
    <ThemeProvider>
      <div className="App">
        {loading ? (
          <>
            <CircularProgress></CircularProgress>
          </>
        ) : (
          <>
            <SnackbarComponent />
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
                path="/customers"
                element={
                  <ProtectedRoute>
                    <CustomerComponent />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/account"
                element={
                  <ProtectedRoute>
                    <AccountComponent />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default App;
