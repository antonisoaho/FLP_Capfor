import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios/AxiosInstance';
import { Container, Box } from '@mui/material';
import globalRouter from '../../globalRouter';
import AccountModel from './models/AccountModel';

const AccountComponent = () => {
  const [newPassword, setNewPassword] = useState<string>('');
  const [oldPassword, setOldPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [account, setAccount] = useState<AccountModel | undefined>(undefined);

  useEffect(() => {
    async function getMyAccount() {
      setLoading(true);
      const response = await axiosInstance.get<AccountModel>('/users/getme');

      if (response.status === 200) setAccount(response.data);
      setLoading(false);
    }
    getMyAccount();
  }, []);

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
