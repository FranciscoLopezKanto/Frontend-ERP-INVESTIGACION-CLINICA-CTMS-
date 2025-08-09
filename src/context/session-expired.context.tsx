import { createContext, useContext, useEffect, useState } from 'react';
import { setSessionExpiredTrigger } from '../features/utils';
import { useAuth } from './auth.context';

const SessionExpiredContext = createContext<{
  show: boolean;
  trigger: () => void;
}>({
  show: false,
  trigger: () => {},
});

export const SessionExpiredProvider = ({ children }: { children: React.ReactNode }) => {
  const [show, setShow] = useState(false);
  const { logout } = useAuth();

  const trigger = () => {
    setShow(true);
    logout();
    setTimeout(() => {
      setShow(false);
    }, 3000);
  };

  useEffect(() => {
    setSessionExpiredTrigger(trigger);
  }, []);

  return (
    <SessionExpiredContext.Provider value={{ show, trigger }}>
      {children}
    </SessionExpiredContext.Provider>
  );
};

export const useSessionExpired = () => useContext(SessionExpiredContext);