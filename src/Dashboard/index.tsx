/**
 * Package import
 */
import React, { useEffect, useState } from 'react';
import {Icon, TextareaField } from '@oclock/crumble';

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
        <S.Alert>
            <Icon name="ExclamationTriangle" size="1rem" />
            La disponibilité n'est plus modifiée quand vous quittez la page. Merci de vous passer indisponible quand vous n'êtes plus disponible.
        </S.Alert>
    </S.Container>
  )
}

export default Dashboard;
