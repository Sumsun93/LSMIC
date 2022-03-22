import colors from '../colors';
import typo from '../typo';
import shadows from '../shadows';
import focusVisible from '../focusVisible';
import srOnly from '../srOnly';

const text = {
  _1: colors.coolGrey._50,
  _2: colors.coolGrey._100,
  _3: colors.coolGrey._200,
  _4: colors.coolGrey._300,
  _5: colors.coolGrey._400,
  _6: colors.coolGrey._500,
  _7: colors.coolGrey._600,
  _8: colors.coolGrey._700,
  _9: colors.coolGrey._800,
  _10: colors.coolGrey._900,
  _11: colors.monochrome.black,
};
const background = {
  _1: colors.coolGrey._950,
  _2: colors.coolGrey._900,
  _3: colors.coolGrey._800,
  _4: colors.coolGrey._850,
  _5: colors.coolGrey._700,
  _6: colors.coolGrey._50,
  _7: colors.coolGrey._600,
  _8: colors.coolGrey._800,
};
const primary = {
  _1: colors.primary._300,
  _2: colors.primary._400,
  _3: colors.primary._700,
  _4: colors.primary._800,
  _5: colors.primary._900,
};
// Night Theme
export default {
  typo,
  colors,
  shadows,
  focusVisible: focusVisible(primary),
  srOnly,
  text,
  background,
  primary,
  button: {
    main: {
      background: {
        _1: colors.coolGrey._700,
        _2: colors.coolGrey._600,
        _3: colors.coolGrey._800,
        _4: colors.coolGrey._800,
      },
      text: {
        _1: colors.coolGrey._700,
      },
    },
    cancel: {
      background: {
        _1: colors.coolGrey._700,
        _2: colors.coolGrey._800,
      },
      text: {
        _1: colors.coolGrey._50,
        _2: colors.coolGrey._100,
        _3: colors.coolGrey._200,
        _4: colors.coolGrey._600,
      },
    },
    secondary: {
      background: {
        _1: colors.coolGrey._800,
        _2: colors.coolGrey._700,
        _3: colors.coolGrey._600,
        _4: colors.coolGrey._800,
      },
    },
    simple: {
      background: {
        _1: colors.coolGrey._700,
        _2: colors.coolGrey._600,
        _3: colors.coolGrey._800,
      },
    },
    select: {
      background: {
        _1: colors.coolGrey._850,
        _2: colors.coolGrey._900,
      },
    },
  },
  switch: {
    background: {
      inactive: colors.coolGrey._500,
      disabled: colors.coolGrey._700,
    },
    toogle: {
      disabled: colors.coolGrey._800,
    },
  },
  success: {
    main: colors.success._300,
    background: colors.success._900,
    hover: colors.success._700,
  },
  info: {
    main: colors.info._300,
    background: colors.info._900,
    hover: colors.info._700,
  },
  warning: {
    main: colors.warning._300,
    background: colors.warning._900,
    hover: colors.warning._700,
  },
  danger: {
    main: colors.danger._300,
    background: colors.danger._900,
    hover: colors.danger._700,
  },
};
