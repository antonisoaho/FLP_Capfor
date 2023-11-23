import axios, { AxiosResponse } from 'axios';
import globalRouter from '../../src/globalRouter';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const baseURL = 'http://localhost:3001/';

const axiosInstance = axios.create({
  baseURL,
  headers: { Authorization: cookies.get('TOKEN') },
});

axiosInstance.interceptors.request.use(
  (config) => {
    console.log(cookies.get('TOKEN'));
    config.headers['Authorization'] = cookies.get('TOKEN');
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
      cookies.remove('TOKEN');
    }

    return err;
  }
);

export default axiosInstance;
