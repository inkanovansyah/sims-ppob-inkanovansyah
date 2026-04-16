import API from './api';
import { ENDPOINTS } from '../constants/endpoints';
import { Service } from '../types/service';
import { APIResponse } from '../types/api';

export const getServices = async () => {
  const response = await API.get<APIResponse<Service[]>>(ENDPOINTS.SERVICE.GET_SERVICES);
  return response.data;
};
