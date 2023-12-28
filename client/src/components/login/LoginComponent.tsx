import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Snackbar,
  TextField,
} from '@mui/material';
import React, { useState, KeyboardEvent, FormEvent } from 'react';
import axiosInstance, { ExtendedError } from '../../axios/AxiosInstance';
import LoginResponse from './models/LoginResponse';
import globalRouter from '../../globalRouter';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userRoleState } from '../../recoil/RecoilAtoms';

const LoginComponent: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const [showErrorAccept, setShowErrorAccept] = useState<boolean>(false);
  const setUserRole = useSetRecoilState(userRoleState);

  const navigate = useNavigate();

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission on Enter key
      Login();
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior
    Login();
  };

  const Login = async () => {
    try {
      const response = await axiosInstance.post<LoginResponse>('/login', {
        email,
        password,
      });
      if (response.status === 200) {
        setShowSuccessMessage(true);

        localStorage.setItem('TOKEN', response.data.token);
        localStorage.setItem('USERNAME', response.data.name);
        setUserRole({ loggedIn: true, isAdmin: response.data.isAdmin });
        navigate('/');

        if (globalRouter.navigate) globalRouter.navigate('/');
      } else {
        setShowErrorMessage(true);
      }
    } catch (error) {
      const extendedError = error as ExtendedError;
      if (extendedError.showSnackbar) {
        setShowErrorMessage(true);
      } else {
        console.error('Other error:', error);
      }
    }
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setShowErrorMessage(false);
    setShowSuccessMessage(false);
    setShowErrorAccept(false);
  };
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 12,
        }}>
        <Card>
          <form onSubmit={handleSubmit}>
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
              }}>
              <TextField
                id="loginEmail"
                label="Email"
                variant="outlined"
                autoComplete="admin"
                type="text"
                required
                onChange={(event) => setEmail(event.target.value)}></TextField>
              <TextField
                id="loginPassword"
                label="Lösenord"
                variant="outlined"
                type="password"
                autoComplete="current-password"
                required
                onKeyPress={handleKeyPress}
                onChange={(event) => setPassword(event.target.value)}></TextField>
              <CardActions
                sx={{
                  justifyContent: 'flex-end',
                }}>
                <Button variant="contained" color="primary" type="submit">
                  Logga in
                </Button>
              </CardActions>
            </CardContent>
          </form>
        </Card>
      </Box>
      <Snackbar open={showErrorMessage} autoHideDuration={4000} onClose={handleClose}>
        <Alert severity="error" onClose={handleClose}>
          Fel användarnamn eller lösenord.
        </Alert>
      </Snackbar>
      <Snackbar open={showSuccessMessage} autoHideDuration={4000} onClose={handleClose}>
        <Alert severity="success" onClose={handleClose}>
          Lyckad inloggning!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default LoginComponent;
