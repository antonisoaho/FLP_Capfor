import axiosInstance, { ExtendedError } from '../axios/AxiosInstance';
import {
  CustomerDetails,
  CustomerFormData,
} from '../components/customers/customerHandlers/forms/models/CustomerFormModels';
import CustomerModel from '../components/customers/models/CustomerModel';
import { ApiResponse, CustomerDataHandler, ErrorResponse } from './models/ApiModel';

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

export const getSingleCustomerById = async (customer: CustomerModel): Promise<ApiResponse<any>> => {
  try {
    const response = await axiosInstance.get(`/customers/${customer.custId}`);
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

//* Not tested
export const createNewCustomer = async (
  Details: CustomerDetails
): Promise<ApiResponse<CustomerModel>> => {
  try {
    const response = await axiosInstance.post('/customers/create', Details);

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

export const getCustomerFormData = async (
  details: CustomerDataHandler
): Promise<ApiResponse<CustomerFormData>> => {
  try {
    const response = await axiosInstance.get(
      `/customers/update/${details.field}/${details.subField}/${details._id}`
    );

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
//* Not tested
export const updateCustomer = async (details: CustomerDataHandler) => {
  try {
    const response = await axiosInstance.patch(
      `/customers/update/${details.field}/${details.subField}/${details._id}`,
      details.formData
    );

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
