import React from 'react';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Route, Routes, Link } from 'react-router-dom';
import HomeComponent from './components/home/HomeComponent';
import LoginComponent from './components/login/LoginComponent';
import UserComponent from './components/users/UserComponents';
import ResponsiveAppBar from './components/navbar/NavbarComponent';

function App() {
  return (
    <div className="App">
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<HomeComponent />}></Route>
        <Route path="login" element={<LoginComponent />}></Route>
        <Route path="users" element={<UserComponent />}></Route>
      </Routes>
    </div>
  );
}

export default App;
