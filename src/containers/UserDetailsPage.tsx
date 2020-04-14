import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { ErrorResponse } from '../axios';
import { User, userService } from '../services/user.service';
import { UserForm } from '../components/UserForm';

export function UserDetailsPage() {
  const [status, seStatus] = useState<{
    isLoading: boolean;
    errors?: ErrorResponse;
  }>({ isLoading: false, errors: undefined });

  const [user, setUser] = useState<User>();

  const { userId } = useParams();

  useEffect(() => {
    if (!userId) {
      return;
    }

    seStatus({ isLoading: true, errors: undefined });

    userService.getUser(userId).then((resp) => {
      setUser(resp.data);
      seStatus({ isLoading: false, errors: undefined });
    });
  }, [userId]);

  return (
    <div className="user-details-page">
      <h1>User Details</h1>

      {(() => {
        if (status.isLoading) {
          return <div>Loading...</div>;
        }

        if (status.errors) {
          return <div>{status.errors?.ErrorMessage}</div>;
        }

        if (!user) {
          return;
        }

        return (
          <UserForm user={user} onUserSaved={(u) => setUser(u)}></UserForm>
        );
      })()}
    </div>
  );
}
