import {
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Container,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import CustomerModel from './models/CustomerModel';
import axiosInstance, { ExtendedError } from '../../axios/AxiosInstance';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AdvisorModel from './models/AdvisorModel';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { snackbarState, userState } from '../../recoil/RecoilAtoms';
import { getUserList } from '../../apiCalls/apiUserCalls';
import UserModel from '../users/models/UserModel';
import { getCustomerList } from '../../apiCalls/apiCustomerCalls';

const CustomerComponent = () => {
  const [customers, setCustomers] = useState<Array<CustomerModel>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerModel | null>(null);
  const [selectedAdvisor, setSelectedAdvisor] = useState<any>(-1);
  const [advisorList, setAdvisorList] = useState<UserModel[] | null>(null);
  const { isAdmin, userId } = useRecoilValue(userState);
  const setSnackbarState = useSetRecoilState(snackbarState);

  const populateAdvisors = async () => {
    const response = await getUserList();

    if (response.success && response.status === 200) {
      setAdvisorList(response.data!);
      setLoading(false);
    } else {
      setSnackbarState({
        open: true,
        message: response.error!,
        severity: 'error',
      });
    }
  };

  const getCustomers = async () => {
    const response = await getCustomerList();

    if (response.success && response.status === 200) {
      setCustomers(response.data!);
    } else {
      setSnackbarState({
        open: true,
        message: response.error!,
        severity: 'error',
      });
    }
  };

  const handleAdvisor = (event: SelectChangeEvent<string | number>) => {
    const selectedValue = event.target.value;
    setSelectedAdvisor(selectedValue);
  };

  useEffect(() => {
    setLoading(true);
    populateAdvisors();
    getCustomers();
    setLoading(false);
  }, []);

  return (
    <Container sx={{ marginTop: 2 }}>
      {!loading ? (
        <>
          <Select
            labelId="advisorIds"
            id="selectedAdvisor"
            value={selectedAdvisor}
            onChange={(event) => {
              handleAdvisor(event);
            }}>
            <MenuItem value={-1} key={'allAdvisors'}>
              Alla
            </MenuItem>
            {advisorList?.map((advisor, index) => (
              <MenuItem value={index} key={advisor._id}>
                {advisor.name}
              </MenuItem>
            ))}
          </Select>
          <Container>
            {customers.map(
              (cust) =>
                advisorList &&
                (selectedAdvisor === -1 || cust.advisorId === advisorList[selectedAdvisor]._id) && (
                  <Card sx={{ maxWidth: 275 }} key={cust.custId}>
                    <CardContent>
                      <Typography
                        textAlign="left"
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom>
                        {cust.custId}
                      </Typography>
                      {cust.customerNames.map((name) => (
                        <Typography key={name} textAlign="left">
                          {name}
                        </Typography>
                      ))}
                    </CardContent>
                    <CardActions>
                      <Tooltip title={'Ändra kund'}>
                        <IconButton sx={{ marginLeft: 'auto' }}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={'Titta på kund'}>
                        <IconButton>
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                    </CardActions>
                  </Card>
                )
            )}
          </Container>
        </>
      ) : (
        <CircularProgress />
      )}
    </Container>
  );
};

export default CustomerComponent;
