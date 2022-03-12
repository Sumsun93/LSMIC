import React, { createContext, ReactNode, useState, useContext } from 'react';
import io, { Socket } from 'socket.io-client';
import * as events from "events";

interface UsersContextType {
  setNewUsers: (newUsers: any[]) => void,
  users?: any[],
}

let UsersContext = createContext<UsersContextType>(null!);

const UsersProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<any[]>();

  const setNewUsers = (newUsers: any[]) => {
    setUsers(newUsers);
  };

  let value = { setNewUsers, users };

  return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>;
}

export const useUsers = () => {
  return useContext(UsersContext);
}

export default UsersProvider;
