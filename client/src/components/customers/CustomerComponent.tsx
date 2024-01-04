import {
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  Tooltip,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import CustomerModel from './models/CustomerModel';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { snackbarState, userState } from '../../recoil/RecoilAtoms';
import { getUserList } from '../../apiCalls/apiUserCalls';
import UserModel from '../users/models/UserModel';
import { getCustomerList } from '../../apiCalls/apiCustomerCalls';

const CustomerComponent = () => {
  const [customers, setCustomers] = useState<Array<CustomerModel>>([]);
  const [loading, setLoading] = useState<boolean>(true);
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
          {isAdmin && (
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
          )}
          <Grid justifyContent="center" container spacing={2} marginTop={1}>
            {customers.map(
              (cust) =>
                advisorList &&
                (selectedAdvisor === -1 || cust.advisorId === advisorList[selectedAdvisor]._id) && (
                  <Grid item sx={{ maxWidth: 275 }} key={cust.custId}>
                    <Card>
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
                  </Grid>
                )
            )}
          </Grid>
        </>
      ) : (
        <CircularProgress />
      )}
    </Container>
  );
};

export default CustomerComponent;
