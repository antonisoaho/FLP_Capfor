import React from 'react';
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

function App() {
  const navigate = useNavigate();
  globalRouter.navigate = navigate;

  return (
    <div className="App">
      <ResponsiveAppBar />
      <Routes>
        <Route path="/login" element={<LoginComponent />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomeComponent />
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
              <AccountComponent />
            </ProtectedRoute>
          }
        />
        {/* <Route path="/users" element={<ProtectedRoute><Route Component={UserComponent} /></ProtectedRoute>} />
        <Route path="/account" element={<ProtectedRoute><Route Component={AccountComponent} /></ProtectedRoute>} /> */}
      </Routes>
    </div>
  );
}

export default App;
