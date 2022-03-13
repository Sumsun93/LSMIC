import React, { createContext, ReactNode, useState, useContext } from 'react';

interface AuthContextType {
  user: any;
  signin: (user: { username: string, password: string }) => void;
  changeIsAvailable: (state: boolean) => void;
  updateUser: (data: object) => void
  signout: () => void;
}

let AuthContext = createContext<AuthContextType>(null!);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);

  const signin = (newUser: { username: string, password: string }) => {
    fetch('https://serene-lake-44389.herokuapp.com/api/v1/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: newUser.username,
        password: newUser.password,
      })
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then(setUser)
  };

  const changeIsAvailable = (state: boolean) => {
    setUser({
      ...user,
      isAvailable: state,
    })
  }

  const updateUser = (data: object) => {
    setUser({
      ...user,
      ...data,
    })
  }

  const signout = () => {
    setUser(null);
  };

  let value = { user, signin, changeIsAvailable, updateUser, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
}

export default AuthProvider;
