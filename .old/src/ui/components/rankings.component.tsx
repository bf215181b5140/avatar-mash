'use client';

import Image from 'next/image';
import { RankingsDTO, RankingsSchema } from '../../model/database.model';
import { useEffect, useMemo, useState } from 'react';
import Loading from './loading.component';

export default function Rankings() {
  const [rankings, setRankings] = useState<RankingsDTO | null>(null);

  const getData = useMemo(() => {
    return () => {
      fetch('/api/rankings').then(res => {
        if (!res.ok) return;
        res.json().then(data => setRankings(RankingsSchema.parse(data)));
      });
    };
  }, []);

  useEffect(() => {
    getData();
  }, []);

  if (!rankings) return <Loading />;

  function maxWidthFromIndex(index: number) {
    switch (index) {
      case 0:
        return 'max-w-md';
      case 1:
        return 'max-w-sm';
      case 2:
        return 'max-w-xs';
      default:
        return 'max-w-2xs';
    }
  }

  function colorFromIndex(index: number) {
    switch (index) {
      case 0:
        return 'gold';
      case 1:
        return 'silver';
      case 2:
        return 'peru';
      default:
        return 'dimgray';
    }
  }

  return (<div className={'flex flex-col gap-7 w-full px-3 md:px-10 py-12 justify-center items-center'}>
    <h1 className={'text-2xl mb-10'}>Top 30 avatars</h1>
    {rankings.map((avatar, index) => <div key={avatar.id} style={{ backgroundImage: `url(${avatar.image})`, boxShadow: 'inset 0 0 35px 5px black' , borderColor: colorFromIndex(index), color: colorFromIndex(index) }}
                                                   className={`border rounded-sm w-full ${maxWidthFromIndex(index)} aspect-3/4 bg-cover bg-no-repeat bg-center pointer-events-none relative`}>
      {index === 0 && <Image aria-hidden src="/crown.png" alt="Rankings" width={130} height={130} className={'hidden sm:block pointer-events-none absolute -top-22 -left-14 -rotate-30'} />}
      <span style={{ textShadow: '0 0 2px black' }}
            className={`pointer-events-none absolute ${index > 2 ? 'text-2xl' : 'text-4xl'} top-2 right-3`}>{index + 1}</span>
    </div>)}
  </div>);
}
