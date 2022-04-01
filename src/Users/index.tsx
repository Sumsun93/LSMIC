/**
 * Package import
 */
import React from 'react';
import { InputField } from '@oclock/crumble';

/**
 * Local import
 */
import { useUsers } from '../contexts/UsersProvider';
import Table from './Table';
import User from '../User';

// style
import * as S from './style';

/**
 * Component
 */
const Users = ({ trollMode }: { trollMode: boolean }) => {
    const users = useUsers();

    return (
        <S.Container>
            <S.Header>
                <S.Title trollMode={trollMode}>{!trollMode ? 'Dashboard' : "Poisson d'avril !!!!"}</S.Title>
            </S.Header>
            <S.Content>
                <Table data={users.users} />
                <User />
            </S.Content>
        </S.Container>
    )
};

export default Users;
