// LogoutComponent.jsx
import React, { useEffect, useState } from 'react';
import { Logout } from '../../axios/AxiosInstance';
import { Alert, Container, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LogoutComponent = () => {
  const navigate = useNavigate();
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(true);

  useEffect(() => {
    Logout();
    setTimeout(() => {
      navigate('/');
    }, 1200);
  }, []);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setShowSuccessMessage(false);
  };

  return (
    <Container>
      <Snackbar
        open={showSuccessMessage}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert severity="success" onClose={handleClose}>
          Logged out sucessfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default LogoutComponent;
