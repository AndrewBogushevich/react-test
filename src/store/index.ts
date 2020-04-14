import thunkMiddleware from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { authReducer } from './auth.store';
import { dashboardReducer } from './dashboard.store';
import { userListReducer } from './user-list.store';

const rootReducer = combineReducers({ auth: authReducer, dashboard: dashboardReducer, userList: userListReducer });
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer, composeEnhancers(
    applyMiddleware(
      thunkMiddleware // lets us dispatch() functions
    ),
  )
);

export type RootState = ReturnType<typeof rootReducer>;
