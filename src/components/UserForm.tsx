import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  FormikErrors,
  FormikHelpers,
} from 'formik';
import React, { useState } from 'react';

import { useNationality } from '../references/nationality.refs';
import { useRank } from '../references/rank.refs';
import { User, userService } from '../services/user.service';
import DatePickerField from './DatePickerField';
import { ErrorResponse } from '../axios';
import { AxiosError } from 'axios';
import { ErrorCard } from './ErrorCard';

interface UserFromProps {
  user: User;
  onUserSaved: (user: User) => void;
}

export function UserForm({ user, onUserSaved }: UserFromProps) {
  const userModel = { ...user };

  const nationalities = useNationality();
  const ranks = useRank();

  const validate = (user: User) => {
    const errors: FormikErrors<User> = {};

    // if (!user.Firstname) {
    //   errors.Firstname = 'Firstname is required';
    // }

    if (!user.Surname) {
      errors.Surname = 'Surname is required';
    }

    return errors;
  };

  const [globalError, setGlobalError] = useState<ErrorResponse | null>(null);

  const onSubmit = (
    user: User,
    { setErrors }: FormikHelpers<User & { globalError?: any }>
  ) => {
    setGlobalError(null);
    return userService
      .save(user)
      .then(() => {
        onUserSaved(user);
      })
      .catch((err: AxiosError<ErrorResponse>) =>
        setGlobalError(
          err.response?.data || {
            ErrorMessage: err.message,
          }
        )
      );
  };

  return (
    <Formik initialValues={userModel} validate={validate} onSubmit={onSubmit}>
      {({ isSubmitting }) => (
        <Form>
          <div className="form-field">
            <label>First Name</label>
            <Field type="text" name="Firstname" />
            <ErrorMessage name="Firstname" component="span" />
          </div>

          <div className="form-field">
            <label>Surname</label>
            <Field type="text" name="Surname" />
            <ErrorMessage name="Surname" component="span" />
          </div>

          <div className="form-field">
            <label>Address</label>
            <Field type="text" name="Address" />
            <ErrorMessage name="Address" component="span" />
          </div>

          <div className="form-field">
            <label>Date Of Birth</label>
            <Field
              type="text"
              name="DateOfBirth"
              as={DatePickerField}
              selected={userModel.DateOfBirth}
            />
            <ErrorMessage name="DateOfBirth" component="span" />
          </div>

          <div className="form-field">
            <label>Nationality</label>
            <Field name="Nationality" as="select">
              {nationalities.map((n) => (
                <option key={n.Id} value={n.Id}>
                  {n.Name}
                </option>
              ))}
            </Field>
            <ErrorMessage name="Nationality" component="span" />
          </div>

          <div className="form-field">
            <label>Rank</label>
            <Field name="Rank" as="select">
              {ranks.map((n) => (
                <option key={n.Id} value={n.Id}>
                  {n.Name}
                </option>
              ))}
            </Field>
            <ErrorMessage name="Rank" component="span" />
          </div>

          {globalError && <ErrorCard error={globalError}></ErrorCard>}

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Loading...' : 'Submit'}
          </button>
        </Form>
      )}
    </Formik>
  );
}
