import { AxiosResponse } from 'axios';

import { axios } from '../axios';

class AuthService {

  async login(payload: LoginPayload) {
    const urlencodedData = new URLSearchParams();
    urlencodedData.append('Company', payload.company);
    urlencodedData.append('User', payload.user);
    urlencodedData.append('Password', payload.password);

    const resp = await axios.request<any, AxiosResponse<LoginResponse | string>>({
      method: 'POST',
      url: '/Api/Session/Logon',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: urlencodedData,
    });

    if (resp.statusText === 'OK') {
      const respBody = resp.data;

      return respBody as LoginResponse;
    }

    const text = resp.data as string;
    throw new Error(text);
  }
}

export const authService = new AuthService();

export interface LoginPayload {
  company: string;
  user: string;
  password: string;
}

export interface LoginResponse {
  Token: string;
}

export type LoginErrorResponse = {
  ErrorCode: "MissingObligatoryData"
  ErrorMessage: "Missing obligatory information."
  ErrorContent: "Name of the missing property"
} | {
  ErrorCode: "InvalidCompany"
  ErrorMessage: "Given company is not registered."
  ErrorContent: null
} | {
  ErrorCode: "InvalidCredentials"
  ErrorMessage: "Invalid user name or password."
  ErrorContent: null
};
