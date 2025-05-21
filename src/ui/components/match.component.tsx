'use client';

import { useEffect, useMemo, useState } from 'react';
import Avatar from './avatar.component';
import { AvatarDTO, MatchDTO, MatchResultDTO } from '../../model/database.model';

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

  if (!matchQueue || !currentMatch) return <div>Loading...</div>;

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

  return (<div className={'flex flex-col md:flex-row w-full px-10 pb-12 justify-center items-center'}>
    <Avatar avatar={currentMatch.avatar1} onClick={() => handleMatch(currentMatch.avatar1)} />
    <div style={{ boxShadow: '0 0 35px 5px black' }} className={'text-4xl bg-linear-to-t py-4 pl-3.5 pr-4.5 -m-6 border z-10 pointer-events-none italic font-bold rounded-full'}>
      VS
    </div>
    <Avatar avatar={currentMatch.avatar2} onClick={() => handleMatch(currentMatch.avatar2)} />
  </div>);
}