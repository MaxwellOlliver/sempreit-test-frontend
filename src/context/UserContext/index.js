import { createContext, useEffect, useState } from 'react';
import { api } from '../../services/api';

export const UserContext = createContext({
  user: {},
  token: '',
  setToken: () => {},
  setUser: () => {},
  removeToken: () => {},
});

export function UserProvider({ children }) {
  const [user, setUser] = useState({});
  const [token, _setToken] = useState(null);

  useEffect(() => {
    (async () => {
      const tk = localStorage.getItem('SI_TOKEN');
      if (tk) {
        _setToken(tk);
        if (!user.id) {
          const user = await api({
            method: 'get',
            url: '/me',
            headers: {
              authorization: `Bearer ${tk}`,
            },
          });

          setUser(user.data);
        }
      }
    })();
  }, []);

  function setToken(token) {
    localStorage.setItem('SI_TOKEN', token);
    _setToken(token);
  }

  function removeToken() {
    localStorage.removeItem('SI_TOKEN');
    _setToken(null);
  }

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        setUser,
        setToken,
        removeToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
