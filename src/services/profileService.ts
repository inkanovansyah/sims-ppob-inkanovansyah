import API from './api';
import { ENDPOINTS } from '../constants/endpoints';
import { Profile } from '../types/profile';
import { APIResponse } from '../types/api';

export const getProfile = async () => {
  const response = await API.get<APIResponse<Profile>>(ENDPOINTS.PROFILE.GET);
  return response.data;
};
