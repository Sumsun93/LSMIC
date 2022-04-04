/**
 * Package import
 */
import React, { useEffect, useState } from 'react';

/**
 * Local import
 */
import { useAuth } from '../contexts/AuthProvider';
import { useSocket } from '../contexts/SocketProvider';
import { useUsers } from '../contexts/UsersProvider';
import { useBadges } from '../contexts/BadgesProvider';
import NavMenu from '../NavMenu';
import User from '../User';

// style
import * as S from './style';

/**
 * Component
 */
const Dashboard = () => {
  return (
    <S.Container>
      <User />
    </S.Container>
  )
}

export default Dashboard;
