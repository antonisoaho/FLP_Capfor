import axiosInstance, { ExtendedError } from '../axios/AxiosInstance';
import { ApiResponse, ErrorResponse } from './models/ApiModel';
import LoginResponse from '../components/login/models/LoginResponse';
import UserModel from '../components/users/models/UserModel';
import UpdateUserModel from '../components/users/usercredentials/models/UpdateUserModel';
import AdvisorModel from '../components/customers/models/AdvisorModel';

export const loginAPI = async (
  email: string,
  password: string
): Promise<ApiResponse<LoginResponse>> => {
  try {
    const response = await axiosInstance.post<LoginResponse>('/login', {
      email: email,
      password: password,
    });

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
      error: errorMessage.error || 'Ett oväntat fel inträffade, försök igen senare.',
    };
  }
};

export const getUserList = async (): Promise<ApiResponse<UserModel[]>> => {
  try {
    const response = await axiosInstance.get('/users');
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

export const getSingleUserById = async (id: string): Promise<ApiResponse<UserModel>> => {
  try {
    const response = await axiosInstance.get(`/users/singleuser/${id}`);
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

export const updateSingleUserById = async (id: string, newData: UpdateUserModel) => {
  try {
    const response = await axiosInstance.put<UpdateUserModel>(`users/singleuser/${id}`, {
      newData,
    });

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
