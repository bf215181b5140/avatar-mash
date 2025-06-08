import { useEffect, useState } from 'react';
import { UserDTO, UserSchema } from '../../shared/schemas/user';

export default function useUser() {

  const [user, setUser] = useState<UserDTO | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/user').then(async res => {
      setUser(UserSchema.parse(await res.json()));
      setIsLoading(false);
    });
  }, []);

  return { isLoading, isLoggedIn: !!user, user };
}
