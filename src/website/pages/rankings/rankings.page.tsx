import { useEffect, useState } from 'react';
import { z } from 'zod/v4';
import { AvatarDTO, AvatarSchema } from '../../../shared/schemas/avatar';

export default function RankingsPage() {

  const [avatars, setAvatars] = useState<AvatarDTO[]>([]);

  useEffect(() => {
    fetch('/api/rankings').then(async res => setAvatars(z.array(AvatarSchema).parse(await res.json())));
  }, []);

  if (avatars.length === 0) return <p>Loading...</p>;

  return (<div>

    {avatars.map(avatar => <div key={avatar.id}>
      {avatar.id}
    </div>)}

  </div>);
}