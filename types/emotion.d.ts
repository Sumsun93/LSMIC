import '@emotion/react';
import { ThemeInterface } from '../src/theme/themes';

declare module '@emotion/react' {
  export interface Theme extends ThemeInterface {
    chooseTheme?: (theme: 'light' | 'dark') => void;
    themeName?: string;
  }
}
