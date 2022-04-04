/**
 * Package import
 */
import React from 'react';
import { Menu } from '@oclock/crumble';

/**
 * Local import
 */
import logo from './logo.png';
import { useAuth } from './contexts/AuthProvider';

// style
import * as S from './style';

/**
 * Component
 */
const NavMenu = () => {
    const auth = useAuth();

    let items: any[];

    if (auth.user?.isAdmin) {
        items = [
            { to: '/', icon: 'Dashboard', label: 'Dashboard' }, { to: '/badges', icon: 'Tag', label: "Badges" }
        ]
    }
    else {
        items = [
            { to: '/', icon: 'Dashboard', label: 'Dashboard' }
        ]
    }

    if (!auth.user) return null;

    return <Menu
        logoUrl={logo}
        items={items}
        user={{ firstname: auth.user.username || 'test', lastname: '' }}
        onDisconnect={auth.signout}
        settingsUrl={{ to: '/settings' }}
    />
}

export default NavMenu;
