import API from './api';
import { ENDPOINTS } from '../constants/endpoints';
import { Profile } from '../types/profile';
import { APIResponse } from '../types/api';

export const getProfile = async () => {
  const response = await API.get<APIResponse<Profile>>(ENDPOINTS.PROFILE.GET);
  return response.data;
};

export const updateProfile = async (data: { first_name: string; last_name: string }) => {
  const response = await API.put<APIResponse<Profile>>(ENDPOINTS.PROFILE.UPDATE, data);
  return response.data;
};

export const updateProfileImage = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await API.put<APIResponse<Profile>>(ENDPOINTS.PROFILE.UPDATE_IMAGE, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
