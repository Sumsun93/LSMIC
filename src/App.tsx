/**
 * Package import
 */
import React from 'react';
import { Routes, Route } from "react-router-dom";
import {Icon, Tooltip, } from '@oclock/crumble';

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
import BadgesProvider from './contexts/BadgesProvider';
import themes from './theme/themes';

// style
import * as S from './style';
import '@oclock/crumble/dist/css/styles.css';

/**
 * Component
 */
// @ts-ignore
function App() {
    return (
        <ThemeProvider>
            <AuthProvider>
                <SocketProvider>
                    <UsersProvider>
                        <BadgesProvider>
                            <Routes>
                                <Route path="/login" element={<Login />} />
                                <Route path="/" element={(
                                    <RequireAuth>
                                        <Dashboard />
                                    </RequireAuth>
                                )} />
                            </Routes>
                            <S.Version>
                                v2.2.0 | Developpé par
                                <Tooltip content={(
                                    <S.TooltipContent>
                                        Je développe des trucs des fois, en ReactJS et NodeJS.
                                        <Icon name={"React"} size={"2rem"} />
                                        <Icon name={"JavaScript"} size={"2rem"} />
                                    </S.TooltipContent>
                                )}>
                                    <a target={"_blank"} href={"https://github.com/Sumsun93"}>Sumsunnn</a>
                                </Tooltip>
                            </S.Version>
                        </BadgesProvider>
                    </UsersProvider>
                </SocketProvider>
            </AuthProvider>
        </ThemeProvider>
    );
}

export default App;
