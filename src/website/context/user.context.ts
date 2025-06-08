import { createContext } from 'react';
import useUser from '../hooks/useUser.hook';

export const UserContext = createContext<ReturnType<typeof useUser>>({} as any);
