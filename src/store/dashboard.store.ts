import { AxiosResponse } from 'axios';
import { Dispatch } from 'redux';

import { axios, ErrorResponse } from '../axios';


// ================== Sync actions
// ================== LoadDashboardDataStart
export interface LoadDashboardDataStart {
  type: 'LoadDashboardDataStart',
}

function loadDashboardDataStart(): LoadDashboardDataStart {
  return {
    type: 'LoadDashboardDataStart'
  };
}

// ================== LoadDashboardDataSuccess
export interface LoadDashboardDataSuccess {
  type: 'LoadDashboardDataSuccess',
  payload: DashboardData,
}

function loadDashboardDataSuccess(payload: DashboardData): LoadDashboardDataSuccess {
  return {
    type: 'LoadDashboardDataSuccess',
    payload
  };
}

// ================== LoadDashboardDataError
export interface LoadDashboardDataError {
  type: 'LoadDashboardDataError',
  payload: ErrorResponse,
}

function loadDashboardDataError(payload: ErrorResponse): LoadDashboardDataError {
  return {
    type: 'LoadDashboardDataError',
    payload
  };
}

// ================== Async actions
// ================== load Dashboard Data
export function loadDashboardData() {
  return function (dispatch: Dispatch) {
    dispatch(loadDashboardDataStart());

    return axios.get<any, AxiosResponse<DashboardData>>('/Api/Data/GetSummary')
      .then(resp => {
        dispatch(loadDashboardDataSuccess(resp.data));
      }).catch(err => {
        dispatch(loadDashboardDataError(err));
      });

  }
}

// ================== reducer
export type DashboardActions = LoadDashboardDataStart | LoadDashboardDataSuccess | LoadDashboardDataError;

const initialState: DashboardState = {
  data: undefined,
  status: {
    isLoading: false,
    errors: undefined
  }
}

export const dashboardReducer = (state = initialState, action: DashboardActions) => {
  switch (action.type) {
    case 'LoadDashboardDataStart':
      return {
        ...state,
        status: {
          ...state.status,
          isLoading: true,
          errors: undefined,
        }
      };
    case 'LoadDashboardDataSuccess':
      return {
        ...state,
        data: action.payload,
        status: {
          isLoading: false,
          errors: undefined,
        }
      };
    case 'LoadDashboardDataError':
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

export interface DashboardState {
  data?: DashboardData;
  status: {
    isLoading: boolean;
    errors?: ErrorResponse,
  }
}

export interface DashboardData {
  Trainings: DashboardTraining[];
  Working: number;
}

export interface DashboardTraining {
  Name: string;
  Progress: number;
}
