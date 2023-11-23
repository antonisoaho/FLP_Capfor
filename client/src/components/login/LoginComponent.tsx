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
import React, { useState } from 'react';
import axiosInstance from '../../axios/AxiosInstance';
import { AxiosResponse } from 'axios';
import LoginResponse from './models/LoginResponse';
import globalRouter from '../../globalRouter';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
const cookies = new Cookies();


function LoginComponent() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);

  const navigate = useNavigate();

  const Login = async () => {
    const response = await axiosInstance.post<LoginResponse>('/login', {
      email,
      password,
    });
    if (response.status === 200) {
      setShowSuccessMessage(true);
      cookies.set("TOKEN", response.data.token, {
        path: "/",
      });
      
      navigate("/")

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
              label="Password"
              variant="outlined"
              type="password"
              required
              onChange={(event) => setPassword(event.target.value)}
            ></TextField>
            <CardActions
              sx={{
                justifyContent: 'flex-end',
              }}
            >
              <Button variant="outlined" color="primary" onClick={Login}>
                Login
              </Button>
              <Button variant="outlined" color="secondary">
                Create user
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
          Invalid email or password!
        </Alert>
      </Snackbar>
      <Snackbar
        open={showSuccessMessage}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert severity="success" onClose={handleClose}>
          Logged in sucessfully!
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default LoginComponent;
