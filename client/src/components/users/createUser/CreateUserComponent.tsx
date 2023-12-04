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
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CreateUserModel from './models/CreateUserModel';
import axiosInstance from '../../../axios/AxiosInstance';

const CreateUserComponent: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [name, setName] = useState<string>('');

  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);

  const token = localStorage.getItem('TOKEN');
  const navigate = useNavigate();

  const CreateUser = async () => {
    if (password !== confirmPassword) {
      setShowErrorMessage(true);
      return;
    }
    const response = await axiosInstance.post<CreateUserModel>(
      '/users/createuser',
      {
        name,
        email,
        password,
        acceptedUser: token ? true : false,
      }
    );
    console.log(response);
    if (response.status === 201) {
      setShowSuccessMessage(true);

      navigate('/');
    } else {
      console.log(response);
      setShowErrorMessage(true);
    }
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      CreateUser();
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
              id="username"
              label="Namn"
              variant="outlined"
              type="email"
              required
              onChange={(event) => setName(event.target.value)}
            ></TextField>
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
              onChange={(event) => setPassword(event.target.value)}
            ></TextField>
            <TextField
              id="configrmLoginPassword"
              label="Repetera lösenord"
              variant="outlined"
              type="password"
              required
              onKeyPress={handleKeyPress}
              onChange={(event) => setConfirmPassword(event.target.value)}
            ></TextField>
            <CardActions
              sx={{
                justifyContent: 'flex-end',
              }}
            >
              <Button variant="outlined" color="primary" onClick={CreateUser}>
                Skapa konto
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
          Lösenorden du skrivit in matchar inte.
        </Alert>
      </Snackbar>
      <Snackbar
        open={showSuccessMessage}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert severity="success" onClose={handleClose}>
          Användare skapad - skickar dig vidare.
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CreateUserComponent;
