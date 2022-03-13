import React, { createContext, ReactNode, useState, useContext, useCallback } from 'react';
import io, { Socket } from 'socket.io-client';
import * as events from "events";

interface UsersContextType {
  setNewUsers: (newUsers: any[]) => void,
  users?: any[],
  updateUser: ({ userId, newData, deleted }: { userId: string, newData: object, deleted: true }) => void,
}

let UsersContext = createContext<UsersContextType>(null!);

const UsersProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<any[]>();

  const setNewUsers = (newUsers: any[]) => {
    setUsers(newUsers);

  };

  const updateUser = ({ userId, newData, deleted }: { userId: string, newData: object, deleted: boolean }) => {
    if (deleted) {
      setUsers((prevUsers => prevUsers?.filter(usr => usr.id !== userId) || []))
    }
    else {
      setUsers(prevUsers => prevUsers?.map(usr => {
        if (usr.id === userId) {
          return {
            ...usr,
            ...newData,
          };
        }
        return usr;
      }) || []);
    }
  };

  let value = { setNewUsers, users, updateUser };

  return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>;
}

export const useUsers = () => {
  return useContext(UsersContext);
}

export default UsersProvider;
