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

const CustomerComponent = () => {
  const [customers, setCustomers] = useState<Array<CustomerModel>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCustomer, setSelectedCustoemr] = useState<CustomerModel | null>(null);
  const [selectedAdvisor, setSelectedAdvisor] = useState<any>(-1);
  const [advisorList, setAdvisorList] = useState<AdvisorModel[] | null>(null);

  const populateAdvisors = async () => {
    try {
      const response = await axiosInstance.get('/users');

      if (response.status === 200) {
        setAdvisorList(response.data.users);
      }
    } catch (error) {
      const extendedError = error as ExtendedError;
      if (extendedError.showSnackbar) {
        //same snackbar logic
      } else {
        console.error('Other error:', error);
      }
    }
  };

  const getCustomers = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get('/customers');

      if (response.status === 200) {
        setCustomers(response.data.customers);
        // console.log(advisorList);
        if (advisorList !== null) {
          setSelectedAdvisor(
            advisorList!.findIndex((advisor: AdvisorModel) => advisor._id === response.data.advisor)
          );
        }
        console.log(selectedAdvisor);
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

  const handleAdvisor = (event: SelectChangeEvent<string | number>) => {
    const selectedValue = event.target.value;
    setSelectedAdvisor(selectedValue);
  };

  useEffect(() => {
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
