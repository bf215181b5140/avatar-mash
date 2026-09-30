import { useEffect, useState } from 'react';
import { UserDTO, UserSchema } from '../../shared/schemas/user';

export default function useUser() {

  const [user, setUser] = useState<UserDTO | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/user').then(async res => {
      if (res.status === 200 && res.headers.get('content-type')?.includes('application/json')) {
        setUser(UserSchema.parse(await res.json()));
        setIsLoading(false);
      } else {
        setUser(null);
        setIsLoading(false);
      }
    });
  }, []);

  return { isLoading, isLoggedIn: !!user, user };
}
