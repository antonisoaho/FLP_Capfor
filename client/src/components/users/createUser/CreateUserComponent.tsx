import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Snackbar,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import CreateUserModel from './models/CreateUserModel';
import axiosInstance from '../../../axios/AxiosInstance';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import axios from 'axios';

interface CreateUserComponentProps {
  onUserCreated: () => void;
}

const CreateUserComponent: React.FC<CreateUserComponentProps> = ({
  onUserCreated,
}) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [createAdmin, setCreateAdmin] = useState<boolean>(false);
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const CreateUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axiosInstance.post<CreateUserModel>(
        '/users/createuser',
        {
          name,
          email,
          password,
          createAdmin,
        }
      );

      if (response?.status === 201) {
        setShowSuccessMessage(true);
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setCreateAdmin(false);
        onUserCreated();
      } else {
        // Annat fel
        const errorMessage = 'Ett fel inträffade. Försök igen senare.';

        setErrorMessage(errorMessage);
        setShowErrorMessage(true);
      }
    } catch (error) {
      console.error('Oväntat fel:', error);

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          const errorMessage =
            error.response?.data.error || 'Email finns redan registrerad.';
          setErrorMessage(errorMessage);
        } else {
          setErrorMessage('Ett fel inträffade. Försök igen senare.');
        }

        setShowErrorMessage(true);
      } else {
        setErrorMessage('Kunde inte ansluta till servern.');
        setShowErrorMessage(true);
      }
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
    setErrorMessage('');
  };
  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{ padding: 0, paddingRight: 0, paddingLeft: 0 }}
    >
      <Box>
        <Card>
          <CardContent
            sx={{
              height: '100vh',
              width: 330,
            }}
          >
            <form
              id="newUser"
              name="newUserForm"
              onSubmit={CreateUser}
              style={{
                height: '100%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-end',
              }}
            >
              <FormControl sx={{ m: 0.5, width: '100%' }} variant="outlined">
                <InputLabel htmlFor="name">Namn</InputLabel>
                <OutlinedInput
                  id="name"
                  type="text"
                  value={name}
                  required
                  onChange={(event) => setName(event.target.value)}
                  label="Namn"
                  autoComplete="name"
                />
              </FormControl>
              <FormControl sx={{ m: 0.5, width: '100%' }} variant="outlined">
                <InputLabel htmlFor="email">Email</InputLabel>
                <OutlinedInput
                  id="email"
                  type="email"
                  value={email}
                  required
                  onChange={(event) => setEmail(event.target.value)}
                  label="Email"
                  autoComplete="email"
                />
              </FormControl>
              <FormControl sx={{ m: 0.5, width: '100%' }} variant="outlined">
                <InputLabel htmlFor="password">Lösenord</InputLabel>
                <OutlinedInput
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  required
                  onChange={(event) => setPassword(event.target.value)}
                  label="Lösenord"
                  autoComplete="new-password"
                />
              </FormControl>
              <FormControl sx={{ m: 0.5, width: '100%' }} variant="outlined">
                <InputLabel htmlFor="confirmPassword">
                  Repetera lösenord
                </InputLabel>
                <OutlinedInput
                  id="confirmPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  required
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  label="Repetera lösenord"
                  autoComplete="new-password"
                />
              </FormControl>
              <FormControl sx={{ m: 0.5, width: '100%' }}>
                <InputLabel id="role">Roll</InputLabel>
                <Select
                  labelId="role"
                  id="createAdmin"
                  value={createAdmin}
                  label="Roll"
                  onChange={(event) =>
                    setCreateAdmin(event.target.value === 'true')
                  }
                  sx={{ textAlign: 'left' }}
                >
                  <MenuItem value="false">Rådgivare</MenuItem>
                  <MenuItem value="true">Ansvarig</MenuItem>
                </Select>
              </FormControl>
              <CardActions
                sx={{
                  marginTop: 'auto',
                }}
              >
                <Button variant="contained" color="primary" type="submit">
                  Skapa konto
                </Button>
              </CardActions>
            </form>
          </CardContent>
        </Card>
      </Box>
      <Snackbar
        open={showErrorMessage}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert severity="error" onClose={handleClose}>
          {errorMessage || 'Något gick snett..'}
        </Alert>
      </Snackbar>
      <Snackbar
        open={showSuccessMessage}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert severity="success" onClose={handleClose}>
          Användare skapad.
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CreateUserComponent;
