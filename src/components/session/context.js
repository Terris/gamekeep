import React, { useContext } from 'react';

export const AuthUserContext = React.createContext({
  authUser: null,
  dbUser: null,
  loading: null,
});

export const useAuthUserContext = () => {
  const { authUser, dbUser, loading } = useContext(AuthUserContext)
  return { authUser, dbUser, loading }
};
