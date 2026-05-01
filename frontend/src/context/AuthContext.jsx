import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebase';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 3000);

    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
      clearTimeout(timeout);
    }, () => {
      setLoading(false);
      clearTimeout(timeout);
    });

    return () => {
      clearTimeout(timeout);
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
