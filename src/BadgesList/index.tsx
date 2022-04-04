/**
 * Package import
 */
import React from 'react';
import {Button, InputField } from '@oclock/crumble';

/**
 * Local import
 */
import { useAuth } from '../contexts/AuthProvider';
import { useUsers } from '../contexts/UsersProvider';
import { useBadges } from '../contexts/BadgesProvider';
import Header from '../Header';
import Table from './Table';
import User from '../User';

// style
import * as S from './style';

/**
 * Component
 */
const Users = () => {
    const auth = useAuth();
    const users = useUsers();
    const badges = useBadges();

    return (
        <S.Container>
            <Header title="Gestion des Badges" />
            <S.Content>
                <Table data={badges.badges} />
            </S.Content>
        </S.Container>
    )
};

export default Users;
