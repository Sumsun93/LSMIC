/**
 * Package import
 */
import React, { useEffect } from 'react';
import { Routes as RoutesProvider, Route } from "react-router-dom";

/**
 * Local import
 */
import NavMenu from './NavMenu';
import Login from './Login';
import RequireAuth from './RequiredAuth';
import Dashboard from './Dashboard';
import Badges from './Badges';
import Settings from './Settings';
import { useSocket } from './contexts/SocketProvider';
import { useAuth } from './contexts/AuthProvider';
import { useUsers } from './contexts/UsersProvider';
import { useBadges } from './contexts/BadgesProvider';

// style
import * as S from './style';

/**
 * Component
 */
const Routes = () => {
    const socket = useSocket();
    const auth = useAuth();
    const users = useUsers();
    const badges = useBadges();

    useEffect(() => {
        if (auth.user && !socket.socket) {
            socket.connect(auth.user.token);
        }
    }, [auth.user]);

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

            socket.on('editInfos', (newInfos) => {
                auth.changeInfos(newInfos);
            })

            socket.on('updateUser', (data) => {
                auth.updateUser({
                    ...data
                });
            })

            socket.on('available', (state) => {
                auth.changeIsAvailable(state);
            })

            socket.emit('getAllUsers');
            socket.emit('getAllBadges');
            socket.emit('getLastInfos');
        }
    }, [socket.socket]);

  return (
      <S.Container>
          <NavMenu />
          <RoutesProvider>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={(
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
            )} />
            <Route path="/badges" element={(
                <RequireAuth isAdmin>
                  <Badges />
                </RequireAuth>
            )} />
              <Route path="/settings" element={(
                  <RequireAuth>
                      <Settings />
                  </RequireAuth>
              )} />
          </RoutesProvider>
      </S.Container>
  );
};

/**
 * Export
 */
export default Routes;
