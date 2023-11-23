import React, { useState, useEffect } from 'react';
import UserModel from './models/UserModel';
import axiosInstance from '../../axios/AxiosInstance';
import {
  Box,
  CircularProgress,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

const UserComponent = () => {
  const [users, setUsers] = useState<Array<UserModel>>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getUsers() {
      setLoading(true);
      const response = await axiosInstance.get<Array<UserModel>>('/users');

      if (response.status === 200) setUsers(response.data);
      setLoading(false);
    }
    getUsers();
  }, []);

  return (
    <Container
      sx={{
        marginTop: 8,
      }}
    >
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell align="right">Role ID</TableCell>
              </TableRow>
            </TableHead>

            {loading ? (
              <Box
                sx={{
                  minWidth: 650,
                  display: 'flex',
                  justifyContent: 'center',
                  p: 6,
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <TableBody>
                {users.map((user) => (
                  <TableRow
                    key={user.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {user.name}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell align="right">{user.role}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default UserComponent;
