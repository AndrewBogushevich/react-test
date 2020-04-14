import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  getNationalityById,
  NationalityRef,
  useNationality,
} from '../references/nationality.refs';
import { RootState } from '../store';
import { loadUserList, UserListItem } from '../store/user-list.store';

export function UserListPage() {
  const pageSizes = [10, 20, 50];
  const [selectedPageSize, setPageSize] = useState(pageSizes[0]);

  const [search, setSearch] = useState('');

  const nationalities = useNationality();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUserList());
  }, [dispatch]);

  const userList = useSelector((state: RootState) => state.userList.data)
    ?.filter((user) => {
      return (
        user.Firstname.toLowerCase().includes(search) ||
        user.Surname.toLowerCase().includes(search)
      );
    })
    .splice(0, selectedPageSize);

  const { isLoading, errors } = useSelector(
    (state: RootState) => state.userList.status
  );

  return (
    <div className="user-list-page">
      <h1>UserList</h1>

      {(() => {
        if (isLoading) {
          return <div>Loading...</div>;
        }

        if (errors) {
          return <div>{errors.ErrorMessage}</div>;
        }

        return (
          <div>
            <PageSizeSelect
              value={selectedPageSize}
              options={pageSizes}
              onChange={(e) => e && setPageSize(+e.target.value)}
            ></PageSizeSelect>

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <ul>
              {userList?.map((u) => (
                <UserItem
                  key={u.Id}
                  user={u}
                  nationalities={nationalities}
                ></UserItem>
              ))}
            </ul>
          </div>
        );
      })()}
    </div>
  );
}

function UserItem({
  user,
  nationalities,
}: {
  user: UserListItem;
  nationalities: NationalityRef[];
}) {
  return (
    <li key={user.Id}>
      {user.Firstname} | {user.Surname} |{' '}
      {getNationalityById(user.Nationality, nationalities)?.Name} |
      <Link to={`./user/${user.Id}`}>
        <button>view</button>
      </Link>
    </li>
  );
}

function PageSizeSelect(p: {
  value: number;
  options: number[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <select value={p.value} onChange={p.onChange}>
      {p.options.map((size) => (
        <option key={size} value={size}>
          {size}
        </option>
      ))}
    </select>
  );
}
