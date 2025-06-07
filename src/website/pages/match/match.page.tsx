import { useEffect, useState } from 'react';
import { MatchDTO, MatchSchema } from '../../../shared/schemas/match';

export default function MatchPage() {
  const [matches, setMatches] = useState<MatchDTO[]>([]);
  const currentMatch = matches[0];

  useEffect(() => {
    fetch('/api/match').then(async res => {
      const nextMatch = MatchSchema.parse(await res.json());
      setMatches([nextMatch]);
    });
  }, []);

  function submitWinner(winner: string) {
    fetch('/api/match', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: currentMatch.id, winner })
    }).then(async res => {
      const nextMatch = MatchSchema.parse(await res.json());
      setMatches(state => {
        state.shift();
        return [...state, nextMatch];
      });
    });
  }

  if (!currentMatch) return <p>Loading...</p>;

  return (<div>

    <h1>Match</h1>
    <button onClick={() => submitWinner(currentMatch.avatar1.id)}>{currentMatch.avatar1.id}</button>
    VS
    <button onClick={() => submitWinner(currentMatch.avatar2.id)}>{currentMatch.avatar2.id}</button>

  </div>);
}