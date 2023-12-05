import React, { useState, useEffect, Fragment } from 'react';
import UserModel from './models/UserModel';
import axiosInstance from '../../axios/AxiosInstance';
import CreateUserComponent from './createUser/CreateUserComponent';
import {
  CircularProgress,
  Container,
  Drawer,
  Fab,
  Paper,
  SxProps,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
  Tooltip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const UserComponent = () => {
  const [users, setUsers] = useState<Array<UserModel>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  useEffect(() => {
    async function getUsers() {
      setLoading(true);
      const response = await axiosInstance.get('/users');

      console.log(response.data);
      if (response.status === 200) {
        setUsers(response.data.users);
        setIsAdmin(response.data.isAdmin);
        setLoading(false);
      }
    }
    getUsers();
  }, []);

  const loaderStyles: SxProps<Theme> = {
    minWidth: 650,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    p: 6,
  };

  return (
    <Container
      sx={{
        marginTop: 8,
      }}
    >
      {' '}
      {isAdmin ? (
        <>
          <Tooltip title="Skapa användare" placement="top-start" arrow>
            <Fab
              sx={{
                position: 'fixed',
                right: 24,
                bottom: 24,
              }}
              color="primary"
              aria-label="add"
              onClick={handleDrawerOpen}
            >
              <AddIcon />
            </Fab>
          </Tooltip>
          <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}>
            <CreateUserComponent />
          </Drawer>
        </>
      ) : (
        <></>
      )}
      <>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <>
                  <TableCell>Namn</TableCell>
                  <TableCell>Mail</TableCell>
                  <TableCell align="right">Roll</TableCell>
                </>
              </TableRow>
            </TableHead>

            {loading ? (
              <TableBody>
                <TableRow>
                  <TableCell colSpan={4} sx={loaderStyles}>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              </TableBody>
            ) : (
              <TableBody>
                {users.map((user) => (
                  <TableRow
                    key={user.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <>
                      <TableCell component="th" scope="row">
                        {user.name}
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell align="right">{user.role}</TableCell>
                    </>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>
        </TableContainer>
      </>
    </Container>
  );
};

export default UserComponent;
