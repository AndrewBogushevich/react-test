import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  FormikErrors,
  FormikHelpers,
} from 'formik';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { authService } from '../services/auth.service';
import { loginAction } from '../store/auth.store';
import { ErrorResponse } from '../axios';
import { ErrorCard } from '../components/ErrorCard';
import { AxiosError } from 'axios';

export function LoginPage() {
  const dispatch = useDispatch();

  const [globalError, setGlobalError] = useState<ErrorResponse | null>(null);

  const history = useHistory();
  let { from } = (history.location.state as any) || { from: { pathname: '/' } };

  const initialValue: LoginFormValue = {
    company: 'DemoCompany',
    user: 'Admin',
    password: 'Demo2020',
  };

  const validate = (formValue: LoginFormValue) => {
    const errors: FormikErrors<LoginFormValue> = {};

    if (!formValue.company) {
      errors.company = 'Company is required';
    }

    if (!formValue.user) {
      errors.user = 'User is required';
    }

    if (!formValue.password) {
      errors.password = 'Password is required';
    }

    return errors;
  };

  const onSubmit = async (
    values: LoginFormValue,
    { setErrors }: FormikHelpers<LoginFormValue>
  ) => {
    setGlobalError(null);

    return authService
      .login(values)
      .then((resp) => {
        dispatch(loginAction({ token: resp.Token }));
        history.push(from);
      })
      .catch((err: AxiosError) => {
        if (err.isAxiosError) {
          switch (err.response?.data.ErrorCode) {
            case 'InvalidCompany':
              setErrors({
                company: err.response?.data.ErrorMessage,
              });
              break;
            case 'InvalidCredentials':
              setErrors({
                password: err.response?.data.ErrorMessage,
              });
              break;
            default:
              setGlobalError(err.response?.data);
          }
          return;
        }

        setGlobalError({
          ErrorMessage: err.message,
        });
      });
  };

  return (
    <div className="login-page">
      <h1>Login page</h1>

      <Formik
        initialValues={initialValue}
        validate={validate}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-field">
              <label>Company</label>
              <Field type="text" name="company" />
              <ErrorMessage name="company" component="span" />
            </div>

            <div className="form-field">
              <label>User</label>
              <Field type="text" name="user" />
              <ErrorMessage name="user" component="span" />
            </div>

            <div className="form-field">
              <label>Password</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="span" />
            </div>

            {globalError && <ErrorCard error={globalError}></ErrorCard>}

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Loading...' : 'Submit'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

interface LoginFormValue {
  company: string;
  user: string;
  password: string;
}
