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
      const token = localStorage.getItem('SI_TOKEN');

      if (token) {
        _setToken(token);
        if (!user.id) {
          const user = await api({
            method: 'get',
            url: '/me',
            headers: {
              authorization: `Bearer ${token}`,
            },
          });

          setUser(user);
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
