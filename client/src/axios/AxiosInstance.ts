import axios, { AxiosResponse } from 'axios';
import globalRouter from '../../src/globalRouter';
import Cookies from 'universal-cookie';

const cookies = new Cookies();


const baseURL = 'http://localhost:3001/';

const axiosInstance = axios.create({
  baseURL,
  headers: { Authorization: cookies.get("TOKEN") },
});

axios.interceptors.request.use(
  (config) => {
    config.headers['Authorization'] = cookies.get("TOKEN");
    return config;
  },
  (err) => {
    return err;
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    if (
      (err.response.status === 401 || err.response.status === 403) &&
      globalRouter.navigate
    ) {
      globalRouter.navigate('/login');
    }

    return err;
  }
);

export default axiosInstance;
