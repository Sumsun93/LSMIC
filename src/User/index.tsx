/**
 * Package import
 */
import React, { useState, useEffect } from 'react';
import { Card, Avatar, InputField, Button } from '@oclock/crumble';

/**
 * Local import
 */
import { useAuth } from '../contexts/AuthProvider';
import { useSocket } from '../contexts/SocketProvider';
import wizz from './wizz.mp3';

// style
import * as S from './style';

/**
 * Component
 */
const User = () => {
    const auth = useAuth();
    const socket = useSocket();
    let steeveInterval: NodeJS.Timer;
    const audio = new Audio(wizz);

    const [steeveMode, setSteeveMode] = useState<NodeJS.Timer | null>(null);

    const [username, setUsername] = useState(auth.user.username);
    const [phone, setPhone] = useState(auth.user.phone);
    const [bank, setBank] = useState(auth.user.bank);

    useEffect(() => {
        socket.socket?.on('updateUser', (data) => {
            auth.updateUser({
                ...data
            })
        });

        socket.socket?.on('available', (state) => {
            auth.changeIsAvailable(state);
        });
    }, [socket.socket]);


    const handleClick = () => {
        socket.emit('available', { username: auth.user.username, state: !auth.user.isAvailable });
        auth.changeIsAvailable(!auth.user.isAvailable);
    }

    const handleSave = () => {
        socket.emit('updateUser', {
            username,
            phone,
            bank,
        });

    }

    const handleReset = () => {
        setUsername(auth.user.username);
        setPhone(auth.user.phone);
        setBank(auth.user.bank);
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

    const disabled = auth.user.username === username && auth.user.phone === phone && auth.user.bank === bank;

    return (
        <S.Container>
            <S.Header>
                <Button icon={auth.user.isAvailable ? 'Bed' : 'Constructor'} variant={auth.user.isAvailable ? 'danger' : 'primary'} size="xlarge" onClick={handleClick}>
                    {!auth.user.isAvailable ? 'Se rendre disponible' : 'Se rendre indisponible'}
                </Button>
                <Button variant={"text"} icon={steeveMode ? "BellSlash" : "Bell"} size="small" onClick={handleSteeveMode}>
                    {!steeveMode ? 'Activer le mode Steeve' : 'Désactiver le mode Steeve'}
                </Button>
            </S.Header>
            <Card>
                <S.CardContent>
                    <S.CardTitle>Votre profil</S.CardTitle>
                    <Avatar firstname={auth.user.username} size="large" status={auth.user.isAvailable ? 'connected' : 'disconnected'} />
                    <InputField placeholder={"Martine Hawley"} label={"Prénom Nom"} type={"text"} onChange={(evt) => setUsername(evt.target.value)} value={username} />
                    <InputField placeholder={"555-XXXXXX"} label={"Numéro de téléphone"} type={"text"} onChange={(evt) => setPhone(evt.target.value)} value={phone} />
                    <InputField placeholder={"XXX-XXXXXX-XX"} label={"Numéro de compte bancaire"} type={"text"} onChange={(evt) => setBank(evt.target.value)} value={bank} />
                    <S.Buttons>
                        <Button onClick={handleSave} disabled={disabled}>Enregistrer</Button>
                        <Button onClick={handleSave} disabled={disabled} variant="text">Réinitialiser</Button>
                    </S.Buttons>
                </S.CardContent>
            </Card>
        </S.Container>
    )
}

export default User;
