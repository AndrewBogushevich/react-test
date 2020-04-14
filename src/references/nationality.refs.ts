import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { from, of } from 'rxjs';
import { pluck, shareReplay, switchMap, map } from 'rxjs/operators';

import { axios } from '../axios';

export const nationalities$ = of({}).pipe(
  switchMap(() => from(axios.get<any, AxiosResponse<NationalityRef[]>>(`/Api/Data/ListNationalities`))),
  pluck('data'),
  map(list => list.sort((a, b) => a.Order - b.Order)),
  shareReplay(1)
);

export function useNationality() {
  const [list, setList] = useState<NationalityRef[]>([])

  useEffect(() => {
    const subs = nationalities$.subscribe(list => {
      setList(list);
    });

    return () => subs.unsubscribe();
  })

  return list;
}

export const getNationalityById = function (id: NationalityRef['Id'], list: NationalityRef[]) {
  return list.find(n => n.Id === id);
};

export interface NationalityRef {
  Id: number;
  Name: string;
  Order: number;
}
