import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios/AxiosInstance';
import { Container, Box } from '@mui/material';

const AccountModel = () => {
  const [password, setPassword] = useState<string>('');
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
      <Box></Box>
    </Container>
  );
}

export default AccountComponent;
