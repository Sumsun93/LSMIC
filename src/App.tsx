import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Routes, Route } from "react-router-dom";
import './App.css';
import Login from './Login';
import Dashboard from './Dashboard';
import Header from './Header';
import AuthProvider from './contexts/AuthProvider';
import RequireAuth from './RequiredAuth';
import SocketProvider from './contexts/SocketProvider';
import UsersProvider from './contexts/UsersProvider';
import {AppBar, Box, Button, Toolbar, Typography } from '@mui/material';


function App() {
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <AuthProvider>
                <SocketProvider>
                    <UsersProvider>
                        <Box className="App" sx={{ bgcolor: 'background.default', }}>
                            <Header />
                            <Routes>
                                <Route path="/login" element={<Login />} />
                                <Route path="/" element={(
                                    <RequireAuth>
                                        <Dashboard />
                                    </RequireAuth>
                                )} />
                            </Routes>
                            <div style={{ color: 'grey', marginTop: '10px' }}>v1.0.0</div>
                        </Box>
                    </UsersProvider>
                </SocketProvider>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
