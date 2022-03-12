import {Box, Button, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { useAuth } from './contexts/AuthProvider';
import logo from './logo.png';

const Header = () => {
    const user = useAuth();

    return (
        <Box sx={{ height: '100px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <img style={{ height: '100%' }} src={logo} />
            <div>
                {user.user && <Button onClick={() => user.signout()}>Se deconnecter</Button>}
            </div>
        </Box>
    )
};

export default Header;
