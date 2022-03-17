import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthProvider';
import { useSocket } from '../contexts/SocketProvider';
import { useUsers } from '../contexts/UsersProvider';
import {Box, Button } from '@mui/material';
import UsersList from './UsersList';
import User from './User';

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

      socket.emit('getAllUsers');
    }
  }, [socket.socket]);

  return (
    <Box sx={{ display: 'flex', flexDirection: "column", justifyContent: "center", alignItems: 'center', bgcolor: 'grey.800' }}>
      <Box sx={{ display: 'flex', justifyContent: "center", alignItems: 'flex-start', bgcolor: 'grey.800', padding: '50px 0' }}>
        <UsersList />
        <User />
      </Box>
    </Box>
  )
}

export default Dashboard;
