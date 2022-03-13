import React, { createContext, ReactNode, useState, useContext } from 'react';
import io, { Socket } from 'socket.io-client';
import * as events from "events";

interface SocketContextType {
  connect: (token: string) => void;
  emit: (eventName: string, data?: object) => void;
  on: (eventName: string, callback: (...args: any[]) => void) => void;
  socket?: Socket,
}

let SocketContext = createContext<SocketContextType>(null!);

const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket>();

  let connect = (token: string) => {
    setSocket(io('https://serene-lake-44389.herokuapp.com', { query: { token } }));
  };

  let emit = (eventName: string, data = {}) => {
    socket?.emit(eventName, data)
  }

  let on = (eventName: string, callback: (...args: any[]) => void) => {
    socket?.on(eventName, callback);
  }

  let value = { connect, emit, on, socket };

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
}

export const useSocket = () => {
  return useContext(SocketContext);
}

export default SocketProvider;
