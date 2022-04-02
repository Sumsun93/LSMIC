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
const Users = () => {
    const users = useUsers();

    return (
        <S.Container>
            <S.Header>
                <S.Title>Dashboard</S.Title>
            </S.Header>
            <S.Content>
                <Table data={users.users} />
                <User />
            </S.Content>
        </S.Container>
    )
};

export default Users;
