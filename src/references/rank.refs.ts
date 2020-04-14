import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { from, of } from 'rxjs';
import { pluck, shareReplay, switchMap, map } from 'rxjs/operators';

import { axios } from '../axios';

export const ranks$ = of({}).pipe(
  switchMap(() => from(axios.get<any, AxiosResponse<RankRef[]>>(`/Api/Data/ListRanks`))),
  pluck('data'),
  map(list => list.sort((a, b) => a.Order - b.Order)),
  shareReplay(1)
);

export function useRank() {
  const [list, setList] = useState<RankRef[]>([])

  useEffect(() => {
    const subs = ranks$.subscribe(list => {
      setList(list);
    });

    return () => subs.unsubscribe();
  })

  return list;
}

export const getRankById = function (id: RankRef['Id'], list: RankRef[]) {
  return list.find(n => n.Id === id);
};

export interface RankRef {
  Id: number;
  Name: string;
  Order: number;
}
