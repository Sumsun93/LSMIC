import { Accordion, AccordionSummary, AccordionDetails, Chip, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, Box, Badge, styled, TextField, InputAdornment, Dialog, DialogContent, DialogActions, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import PhoneIcon from '@mui/icons-material/Phone';
import React, { useEffect, useState } from 'react';
import { useUsers } from '../contexts/UsersProvider';
import { useAuth } from '../contexts/AuthProvider';
import { useSocket } from '../contexts/SocketProvider';

const StyledActiveBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
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
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    },
}));

const UserItem = ({ user, showPhone }: any) => {
    const auth = useAuth();
    const socket = useSocket();

    const [open, setOpen] = useState(false);
    const [editNote, setEditNote] = useState(user.note);

    const handleCopy = (value: string) => (evt: any) => {
        evt.stopPropagation();
        navigator.clipboard.writeText(value);
    }

    const handleDelete = () => {
        socket.emit('deleteUser', {
            _id: user.id,
        });
        setOpen(false);
    }

    const handleAvailable = () => {
        socket.emit('availableOther', {
            id: user.id,
            state: !user.isAvailable,
        })
    }

    const handleSetAdmin = () => {
        socket.emit('updateOtherUser', {
            id: user.id,
            newData: {
                isAdmin: !user.isAdmin,
            }
        })
        setOpen(false);
    }

    const handleReset = () => {
        console.log('TA MERE', user.note);
        setEditNote(user.note);
    }

    const handleSave = () => {
        socket.emit('updateOtherUser', {
            id: user.id,
            newData: {
                note: editNote,
            },
        })
    }

    return (
        <>
            <ListItem onClick={() => setOpen(true)}>
                <ListItemAvatar>
                    {user.isAvailable ? (
                        <StyledActiveBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                        >
                            <Avatar sx={{ width: 30, height: 30, bgcolor: 'text.primary' }}>{user.username[0]}</Avatar>
                        </StyledActiveBadge>
                    ) : (
                        <StyledDeactiveBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant="dot"
                        >
                            <Avatar sx={{ width: 30, height: 30 }}>{user.username[0]}</Avatar>
                        </StyledDeactiveBadge>
                    )}
                </ListItemAvatar>
                <ListItemText
                    primary={<Typography sx={{ display: 'inline', color: user.isAvailable ? 'text.primary' : 'text.disabled' }}>{user.username}</Typography>}
                    sx={{ display: 'flex', justifyContent: 'space-between' }}
                    secondary={
                        (auth.user.isAdmin || showPhone) && (
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    variant="body2"
                                >
                                    <Chip onClick={handleCopy(user.phone)} sx={{ marginLeft: "5px", cursor: 'pointer' }} size={"small"} icon={<PhoneIcon />} label={user.phone} />
                                </Typography>
                                {auth.user.isAdmin && (
                                    <Typography
                                        variant="body2"
                                        sx={{ display: 'inline'}}
                                    >
                                        <Chip onClick={handleCopy(user.bank)} sx={{ marginLeft: "5px", cursor: 'pointer' }} size={"small"} icon={<CreditCardIcon />} label={user.bank} />
                                    </Typography>
                                )}
                            </React.Fragment>
                        )
                    }
                />
            </ListItem>
            {auth.user.isAdmin && (
                <Dialog
                    open={open}
                    keepMounted
                    onClose={() => setOpen(false)}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogContent>
                        <ListItem onClick={() => setOpen(true)}>
                            <ListItemAvatar>
                                {user.isAvailable ? (
                                    <StyledActiveBadge
                                        overlap="circular"
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                        variant="dot"
                                    >
                                        <Avatar sx={{ width: 30, height: 30, bgcolor: 'text.primary' }}>{user.username[0]}</Avatar>
                                    </StyledActiveBadge>
                                ) : (
                                    <StyledDeactiveBadge
                                        overlap="circular"
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                        variant="dot"
                                    >
                                        <Avatar sx={{ width: 30, height: 30 }}>{user.username[0]}</Avatar>
                                    </StyledDeactiveBadge>
                                )}
                            </ListItemAvatar>
                            <ListItemText
                                primary={<Typography sx={{ display: 'inline', color: user.isAvailable ? 'text.primary' : 'text.disabled' }}>{user.username}</Typography>}
                                sx={{ display: 'flex', justifyContent: 'space-between' }}
                                secondary={
                                    (auth.user.isAdmin || showPhone) && (
                                        <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                variant="body2"
                                            >
                                                <Chip onClick={handleCopy(user.phone)} sx={{ marginLeft: "5px", cursor: 'pointer' }} size={"small"} icon={<PhoneIcon />} label={user.phone} />
                                            </Typography>
                                            {auth.user.isAdmin && (
                                                <Typography
                                                    variant="body2"
                                                    sx={{ display: 'inline'}}
                                                >
                                                    <Chip onClick={handleCopy(user.bank)} sx={{ marginLeft: "5px", cursor: 'pointer' }} size={"small"} icon={<CreditCardIcon />} label={user.bank} />
                                                </Typography>
                                            )}
                                        </React.Fragment>
                                    )
                                }
                            />
                        </ListItem>
                        <Box>
                            <TextField value={editNote} onChange={(evt) => setEditNote(evt.target.value)} />
                            <Button onClick={handleSave}>Enregister</Button>
                            <Button onClick={handleReset}>Reinitialiser</Button>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDelete}>Supprimer</Button>
                        <Button onClick={handleSetAdmin}>{user.isAdmin ? 'Mettre intérimaire' : 'Mettre admin'}</Button>
                        <Button onClick={handleAvailable}>{user.isAvailable ? 'Rendre indisponible' : 'Rendre disponible'}</Button>
                    </DialogActions>
                </Dialog>
            )}
        </>
    )
}

const UsersList = () => {
    const user = useAuth();
    const users = useUsers();
    const [searchAdmin, setSearchAdmin] = useState('');
    const [searchIterim, setSearchIterim] = useState('');

    const sortedUsers = users.users?.sort((a, b) => {
        if (a.username < b.username) {
            return -1;
        }

        if (a.username > b.username) {
            return 1;
        }

        return 0;
    }).sort((a, b) => {
        if (a.isAvailable && !b.isAvailable) return -1;
        if (!a.isAvailable && b.isAvailable) return 1;
        return 0;
    });

    return (
        <Box>
            <Box sx={{ width: "500px", marginBottom: '20px' }}>
                <Box sx={{ height: "500px", bgcolor: 'background.default' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '50px', padding: '0 5px' }}>
                        <Typography variant={"h6"} sx={{ color: 'text.primary' }}>Employés LSMIC</Typography>
                        <TextField
                            size="small"
                            sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                            value={searchAdmin}
                            onChange={(evt) => setSearchAdmin(evt.target.value)}
                            placeholder={"rechercher"}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonSearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                    <List sx={{ overflow: 'auto', height: '450px', boxSizing: 'border-box' }}>
                        {sortedUsers?.filter(user => user.isAdmin && user.username.includes(searchAdmin)).map((user) => (
                            <UserItem showPhone user={user} />
                        ))}
                    </List>
                </Box>
            </Box>
            <Box sx={{ width: "500px" }}>
                <Box sx={{ height: "500px", bgcolor: 'background.default' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '50px', padding: '0 5px' }}>
                        <Typography variant={"h6"} sx={{ color: 'text.primary' }}>Intérimaires</Typography>
                        <TextField
                            size="small"
                            sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                            value={searchIterim}
                            onChange={(evt) => setSearchIterim(evt.target.value)}
                            placeholder={"rechercher"}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonSearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>
                    <List sx={{ overflow: 'auto', height: '450px', boxSizing: 'border-box' }}>
                        {sortedUsers?.filter(user => !user.isAdmin && user.username.includes(searchIterim)).map((user) => (
                            <UserItem user={user} />
                        ))}
                    </List>
                </Box>
            </Box>
        </Box>
    );
}

export default UsersList;
