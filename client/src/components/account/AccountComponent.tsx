import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios/AxiosInstance';
import { Container, Box } from '@mui/material';
import globalRouter from '../../globalRouter';

const AccountModel = () => {
  const [newPassword, setNewPassword] = useState<string>('');
  const [oldPassword, setOldPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getUserByID() {
      setLoading(true);

      setLoading(false);
    }
  });
};

function AccountComponent() {
  return (
    <Container>
      <Box>My Accountpage</Box>
    </Container>
  );
}

export default AccountComponent;
