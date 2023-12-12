import React, { useState, useEffect } from 'react';
import axiosInstance, { ExtendedError } from '../../axios/AxiosInstance';
import { Container, Box } from '@mui/material';
import AccountModel from './models/AccountModel';

interface AccountComponentProps {
  showSnackbar: (
    message: string,
    type: 'success' | 'error' | 'info' | 'warning'
  ) => void;
}

const AccountComponent: React.FC<AccountComponentProps> = ({
  showSnackbar,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [account, setAccount] = useState<AccountModel | undefined>(undefined);

  useEffect(() => {
    const getMyAccount = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get<AccountModel>('/users/getme');

        if (response.status === 200) setAccount(response.data);
        setLoading(false);
      } catch (error) {
        const extendedError = error as ExtendedError;
        if (extendedError.showSnackbar) {
          showSnackbar(
            extendedError.snackbarMessage || 'Ett fel inträffade',
            'error'
          );
        } else {
          console.error('Other error:', error);
        }
      }
    };
    getMyAccount();
  }, [showSnackbar]);

  const changePassword = () => {
    // Lägg in en childComponent
  };

  return (
    <Container>
      <Box>My Accountpage</Box>
    </Container>
  );
};

export default AccountComponent;
