// ==================== Login action
export interface LoginAction {
  type: 'Login',
  payload: { token: string }
}


export function loginAction(payload: LoginAction['payload']): LoginAction {
  return {
    type: 'Login',
    payload
  };
}

// ==================== Logout action
export interface LogoutAction {
  type: 'Logout',
}

export function logoutAction(): LogoutAction {
  return {
    type: 'Logout',
  };
}

// ==================== Reducer
export type AuthAction = LoginAction | LogoutAction;

export const authReducer = (state = { token: '' }, action: AuthAction) => {
  switch (action.type) {
    case 'Login':
      return {
        ...state,
        token: action.payload.token,
      };

    case 'Logout':
      return {
        ...state,
        token: ''
      }

    default:
      return state;
  }
};



