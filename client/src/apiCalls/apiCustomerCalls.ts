import axiosInstance, { ExtendedError } from '../axios/AxiosInstance';
import CustomerModel from '../components/customers/models/CustomerModel';
import { ApiResponse, ErrorResponse } from './models/ApiModel';

export const getCustomerList = async (): Promise<ApiResponse<CustomerModel[]>> => {
  try {
    const response = await axiosInstance.get('/customers');
    return {
      success: true,
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    const extendedError = error as ExtendedError;
    const errorMessage: ErrorResponse = <ErrorResponse>extendedError.response?.data;

    return {
      success: false,
      status: extendedError.status,
      error: errorMessage.error || 'Ett oväntat fel inträffade.',
    };
  }
};
