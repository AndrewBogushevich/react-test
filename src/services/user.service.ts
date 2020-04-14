import { AxiosResponse } from 'axios';

import { axios, ErrorResponse } from '../axios';

class UserService {

  getUser(userId: User['Id']) {
    return axios
      .get<any, AxiosResponse<User>>(`/Api/Data/GetUser/${userId}`).then(resp => ({
        ...resp,
        data: {
          ...resp.data,
          DateOfBirth: resp.data.DateOfBirth && new Date(resp.data.DateOfBirth)
        }
      })).then(r => {
        console.log(r.data.DateOfBirth);
        return r;
      });
  }

  save(user: User) {
    return axios
      .put<any, AxiosResponse<User | ErrorResponse>>(`/Api/Data/UpdateUser/${user.Id}`, user)
  }

}

export const userService = new UserService();

export interface User {
  Id: string;
  Firstname: string;
  Surname: string;
  Nationality: number;
  Rank: string;
  DateOfBirth: Date;
  Address?: string;
}
