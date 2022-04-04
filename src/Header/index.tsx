/**
 * Package import
 */
import React, { useState } from 'react';
import {Button, InputField } from '@oclock/crumble';

/**
 * Local import
 */
import { useAuth } from '../contexts/AuthProvider';
import { useUsers } from '../contexts/UsersProvider';
import { useSocket } from '../contexts/SocketProvider';
import User from '../User';
import wizz from './wizz.mp3';

// style
import * as S from './style';

/**
 * Component
 */
type HeaderProps = {
    title: string;
};

const Header = ({ title }: HeaderProps) => {
    const auth = useAuth();
    const users = useUsers();
    const socket = useSocket();

    let steeveInterval: NodeJS.Timer;
    const audio = new Audio(wizz);

    const [steeveMode, setSteeveMode] = useState<NodeJS.Timer | null>(null);

    const handleClick = () => {
        socket.emit('available', { username: auth.user.username, state: !auth.user.isAvailable });
        auth.changeIsAvailable(!auth.user.isAvailable);
    }

    const handleSteeveMode = () => {
        if (!steeveMode) {
            setSteeveMode(setInterval(() => {
                audio.play();
            }, 1.8e+6));
        } else {
            clearInterval(steeveMode);
            setSteeveMode(null);
        }
    }

    return (
        <S.Container>
            <S.Title>{title}</S.Title>
            <S.Buttons>
                <Button icon={auth.user.isAvailable ? 'Bed' : 'Constructor'} variant={auth.user.isAvailable ? 'danger' : 'primary'} size="xlarge" onClick={handleClick}>
                    {!auth.user.isAvailable ? 'Se rendre disponible' : 'Se rendre indisponible'}
                </Button>
                {/* <Button variant={"text"} icon={steeveMode ? "BellSlash" : "Bell"} size="small" onClick={handleSteeveMode}>
                    {!steeveMode ? 'Activer le mode Steeve' : 'Désactiver le mode Steeve'}
                </Button> */}
            </S.Buttons>
        </S.Container>
    )
};

export default Header;
