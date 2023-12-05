import React, { useState, useEffect, Fragment } from 'react';
import UserModel from './models/UserModel';
import axiosInstance from '../../axios/AxiosInstance';
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
  Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

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

  const getUsers = async () => {
    setLoading(true);
    const response = await axiosInstance.get('/users');

    console.log(response.data);
    if (response.status === 200) {
      setUsers(response.data.users);
      setIsAdmin(response.data.isAdmin);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleUserCreated = () => {
    getUsers();
  };

  const Row = (props: { row: UserModel }) => {
    const { row } = props;
    const [open, setOpen] = useState<boolean>(false);

    const handleOpen = async () => {
      if (!open && !row.email) {
        const response = await axiosInstance.get(
          `/users/singleuser/${row._id}`
        );
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
            }}
          >
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={handleOpen}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>

          <TableCell component="th" scope="row">
            {row.isAdmin ? 'Ansvarig' : 'Rådgivare'}
          </TableCell>
          <TableCell align="right">{/* <EditIcon /> */}</TableCell>
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
                        <EditIcon />
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>{row._id}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>
                        {new Date(row.updatedAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {new Date(row.createdAt).toLocaleDateString()}
                      </TableCell>
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
      }}
    >
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
              onClick={handleDrawerOpen}
            >
              <AddIcon />
            </Fab>
          </Tooltip>
          <Drawer anchor="right" open={drawerOpen} onClose={handleDrawerClose}>
            <CreateUserComponent onUserCreated={handleUserCreated} />
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
                  <Row key={user.name} row={user} />
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
