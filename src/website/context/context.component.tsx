import { ReactProps } from '../types';
import { UserContext } from './user.context';
import useUser from '../hooks/useUser.hook';

export default function Context({ children }: ReactProps) {

  const user = useUser();

  return (<>
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  </>);
}