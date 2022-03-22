const normal = {
  fontStyle: 'normal',
  fontWeight: '400',
  lineHeight: '150%',
};
const bold = {
  fontStyle: 'normal',
  fontWeight: '700',
  lineHeight: '150%',
};
const weight600 = {
  fontStyle: 'normal',
  fontWeight: '600',
  lineHeight: '150%',
};
const weight500 = {
  fontStyle: 'normal',
  fontWeight: '500',
  lineHeight: '150%',
};
const display = {
  _1: {
    ...bold,
    fontSize: '4rem',
    letterSpacing: '-1.43px',
  },
  _2: {
    ...normal,
    fontSize: '3.5rem',
    letterSpacing: '-1.25px',
  },
};
const headlines = {
  H1: {
    ...bold,
    fontSize: '2.5rem',
    letterSpacing: '-0.89px',
  },
  H2: {
    ...bold,
    fontSize: '2rem',
    letterSpacing: '-0.69px',
  },
  H3: {
    ...bold,
    fontSize: '1.75rem',
    letterSpacing: '-0.59px',
  },
  H4: {
    ...bold,
    fontSize: '1.5rem',
    letterSpacing: '-0.47px',
  },
  H5: {
    ...bold,
    fontSize: '1.25rem',
    letterSpacing: '-0.33px',
  },
  H6: {
    ...bold,
    fontSize: '1rem',
    letterSpacing: '-0.18px',
  },
};
const specials = {
  blockquotes: {
    ...weight600,
    fontSize: '1.25rem',
    letterSpacing: '-0.33px',
  },
  capitalized: {
    ...weight600,
    fontSize: '0.75em',
    letterSpacing: '1px',
    textTransform: 'uppercase',
  },
  lead: {
    ...bold,
    fontSize: '0.875rem',
    letterSpacing: '-0.09px',
  },
};
const labels = {
  bigLabel: {
    ...weight500,
    fontSize: '1.25rem',
    letterSpacing: '-0.33px',
  },
  label: {
    ...weight500,
    fontSize: '1rem',
    letterSpacing: '-0.18px',
  },
  labelAdjustable: {
    ...weight500,
    fontSize: '1em',
    letterSpacing: '-0.18px',
  },
  smallLabel: {
    ...weight500,
    fontSize: '0.875rem',
    letterSpacing: '-0.09px',
  },
  smallLabelAdjustable: {
    ...weight500,
    fontSize: '0.875em',
    letterSpacing: '-0.09px',
  },
  tinyLabel: {
    ...weight500,
    fontSize: '0.75rem',
    letterSpacing: '0.01px',
  },
  tinyLabelAdjustable: {
    ...weight500,
    fontSize: '0.75em',
    letterSpacing: '0.01px',
  },
  textLink: {
    ...bold,
    fontSize: '0.875rem',
    letterSpacing: '0.75px',
    textTransform: 'uppercase',
  },
};
const bodyText = {
  body: {
    ...normal,
    fontSize: '1rem',
    letterSpacing: '-0.18px',
  },
  smallBody: {
    ...normal,
    fontSize: '0.875rem',
    letterSpacing: '-0.09px',
  },
  smallBodyAdjustable: {
    ...normal,
    fontSize: '0.875em',
    letterSpacing: '-0.09px',
  },
  tinyText: {
    ...normal,
    fontSize: '0.75rem',
    letterSpacing: '0.01px',
  },
  tinyTextAdjustable: {
    ...normal,
    fontSize: '0.75em',
    letterSpacing: '0.01px',
  },
  veryTinyText: {
    ...weight500,
    fontSize: '0.625rem',
    letterSpacing: '0.1px',
  },
  veryTinyTextAdjustable: {
    ...weight500,
    fontSize: '0.625em',
    letterSpacing: '0.1px',
  },
};

export default {
  display,
  headlines,
  specials,
  labels,
  bodyText,
};
