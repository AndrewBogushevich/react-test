import { AxiosResponse } from 'axios';
import { Dispatch } from 'redux';

import { axios, ErrorResponse } from '../axios';


// ================== Sync actions
// ================== LoadUserListStart
export interface LoadUserListStart {
  type: 'LoadUserListStart',
}

function loadUserListStart(): LoadUserListStart {
  return {
    type: 'LoadUserListStart'
  };
}

// ================== LoadUserListSuccess
export interface LoadUserListSuccess {
  type: 'LoadUserListSuccess',
  payload: UserListItem[],
}

function loadUserListSuccess(payload: UserListItem[]): LoadUserListSuccess {
  return {
    type: 'LoadUserListSuccess',
    payload
  };
}

// ================== LoadUserListError
export interface LoadUserListError {
  type: 'LoadUserListError',
  payload: ErrorResponse,
}

function loadUserListError(payload: ErrorResponse): LoadUserListError {
  return {
    type: 'LoadUserListError',
    payload
  };
}

// ================== Async actions
// ================== load UserList Data
export function loadUserList() {
  return function (dispatch: Dispatch) {
    dispatch(loadUserListStart());

    return axios.get<any, AxiosResponse<UserListItem[]>>('/Api/Data/ListUsers')
      .then(resp => {
        dispatch(loadUserListSuccess(resp.data));
      }).catch(err => {
        dispatch(loadUserListError(err));
      });

  }
}

// ================== reducer
export type UserListActions = LoadUserListStart | LoadUserListSuccess | LoadUserListError;

const initialState: UserListState = {
  data: undefined,
  status: {
    isLoading: false,
    errors: undefined
  }
}

export const userListReducer = (state = initialState, action: UserListActions) => {
  switch (action.type) {
    case 'LoadUserListStart':
      return {
        ...state,
        status: {
          ...state.status,
          isLoading: true,
          errors: undefined,
        }
      };
    case 'LoadUserListSuccess':
      return {
        ...state,
        data: action.payload,
        status: {
          isLoading: false,
          errors: undefined,
        }
      };
    case 'LoadUserListError':
      return {
        ...state,
        data: undefined,
        status: {
          isLoading: false,
          errors: action.payload,
        }
      };

    default:
      return state;
  }
};

export interface UserListState {
  data?: UserListItem[];
  status: {
    isLoading: boolean;
    errors?: ErrorResponse,
  }
}

export interface UserListItem {
  Id: string;
  Firstname: string;
  Surname: string;
  Nationality: number;

}
