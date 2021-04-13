import { createSerializedApiError } from './createSerializedApiError';

export function createSerializedApiErrorInterceptor(error: any) {
  return Promise.reject(createSerializedApiError(error));
}
