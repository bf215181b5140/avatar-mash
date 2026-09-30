'use client';

import { useEffect, useMemo, useState } from 'react';
import Avatar from './avatar.component';
import { AvatarDTO, MatchDTO, MatchResultDTO } from '../../model/database.model';
import Image from 'next/image';
import Loading from './loading.component';

export default function Match() {
  const [matchQueue, setMatchQueue] = useState<MatchDTO[] | null>(null);
  const currentMatch = matchQueue?.[0];

  const getData = useMemo(() => {
    return () => {
      fetch('/api/match').then(res => {
        if (!res.ok) return;
        res.json().then(data => setMatchQueue(data));
      });
    };
  }, []);

  useEffect(() => {
    getData();
  }, []);

  if (!matchQueue || !currentMatch) return <Loading />;

  function handleMatch(winner: AvatarDTO) {
    if (!currentMatch) return;

    const matchResult: MatchResultDTO = {
      id: currentMatch.id,
      winner: winner.id
    };

    fetch('/api/match', { method: 'POST', body: JSON.stringify(matchResult) }).then(res => {
      if (!res.ok) return;
      res.json().then(data => setMatchQueue(state => [...(state || []), data]));
    });

    setMatchQueue(state => [...(state || []).filter(m => m.id !== currentMatch.id)]);
  }

  return (<div className={'flex flex-col md:flex-row w-full grow-1 px-3 md:px-10 pb-12 justify-center items-center'}>
    <Avatar avatar={currentMatch.avatar1} onClick={() => handleMatch(currentMatch.avatar1)} />
    <Image aria-hidden src="/vs.png" alt="vs" width={160 / 1.5} height={133 / 1.5} className={'pointer-events-none -mx-10 -my-8 z-10'} />
    <Avatar avatar={currentMatch.avatar2} onClick={() => handleMatch(currentMatch.avatar2)} />
  </div>);
}