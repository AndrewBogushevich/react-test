import Axios from 'axios';

import { store } from './store';
import { logoutAction } from './store/auth.store';

export const axios = Axios.create();

axios.interceptors.request.use(config => {
  const token = store.getState().auth.token;

  if (!token) {
    return config;
  }

  return {
    ...config,
    headers: {
      ...config.headers,
      SessionToken: token
    }
  }
});

axios.interceptors.response.use(resp => resp, err => {
  if (err.response?.status === 401) {
    store.dispatch(logoutAction())
  }

  return Promise.reject(err);
})

export interface ErrorResponse {
  ErrorCode?: string;
  ErrorMessage: string;
  ErrorContent?: string;
}
