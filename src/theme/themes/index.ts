import light from './light';
import dark from './dark';

const themes: Record<symbol | string, ThemeInterface> = {
  light,
  dark,
  // ici on pourrait à terme venir ajouter le theme Constrasté
  // ou fetch un theme utilisateur
};
export default themes;

export const defaultTheme = light;

export interface ThemeInterface {
  typo: {
    display: {
      _1: {
        fontStyle: string;
        fontWeight: string;
        lineHeight: string;
        fontSize: string;
        letterSpacing: string;
      };
      _2: {
        fontStyle: string;
        fontWeight: string;
        lineHeight: string;
        fontSize: string;
        letterSpacing: string;
      };
    };
    headlines: {
      H1: {
        fontStyle: string;
        fontWeight: string;
        lineHeight: string;
        fontSize: string;
        letterSpacing: string;
      };
      H2: {
        fontStyle: string;
        fontWeight: string;
        lineHeight: string;
        fontSize: string;
        letterSpacing: string;
      };
      H3: {
        fontStyle: string;
        fontWeight: string;
        lineHeight: string;
        fontSize: string;
        letterSpacing: string;
      };
      H4: {
        fontStyle: string;
        fontWeight: string;
        lineHeight: string;
        fontSize: string;
        letterSpacing: string;
      };
      H5: {
        fontStyle: string;
        fontWeight: string;
        lineHeight: string;
        fontSize: string;
        letterSpacing: string;
      };
      H6: {
        fontStyle: string;
        fontWeight: string;
        lineHeight: string;
        fontSize: string;
        letterSpacing: string;
      };
    };
    specials: {
      blockquotes: {
        fontStyle: string;
        fontWeight: string;
        lineHeight: string;
        fontSize: string;
        letterSpacing: string;
      };
      capitalized: {
        fontStyle: string;
        fontWeight: string;
        lineHeight: string;
        fontSize: string;
        letterSpacing: string;
        textTransform: string;
      };
      lead: {
        fontStyle: string;
        fontWeight: string;
        lineHeight: string;
        fontSize: string;
        letterSpacing: string;
      };
    };
    labels: {
      bigLabel: {
        fontStyle: string;
        fontWeight: string;
        lineHeight: string;
        fontSize: string;
        letterSpacing: string;
      };
      label: {
        fontStyle: string;
        fontWeight: string;
        lineHeight: string;
        fontSize: string;
        letterSpacing: string;
      };
      labelAdjustable: {
        fontStyle: string;
        fontWeight: string;
        lineHeight: string;
        fontSize: string;
        letterSpacing: string;
      };
      smallLabel: {
        fontStyle: string;
        fontWeight: string;
        lineHeight: string;
        fontSize: string;
        letterSpacing: string;
      };
      smallLabelAdjustable: {
        fontStyle: string;
        fontWeight: string;
        lineHeight: string;
        fontSize: string;
        letterSpacing: string;
      };
      tinyLabel: {
        fontStyle: string;
        fontWeight: string;
        lineHeight: string;
        fontSize: string;
        letterSpacing: string;
      };
      tinyLabelAdjustable: {
        fontStyle: string;
        fontWeight: string;
        lineHeight: string;
        fontSize: string;
        letterSpacing: string;
      };
      textLink: {
        fontStyle: string;
        fontWeight: string;
        lineHeight: string;
        fontSize: string;
        letterSpacing: string;
        textTransform: string;
      };
    };
    bodyText: {
      body: {
        fontStyle: string;
        fontWeight: string;
        lineHeight: string;
        fontSize: string;
        letterSpacing: string;
      };
      smallBody: {
        fontStyle: string;
        fontWeight: string;
        lineHeight: string;
        fontSize: string;
        letterSpacing: string;
      };
      smallBodyAdjustable: {
        fontStyle: string;
        fontWeight: string;
        lineHeight: string;
        fontSize: string;
        letterSpacing: string;
      };
      tinyText: {
        fontStyle: string;
        fontWeight: string;
        lineHeight: string;
        fontSize: string;
        letterSpacing: string;
      };
      tinyTextAdjustable: {
        fontStyle: string;
        fontWeight: string;
        lineHeight: string;
        fontSize: string;
        letterSpacing: string;
      };
      veryTinyText: {
        fontStyle: string;
        fontWeight: string;
        lineHeight: string;
        fontSize: string;
        letterSpacing: string;
      };
      veryTinyTextAdjustable: {
        fontStyle: string;
        fontWeight: string;
        lineHeight: string;
        fontSize: string;
        letterSpacing: string;
      };
    };
  };
  colors: {
    monochrome: {
      black: string;
      white: string;
    };
    primary: {
      _50: string;
      _100: string;
      _200: string;
      _300: string;
      _400: string;
      _500: string;
      _600: string;
      _700: string;
      _800: string;
      _900: string;
    };
    coolGrey: {
      _50: string;
      _100: string;
      _150: string;
      _200: string;
      _300: string;
      _350: string;
      _400: string;
      _500: string;
      _600: string;
      _700: string;
      _800: string;
      _850: string;
      _900: string;
      _950: string;
    };
    success: {
      _50: string;
      _100: string;
      _200: string;
      _300: string;
      _400: string;
      _500: string;
      _600: string;
      _700: string;
      _800: string;
      _900: string;
    };
    info: {
      _50: string;
      _100: string;
      _200: string;
      _300: string;
      _400: string;
      _500: string;
      _600: string;
      _700: string;
      _800: string;
      _900: string;
    };
    warning: {
      _50: string;
      _100: string;
      _200: string;
      _300: string;
      _400: string;
      _500: string;
      _600: string;
      _700: string;
      _800: string;
      _900: string;
    };
    danger: {
      _50: string;
      _100: string;
      _200: string;
      _300: string;
      _400: string;
      _500: string;
      _600: string;
      _700: string;
      _800: string;
      _900: string;
    };
  };
  shadows: {
    minus1: { boxShadow: string };
    plus1: {
      boxShadow: string;
    };
    plus2: {
      boxShadow: string;
    };
    plus3: {
      boxShadow: string;
    };
    plus4: {
      boxShadow: string;
    };
  };
  text: {
    _1: string;
    _2: string;
    _3: string;
    _4: string;
    _5: string;
    _6: string;
    _7: string;
    _8: string;
    _9: string;
    _10: string;
    _11: string;
  };
  background: {
    _1: string;
    _2: string;
    _3: string;
    _4: string;
    _5: string;
    _6: string;
    _7: string;
    _8: string;
  };
  primary: {
    _1: string;
    _2: string;
    _3: string;
    _4: string;
    _5: string;
  };
  focusVisible: {
    ':focus-visible': { border: string };
    ':-moz-focusring': { border: string };
  };
  srOnly: {
    [key: string]: string;
  };
  button: {
    main: {
      background: {
        _1: string;
        _2: string;
        _3: string;
        _4: string;
      };
      text: { _1: string };
    };
    cancel: {
      background: {
        _1: string;
        _2: string;
      };
      text: {
        _1: string;
        _2: string;
        _3: string;
        _4: string;
      };
    };
    secondary: {
      background: {
        _1: string;
        _2: string;
        _3: string;
        _4: string;
      };
    };
    simple: {
      background: {
        _1: string;
        _2: string;
        _3: string;
      };
    };
    select: {
      background: {
        _1: string;
        _2: string;
      };
    };
  };
  switch: {
    background: {
      inactive: string;
      disabled: string;
    };
    toogle: { disabled: string };
  };
  success: {
    main: string;
    background: string;
    hover: string;
  };
  info: {
    main: string;
    background: string;
    hover: string;
  };
  warning: {
    main: string;
    background: string;
    hover: string;
  };
  danger: {
    main: string;
    background: string;
    hover: string;
  };
}
