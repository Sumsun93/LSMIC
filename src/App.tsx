/**
 * Package import
 */
import React from 'react';
import { Routes, Route } from "react-router-dom";
import {AppBar, Box, Button, Toolbar, Typography } from '@mui/material';

/**
 * Local import
 */
import { ThemeProvider } from './contexts/ThemeProvider';
import Login from './Login';
import Dashboard from './Dashboard';
import Header from './Header';
import AuthProvider from './contexts/AuthProvider';
import RequireAuth from './RequiredAuth';
import SocketProvider from './contexts/SocketProvider';
import UsersProvider from './contexts/UsersProvider';

import '@oclock/crumble/dist/css/styles.css';


/**
 * Component
 */
function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <SocketProvider>
                    <UsersProvider>
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/" element={(
                                <RequireAuth>
                                    <Dashboard />
                                </RequireAuth>
                            )} />
                        </Routes>
                        <div style={{ position: 'absolute', color: 'grey', bottom: '10px', left: '10px' }}>v1.0.1</div>
                    </UsersProvider>
                </SocketProvider>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
