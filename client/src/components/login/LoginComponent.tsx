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
import React, { useState, KeyboardEvent } from 'react';
import axiosInstance from '../../axios/AxiosInstance';
import LoginResponse from './models/LoginResponse';
import globalRouter from '../../globalRouter';
import { useNavigate } from 'react-router-dom';

const LoginComponent: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const [showErrorAccept, setShowErrorAccept] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      Login();
    }
  };

  const Login = async () => {
    const response = await axiosInstance.post<LoginResponse>('/login', {
      email,
      password,
    });
    if (response.status === 200) {
      setShowSuccessMessage(true);

      localStorage.setItem('TOKEN', response.data.token);
      localStorage.setItem('USERNAME', response.data.name);

      navigate('/');

      if (globalRouter.navigate) globalRouter.navigate('/');
    } else {
      setShowErrorMessage(true);
    }
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
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
        }}
      >
        <Card>
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <TextField
              id="loginEmail"
              label="Email"
              variant="outlined"
              type="email"
              required
              onChange={(event) => setEmail(event.target.value)}
            ></TextField>
            <TextField
              id="loginPassword"
              label="Lösenord"
              variant="outlined"
              type="password"
              required
              onKeyPress={handleKeyPress}
              onChange={(event) => setPassword(event.target.value)}
            ></TextField>
            <CardActions
              sx={{
                justifyContent: 'flex-end',
              }}
            >
              <Button variant="contained" color="primary" onClick={Login}>
                Logga in
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      </Box>
      <Snackbar
        open={showErrorMessage}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert severity="error" onClose={handleClose}>
          Fel användarnamn eller lösenord.
        </Alert>
      </Snackbar>
      <Snackbar
        open={showSuccessMessage}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert severity="success" onClose={handleClose}>
          Lyckad inloggning!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default LoginComponent;
