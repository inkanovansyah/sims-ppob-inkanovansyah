import API from './api';
import { ENDPOINTS } from '../constants/endpoints';
import { Banner } from '../types/banner';
import { APIResponse } from '../types/api';

export const getBanners = async () => {
  const response = await API.get<APIResponse<Banner[]>>(ENDPOINTS.BANNER.GET_BANNERS);
  return response.data;
};
