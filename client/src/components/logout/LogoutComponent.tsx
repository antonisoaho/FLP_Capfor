// LogoutComponent.jsx
import React, { useEffect, useState } from 'react';
import { Logout } from '../../axios/AxiosInstance';
import { Alert, Container, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { snackbarState, userRoleState } from '../../recoil/RecoilAtoms';

const LogoutComponent = () => {
  const navigate = useNavigate();
  const setLoginState = useSetRecoilState(userRoleState);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(true);
  const setSnackbarState = useSetRecoilState(snackbarState);
  useEffect(() => {
    setLoginState({ loggedIn: false, isAdmin: false });

    setSnackbarState({
      open: true,
      message: 'Utloggning lyckades.',
      severity: 'info',
    });
    Logout();
    setTimeout(() => {
      navigate('/');
    }, 1200);
  }, []);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setShowSuccessMessage(false);
  };

  return <Container></Container>;
};

export default LogoutComponent;
