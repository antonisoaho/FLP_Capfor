import React, { useState, useEffect } from 'react';
import UserModel from './models/UserModel';
import axiosInstance, { ExtendedError } from '../../axios/AxiosInstance';
import CreateUserComponent from './createUser/CreateUserComponent';
import {
  Box,
  CircularProgress,
  Collapse,
  Container,
  Drawer,
  Fab,
  IconButton,
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
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import UserCredentialsComponent from './usercredentials/UserCredentialsComponent';
import { userRoleState } from '../../recoil/RecoilAtoms';
import { useRecoilValue } from 'recoil';

const UserComponent = () => {
  const [users, setUsers] = useState<Array<UserModel>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [changeOpen, setChangeOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<UserModel | null>(null);

  const { isAdmin } = useRecoilValue(userRoleState);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };
  const handleUserPrefsOpen = (selectedUser: UserModel) => {
    setChangeOpen(true);
    setSelectedUser(selectedUser);
  };

  const handleUserPrefsClose = () => {
    setChangeOpen(false);
  };

  const getUsers = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/users');

      if (response.status === 200) {
        setUsers(response.data.users);
        // setIsAdmin(response.data.isAdmin);
        setLoading(false);
      }
    } catch (error) {
      const extendedError = error as ExtendedError;
      if (extendedError.showSnackbar) {
        // snackbarlogic
      } else {
        console.error('Other error:', error);
      }
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleUsers = () => {
    getUsers();
  };

  const Row = (props: { row: UserModel; onUserPrefsOpen: (selectedUser: UserModel) => void }) => {
    const { row, onUserPrefsOpen } = props;
    const [open, setOpen] = useState<boolean>(false);

    const handleOpen = async () => {
      if (!open && !row.email) {
        const response = await axiosInstance.get(`/users/singleuser/${row._id}`);
        const user = response.data;
        const objIndex = users.findIndex((obj) => obj._id === row._id);
        users[objIndex].email = user.email;
        users[objIndex].updatedAt = user.updatedAt;
        users[objIndex].createdAt = user.createdAt;
      }

      setOpen(!open);
    };

    return (
      <>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell
            style={{
              width: 'fit-content',
              whiteSpace: 'nowrap',
              maxWidth: '10px',
              padding: 0,
              paddingLeft: '16px',
            }}>
            {isAdmin && (
              <IconButton aria-label="expand row" size="small" onClick={handleOpen}>
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            )}
          </TableCell>
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>

          <TableCell component="th" scope="row">
            {row.isAdmin ? 'Ansvarig' : 'Rådgivare'}
          </TableCell>
          <TableCell align="right"></TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Table size="small" aria-label="more-info">
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Mail</TableCell>
                      <TableCell>Uppdaterad</TableCell>
                      <TableCell>Skapad</TableCell>
                      <TableCell>
                        <Tooltip title="Redigera användare" placement="right" arrow>
                          <Fab size="small" aria-label="edit" onClick={() => onUserPrefsOpen(row)}>
                            <EditIcon />
                          </Fab>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>{row._id}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{new Date(row.updatedAt).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(row.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell />
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </>
    );
  };

  const loaderStyles: SxProps<Theme> = {
    minWidth: 650,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    p: 6,
  };

  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{
        marginTop: 4,
      }}>
      {isAdmin && (
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
              onClick={handleDrawerOpen}>
              <AddIcon />
            </Fab>
          </Tooltip>
          <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}>
            <CreateUserComponent onUserCreated={handleUsers} />
          </Drawer>
        </>
      )}

      {isAdmin && changeOpen && (
        <>
          <Drawer anchor="top" open={changeOpen} onClose={handleUserPrefsClose}>
            <UserCredentialsComponent
              onUserChanged={handleUsers}
              _id={selectedUser?._id || ''}
              name={selectedUser?.name || ''}
              email={selectedUser?.email || ''}
              isAdmin={selectedUser?.isAdmin || false}
            />
          </Drawer>
        </>
      )}
      <>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 450 }} aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    width: 'fit-content',
                    whiteSpace: 'nowrap',
                    maxWidth: '20px',
                  }}
                />
                <TableCell>Namn</TableCell>
                <TableCell>Roll</TableCell>
                <TableCell />
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
                  <Row key={user._id} row={user} onUserPrefsOpen={handleUserPrefsOpen} />
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
function useRecoildValue(userRoleState: any) {
  throw new Error('Function not implemented.');
}
