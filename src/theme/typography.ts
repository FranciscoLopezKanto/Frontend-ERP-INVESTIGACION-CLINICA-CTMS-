import fonts from '../types/fonts';

const typography = {
  fontFamily: fonts.family.body,

  h1: {
    fontFamily: fonts.family.heading,
    fontWeight: 700,
    fontSize: '32px',
    lineHeight: '1.2',
  },

  h2: {
    fontFamily: fonts.family.heading,
    fontWeight: 600,
    fontSize: '28px',
    lineHeight: '1.2',
  },

  h3: {
    fontFamily: fonts.family.heading,
    fontWeight: 500,
    fontSize: '24px',
    lineHeight: '1.5',
  },

  h4: {
    fontFamily: fonts.family.heading,
    fontWeight: 500,
    fontSize: '20px',
    lineHeight: '1.5',
  },

  h5: {
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '1.5',
  },

  h6: {
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '1.5',
  },

  subtitle1: {
    fontWeight: 400,
    fontSize: '14px',
    lineHeight: '1.5',
  },

  subtitle2: {
    fontWeight: 300,
    fontSize: '12px',
    lineHeight: '1.5',
  },

  body1: {
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '1.75',
  },

  body2: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '1.75',
  },

  button: {
    fontSize: '14px',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },

  caption: {
    fontSize: '12px',
    fontWeight: 300,
    lineHeight: '1.5',
  },

  overline: {
    fontSize: '12px',
    fontWeight: 500,
    textTransform: 'uppercase',
    lineHeight: '1.2',
  },
};

export default typography;
