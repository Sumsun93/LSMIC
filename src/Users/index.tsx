/**
 * Package import
 */
import React, { useState } from 'react';
import {Button, InputField, TextareaField } from '@oclock/crumble';

/**
 * Local import
 */
import { useAuth } from '../contexts/AuthProvider';
import { useUsers } from '../contexts/UsersProvider';
import { useSocket } from '../contexts/SocketProvider';
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
    const socket = useSocket();

    const handleSaveInfos = () => {
        socket.emit('editInfos', auth.infos);
    };

    return (
        <S.Container>
            <Table data={users.users} />
            <S.Infos>
                <S.InfosTitle>Informations</S.InfosTitle>
                <TextareaField disabled={!auth.user.isAdmin} value={auth.infos} onChange={(evt) => auth.changeInfos(evt.target.value)} />
                {auth.user.isAdmin && <Button variant={"outlined"} onClick={handleSaveInfos}>Enregistrer</Button>}
            </S.Infos>
        </S.Container>
    )
};

export default Users;
