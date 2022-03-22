/*
 * Package Import
 */
import React, { useState } from 'react';

// Theming
import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import {
    ThemeProvider as CrumbleThemeProvider,
    ThemeContext as CrumbleThemeContext,
} from '@oclock/crumble';

/*
 * Local Import
 */
import themes, { ThemeInterface } from '../theme/themes';

/**
 * Types
 */
type ThemeProviderProps = {
    children: React.ReactChild;
};

/**
 * Context
 */
export const ThemeProvider = ({ children }: ThemeProviderProps): React.ReactElement<ThemeInterface> => {
    /**
     * Render
     */
    return (
        <CrumbleThemeProvider>
            {/*
       * @TODO pour le moyen/long terme :
       * Supprimer le Consumer + le ThemeProvider de Émotion.
       *
       * Le Consumer est là en attendant de faire complétement la transition
       * vers Crumble, afin de faire cohabiter les deux Provider ensemble.
       */}
            <CrumbleThemeContext.Consumer>
                {({ theme, setTheme }) => {
                    const themeName = theme ?? 'light';
                    const currentTheme = themes[themeName];

                    return (
                        <EmotionThemeProvider
                            theme={{
                                ...currentTheme,
                                themeName,
                                chooseTheme: setTheme,
                            }}
                        >
                            {children}
                        </EmotionThemeProvider>
                    );
                }}
            </CrumbleThemeContext.Consumer>
        </CrumbleThemeProvider>
    );
};
