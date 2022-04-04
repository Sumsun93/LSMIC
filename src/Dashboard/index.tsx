/**
 * Package import
 */
import React, { useEffect, useState } from 'react';
import { TextareaField } from '@oclock/crumble';

/**
 * Local import
 */
import { useAuth } from '../contexts/AuthProvider';
import { useSocket } from '../contexts/SocketProvider';
import { useUsers } from '../contexts/UsersProvider';
import { useBadges } from '../contexts/BadgesProvider';
import NavMenu from '../NavMenu';
import Users from '../Users';
import logo from '../logo.png';

// style
import * as S from './style';
import Header from '../Header';

/**
 * Component
 */
const Dashboard = () => {
    return (
    <S.Container>
        <Header title="Dashboard" />
        <Users />
    </S.Container>
  )
}

export default Dashboard;
