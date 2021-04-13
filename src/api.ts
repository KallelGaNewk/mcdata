import Axios from 'axios';
import { createSerializedApiErrorInterceptor } from './utils/createSerializedApiErrorInterceptor';

export const createApi = (baseUrl: string) => {
  const api = Axios.create({
    baseURL: baseUrl,
  });

  api.interceptors.response.use(undefined, createSerializedApiErrorInterceptor);

  return api;
};
