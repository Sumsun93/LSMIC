/**
 * Package import
 */
import React from 'react';

/**
 * Local import
 */
import { useUsers } from '../contexts/UsersProvider';
import Table from './Table';

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
            </S.Content>
        </S.Container>
    )
};

export default Users;
