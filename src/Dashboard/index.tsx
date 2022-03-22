/**
 * Package import
 */
import React, { useEffect, useState } from 'react';
import {Box, Button } from '@mui/material';
import { Menu } from '@oclock/crumble';

/**
 * Local import
 */
import { useAuth } from '../contexts/AuthProvider';
import { useSocket } from '../contexts/SocketProvider';
import { useUsers } from '../contexts/UsersProvider';
import Users from '../Users';
import UsersList from './UsersList';
import User from './User';
import logo from '../logo.png';

// style
import * as S from './style';

/**
 * Component
 */
const Dashboard = () => {
  const socket = useSocket();
  const auth = useAuth();
  const users = useUsers();

  const [isAvailable, setIsAvailable] = useState(auth.user.isAvailable);

  useEffect(() => {
    socket.connect(auth.user.token);
  }, []);

  useEffect(() => {
    if (socket.socket) {
      socket.on('getAllUsers', (allUsers) => {
        if (!allUsers.find((usr: any) => usr.id === auth.user.id)) {
          auth.signout();
        }
        else {
          users.setNewUsers(allUsers);
        }
      })

      socket.on('updateOtherUser', (data) => {
        users.updateUser(data);
      })

      socket.on('connectUser', (newUser) => {
        users.addUser(newUser);
      })

      socket.on('disconnectUser', () => {
        auth.signout();
      })

      socket.emit('getAllUsers');
    }
  }, [socket.socket]);

  return (
    <S.Container>
      <Menu logoUrl={logo} items={[{ href: '/', icon: 'Dashboard', label: 'Dashboard' }]} user={{ firstname: auth.user.username, lastname: '' }} settingsUrl={{ href: '/settings' }} onDisconnect={auth.signout} />
      <Users />
    </S.Container>
  )
}

export default Dashboard;
