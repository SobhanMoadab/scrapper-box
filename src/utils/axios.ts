import axios, { AxiosInstance } from 'axios';

export function axiosFactory(token?: string): AxiosInstance {
  return axios.create({
    timeout: 1000,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? token : '',
    },
  });
}
