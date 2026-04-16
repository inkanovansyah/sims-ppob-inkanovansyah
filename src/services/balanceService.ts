import API from './api';
import { ENDPOINTS } from '../constants/endpoints';
import { Balance } from '../types/balance';
import { APIResponse } from '../types/api';

export const getBalance = async () => {
  const response = await API.get<APIResponse<Balance>>(ENDPOINTS.BALANCE.GET);
  return response.data;
};
