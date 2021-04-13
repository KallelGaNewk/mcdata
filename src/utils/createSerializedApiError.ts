import { AxiosError } from 'axios';

interface SerializedApiError {
  isSerializedApiError: true;
  status: number;
  name?: string;
  data?: any;
}

export function createSerializedApiError(
  error: AxiosError,
): SerializedApiError {
  console.log(error);

  if (isAxiosError(error)) {
    const isNetworkError = !!error.isAxiosError && !error.response;

    if (isNetworkError) {
      return {
        isSerializedApiError: true,
        status: 500,
        name: 'NetworkError',
      };
    }

    const response = error.response;

    return {
      isSerializedApiError: true,
      status: response?.status ?? 500,
      name: response?.statusText,
      data: response?.data,
    };
  }

  return {
    isSerializedApiError: true,
    status: 500,
    name: String(error),
  };
}

function isAxiosError(e: any): e is AxiosError {
  return e.isAxiosError;
}
