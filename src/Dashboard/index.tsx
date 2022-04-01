/**
 * Package import
 */
import React, { useEffect, useState } from 'react';
import { Menu } from '@oclock/crumble';

/**
 * Local import
 */
import { useAuth } from '../contexts/AuthProvider';
import { useSocket } from '../contexts/SocketProvider';
import { useUsers } from '../contexts/UsersProvider';
import { useBadges } from '../contexts/BadgesProvider';
import Users from '../Users';
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
  const badges = useBadges();

  const [enabled, setEnabled] = useState(true);

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

      socket.on('getAllBadges', (allBadges) => {
        badges.setNewBadges(allBadges);
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

      socket.on('newBadge', (newBadge) => {
        badges.addBadge(newBadge);
      })

      socket.on('deleteBadge', (badgeId) => {
        badges.deleteBadge(badgeId);
      })

      socket.emit('getAllUsers');
      socket.emit('getAllBadges');
    }
  }, [socket.socket]);

  return (
    <S.Container isAvailable={auth.user.isAvailable && enabled}>
      <Menu logoUrl={logo} items={[{ href: '/', icon: 'Dashboard', label: 'Dashboard' }]} user={{ firstname: auth.user.username, lastname: '' }} onDisconnect={auth.signout} />
      <Users trollMode={auth.user.isAvailable && enabled} />
      <S.DisableApril enabled={auth.user.isAvailable && enabled} onClick={() => setEnabled(!enabled)}>{enabled ? 'Désactiver le 1er avril' : 'Activer le 1er avril'}</S.DisableApril>
    </S.Container>
  )
}

export default Dashboard;
