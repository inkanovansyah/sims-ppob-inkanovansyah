import API from './api';
import { ENDPOINTS } from '../constants/endpoints';
import { LoginData, RegisterData } from '../types/auth';
import { APIResponse } from '../types/api';

export const login = async (data: LoginData) => {
  const response = await API.post<APIResponse<{ token: string }>>(ENDPOINTS.AUTH.LOGIN, data);
  return response.data;
};

export const register = async (data: RegisterData) => {
  const response = await API.post<APIResponse<null>>(ENDPOINTS.AUTH.REGISTRATION, data);
  return response.data;
};
