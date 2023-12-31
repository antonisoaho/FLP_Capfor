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
  Container,
  CircularProgress,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { snackbarState } from '../../../recoil/RecoilAtoms';
import {
  deleteUserById,
  getSingleUserById,
  updateSingleUserById,
} from '../../../apiCalls/apiUserCalls';
import UpdateUserModel from './models/UpdateUserModel';
import UserModel from '../models/UserModel';

export interface UserCredentialsProps {
  onUserChanged: () => void;
  _id: string;
}

const UserCredentialsComponent: React.FC<UserCredentialsProps> = ({ onUserChanged, _id }) => {
  const [userModel, setUserModel] = useState<UpdateUserModel>();
  const [showPassword, setShowPassword] = useState<Boolean>(false);
  const [loading, isLoading] = useState<Boolean>(true);
  const setSnackbarState = useSetRecoilState(snackbarState);

  const getSelectedUser = async () => {
    const response = await getSingleUserById(_id);

    if (response.success && response.status === 200) {
      const { name, email, isAdmin } = response.data as UserModel;

      setUserModel({
        name,
        email,
        isAdmin,
      });
    } else {
      setSnackbarState({
        open: true,
        message: response.error!,
        severity: 'error',
      });
    }
    isLoading(false);
  };
  useEffect(() => {
    getSelectedUser();
  }, []);

  const handleInputChange = (field: string, value: string | boolean) => {
    setUserModel((prevUserModel) => ({
      ...prevUserModel,
      [field]: value,
    }));
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const updateUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response = await updateSingleUserById(_id, userModel!);

    if (response.success && response.status === 200) {
      setSnackbarState({
        open: true,
        message: `${userModel!.name}'s konto ändrat.`,
        severity: 'info',
      });

      onUserChanged();
    } else {
      setSnackbarState({
        open: true,
        message: response.error!,
        severity: 'error',
      });
    }
  };

  const removeUser = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const response = await deleteUserById(_id);

    if (response.success && response.status === 200) {
      setSnackbarState({
        open: true,
        message: `${userModel!.name}'s konto borttaget.`,
        severity: 'info',
      });
    } else {
      setSnackbarState({
        open: true,
        message: response.error!,
        severity: 'error',
      });
    }

    onUserChanged();
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Container>
      {!loading ? (
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
                value={userModel?.name}
                onChange={(event) => handleInputChange('name', event.target.value)}
                label="Namn"
                autoComplete="name"
              />
            </FormControl>
            <FormControl sx={{ m: 0.5, width: '100%' }} variant="outlined">
              <InputLabel htmlFor="email">Email</InputLabel>
              <OutlinedInput
                id="email"
                type="email"
                value={userModel?.email}
                onChange={(event) => handleInputChange('email', event.target.value)}
                label="Email"
                autoComplete="email"
              />
            </FormControl>
            <FormControl sx={{ m: 0.5, width: '100%' }} variant="outlined">
              <InputLabel htmlFor="password">Lösenord</InputLabel>
              <OutlinedInput
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={userModel?.password}
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
                onChange={(event) => handleInputChange('password', event.target.value)}
                label="Nytt lösenord"
                autoComplete="new-password"
              />
            </FormControl>
            <FormControl sx={{ m: 0.5, width: '100%' }}>
              <InputLabel id="role">Roll</InputLabel>
              <Select
                labelId="role"
                id="isAdmin"
                value={userModel?.isAdmin}
                label="Roll"
                onChange={(event) => handleInputChange('isAdmin', event.target.value === 'true')}
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
              <Button variant="contained" color="error" onClick={removeUser}>
                Ta bort användare
              </Button>
            </CardActions>
          </form>
        </CardContent>
      ) : (
        <CircularProgress />
      )}
    </Container>
  );
};

export default UserCredentialsComponent;
