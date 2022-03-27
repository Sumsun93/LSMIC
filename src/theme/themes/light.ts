import colors from '../colors';
import typo from '../typo';
import shadows from '../shadows';
import focusVisible from '../focusVisible';
import srOnly from '../srOnly';

const text = {
  _1: colors.coolGrey._900,
  _2: colors.coolGrey._800,
  _3: colors.coolGrey._700,
  _4: colors.coolGrey._600,
  _5: colors.coolGrey._500,
  _6: colors.coolGrey._400,
  _7: colors.coolGrey._300,
  _8: colors.coolGrey._200,
  _9: colors.coolGrey._100,
  _10: colors.coolGrey._50,
  _11: colors.monochrome.white,
};
const background = {
  _1: colors.coolGrey._350,
  _2: colors.monochrome.white,
  _3: colors.coolGrey._50,
  _4: colors.coolGrey._150,
  _5: colors.coolGrey._200,
  _6: colors.coolGrey._900,
  _7: colors.coolGrey._300,
  _8: colors.coolGrey._100,
};
const primary = {
  _1: colors.primary._600,
  _2: colors.primary._500,
  _3: colors.primary._200,
  _4: colors.primary._100,
  _5: colors.primary._50,
};

// Day Theme
export default {
  typo,
  colors,
  shadows,
  text,
  background,
  primary,
  focusVisible: focusVisible(primary),
  srOnly,
  button: {
    main: {
      background: {
        _1: colors.coolGrey._900,
        _2: colors.coolGrey._800,
        _3: colors.coolGrey._700,
        _4: colors.coolGrey._200,
      },
      text: {
        _1: colors.coolGrey._300,
      },
    },
    cancel: {
      background: {
        _1: colors.coolGrey._300,
        _2: colors.coolGrey._200,
      },
      text: {
        _1: colors.coolGrey._900,
        _2: colors.coolGrey._700,
        _3: colors.coolGrey._600,
        _4: colors.coolGrey._300,
      },
    },
    secondary: {
      background: {
        _1: colors.primary._600,
        _2: colors.primary._500,
        _3: colors.primary._400,
        _4: colors.primary._200,
      },
    },
    simple: {
      background: {
        _1: colors.monochrome.white,
        _2: colors.coolGrey._50,
        _3: colors.coolGrey._100,
      },
    },
    select: {
      background: {
        _1: colors.coolGrey._50,
        _2: colors.coolGrey._150,
      },
    },
  },
  switch: {
    background: {
      inactive: colors.coolGrey._400,
      disabled: colors.coolGrey._300,
    },
    toogle: {
      disabled: colors.coolGrey._50,
    },
  },
  success: {
    main: colors.success._600,
    background: colors.success._50,
    hover: colors.success._200,
  },
  info: {
    main: colors.info._600,
    background: colors.info._50,
    hover: colors.info._200,
  },
  warning: {
    main: colors.warning._600,
    background: colors.warning._50,
    hover: colors.warning._200,
  },
  danger: {
    main: colors.danger._600,
    background: colors.danger._50,
    hover: colors.danger._200,
  },
};
