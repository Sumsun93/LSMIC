import { Box, Button, Typography, TextField, Avatar, Badge, styled } from '@mui/material';
import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../contexts/AuthProvider';
import { useSocket } from '../contexts/SocketProvider';
import Missions from './Missions';

const StyledActiveBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 3px ${theme.palette.background.paper}`,
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        '&::after': {
            position: 'absolute',
            top: -1,
            left: -1,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

const StyledDeactiveBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#b70000',
        color: '#b70000',
        boxShadow: `0 0 0 3px ${theme.palette.background.paper}`,
        width: '20px',
        height: '20px',
        borderRadius: '50%',
    },
}));

const User = () => {
    const socket = useSocket();
    const user = useAuth();

    const [username, setUsername] = useState(user.user.username);
    const [phone, setPhone] = useState(user.user.phone);
    const [bank, setBank] = useState(user.user.bank);

    useEffect(() => {
        socket.socket?.on('updateUser', (data) => {
            user.updateUser({
                ...data
            })
        });

        socket.socket?.on('available', (state) => {
            user.changeIsAvailable(state);
        });
    }, [socket.socket]);

    const handleClick = (state: boolean) => () => {
        socket.emit('available', { username: user.user.username, state });
        user.changeIsAvailable(state);
    }

    const handleSave = () => {
        socket.emit('updateUser', {
            username,
            phone,
            bank,
        });

    }

    const handleReset = () => {
        setUsername(user.user.username);
        setPhone(user.user.phone);
        setBank(user.user.bank);
    }

    const saveDisabled = username === user.user.username && phone === user.user.phone && bank === user.user.bank;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', marginLeft: '20px',}}>
            <Box sx={{ width: "500px", boxSizing: 'border-box', paddingBottom: '20px', marginBottom: '20px', height: "500px", bgcolor: 'background.default', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant={"h4"} sx={{ color: 'text.primary' }}>Votre profil</Typography>
                {user.user.isAvailable ? (
                    <StyledActiveBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                    >
                        <Avatar sx={{ fontSize: '2em', width: 70, height: 70, bgcolor: 'text.primary' }}>{user.user.username[0]}</Avatar>
                    </StyledActiveBadge>
                ) : (
                    <StyledDeactiveBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                    >
                        <Avatar sx={{ fontSize: '2em', width: 70, height: 70 }}>{user.user.username[0]}</Avatar>
                    </StyledDeactiveBadge>
                )}
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <TextField sx={{ margin: '10px 0' }} label={"Prénom Nom"} value={username} onChange={(evt) => setUsername(evt.target.value)} />
                    <TextField sx={{ margin: '10px 0' }} label={"Numéro de téléphone"} value={phone} onChange={(evt) => setPhone(evt.target.value)} />
                    <TextField sx={{ margin: '10px 0' }} label={"Compte bancaire"} value={bank} onChange={(evt) => setBank(evt.target.value)} />
                    <Button disabled={saveDisabled} onClick={handleSave}>Sauvegarder</Button>
                    <Button disabled={saveDisabled} onClick={handleReset}>Reinitialiser</Button>
                </Box>
                <Box>
                    {user.user.isAvailable ? (
                        <Button variant={"contained"} onClick={handleClick(false)}>Se rendre indisponible</Button>
                    ) : (
                        <Button variant={"contained"} onClick={handleClick(true)}>Se rendre disponible</Button>
                    )}
                </Box>
            </Box>
            <Missions />
        </Box>
    )
};

export default User;
