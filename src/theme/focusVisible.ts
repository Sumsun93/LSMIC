const focusVisible = (primary: Record<string, string>) => ({
  ':focus-visible': {
    border: `2px solid ${primary._1}`,
  },
  ':-moz-focusring': {
    border: `2px solid ${primary._1}`,
  },
});

export default focusVisible;
