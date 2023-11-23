import axios, { AxiosResponse } from 'axios';
import globalRouter from '../../src/globalRouter';

const baseURL = 'http://localhost:3001/';

const axiosInstance = axios.create({
  baseURL,
  headers: { Authorization: localStorage.getItem('TOKEN') },
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers['Authorization'] = localStorage.getItem('TOKEN');
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
      localStorage.removeItem('TOKEN');
      localStorage.removeItem('USERNAME');
    }

    return err;
  }
);

export default axiosInstance;
