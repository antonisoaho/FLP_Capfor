import { VisibilityOff, Visibility } from '@mui/icons-material';
import {
  CardContent,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  MenuItem,
  CardActions,
  Button,
  Select,
  Alert,
  Container,
  Snackbar,
} from '@mui/material';
import React, { useState } from 'react';
import axiosInstance from '../../../axios/AxiosInstance';
import UpdateUserModel from './models/UpdateUserModel';
import axios from 'axios';

export interface UserCredentialsProps {
  onUserChanged: () => void;
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

const UserCredentialsComponent: React.FC<UserCredentialsProps> = ({
  onUserChanged,
  _id,
  name: initialName,
  email: initialEmail,
  isAdmin: initialIsAdmin,
}) => {
  const [name, setName] = useState<string>(initialName);
  const [email, setEmail] = useState<string>(initialEmail);
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = React.useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(initialIsAdmin);
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const updateUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axiosInstance.put<UpdateUserModel>(`users/singleuser/${_id}`, {
        ...(name && { name }),
        ...(email && { email }),
        ...(password && { password }),
        ...(typeof isAdmin === 'boolean' && { isAdmin }),
      });

      if (response?.status === 200) {
        setShowSuccessMessage(true);
        setPassword('');
        onUserChanged();
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
          const errorMessage = error.response?.data.error || 'Email finns redan registrerad.';
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

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setShowErrorMessage(false);
    setShowSuccessMessage(false);
    setErrorMessage('');
  };
  return (
    <Container>
      <CardContent
        sx={{
          height: 450,
          width: '100%',
        }}>
        <form
          id="userUpdating"
          name="updateUserForm"
          onSubmit={updateUser}
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FormControl sx={{ m: 0.5, width: '100%' }} variant="outlined">
            <InputLabel htmlFor="name">Namn</InputLabel>
            <OutlinedInput
              id="name"
              type="text"
              value={name}
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
                    edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              onChange={(event) => setPassword(event.target.value)}
              label="Nytt lösenord"
              autoComplete="new-password"
            />
          </FormControl>
          <FormControl sx={{ m: 0.5, width: '100%' }}>
            <InputLabel id="role">Roll</InputLabel>
            <Select
              labelId="role"
              id="isAdmin"
              value={isAdmin}
              label="Roll"
              onChange={(event) => setIsAdmin(event.target.value === 'true')}
              sx={{ textAlign: 'left' }}>
              <MenuItem value="false">Rådgivare</MenuItem>
              <MenuItem value="true">Ansvarig</MenuItem>
            </Select>
          </FormControl>
          <CardActions
            sx={{
              marginTop: 'auto',
            }}>
            <Button variant="contained" color="primary" type="submit">
              Uppdatera användare
            </Button>
          </CardActions>
        </form>
      </CardContent>
      <Snackbar open={showErrorMessage} autoHideDuration={4000} onClose={handleClose}>
        <Alert severity="error" onClose={handleClose}>
          {errorMessage || 'Något gick snett..'}
        </Alert>
      </Snackbar>
      <Snackbar open={showSuccessMessage} autoHideDuration={4000} onClose={handleClose}>
        <Alert severity="success" onClose={handleClose}>
          Användare uppdaterad.
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default UserCredentialsComponent;
