/* eslint-disable max-len */
const colors = {
    darkBlue: '#00004C',
    blue: '#0C77F8',
    lightBlue: '#F9FCFF',
    darkPurple: '#5A5A81',
    purple: '#A2ADEB',
    lightPurple: '#D9DAF2',
    light: '#EBEBF1',
    extraLight: '#F7F7FB',
    white: '#FFFFFF',
    dark: '#191A41',
    extraDark: '#141534',
    black: '#111111',
    green: '#26E29C',
    red: '#F55959',
    orange: '#F7931A',
    gray: '#F5F8FC',
    darkGray: '#7A7A7A'
  };
  
  const pallets = {
    primary: colors.lightBlue,
    secondary: colors.darkBlue,
    error: colors.red,
    warning: colors.orange,
    info: colors.lightPurple,
    success: colors.green
  };
  
  const gradients = {
    extraDarkHorizontal:
      'linear-gradient(253.4deg, #0E0F25 34.02%, #23244B 88.52%)',
    darkHorizontal: 'linear-gradient(280.21deg, #23244B 0.54%, #4E51FF 100%)',
    lightHorizontal:
      'linear-gradient(270deg, rgba(151, 204, 252, 0) 0.07%, #74BBFC 99.26%);',
    extraDarkVertical: 'linear-gradient(0deg, #0E0F25 34.02%, #23244B 88.52%)',
    darkVertical: 'linear-gradient(0deg, #23244B 0.54%, #4E51FF 100%)',
    lightVertical:
      'linear-gradient(0deg, rgba(151, 204, 252, 0) 0.07%, #74BBFC 99.26%)'
  };
  
  const socialMediaColor = {
    linkedin: '#0c66c2',
    twitter: '#1ea1f2',
    facebook: '#4867aa',
    instagram: '#232020',
    medium: '#1c1a19',
    youtube: '#ff0typographyConfig.fontWeightRegular',
    reddit: '#ff4500'
  };
  
  const shadow = {
    one: '0px 0.063 0.25 rgba(52, 60, 68, 0.1)',
    two:
      '0px 0px 0.063 rgba(117, 131, 142, 0.04), 0px 2px 4px rgba(52, 60, 68, 0.16)',
    three:
      '0px 0px 2px rgba(117, 131, 142, 0.04), 0px 4px 8px rgba(52, 60, 68, 0.16)',
    four:
      '0px 22px 24px rgba(157, 157, 174, 0.04), 0px 6px 6px rgba(157, 157, 174, 0.03)',
    five:
      '0px 100px 80px rgba(157, 157, 174, 0.07), 0px 22px 24px rgba(157, 157, 174, 0.04), 0px 16px 10px rgba(157, 157, 174, 0.04), 0px 6px 6px rgba(157, 157, 174, 0.03);',
    six:
      '0px 100px 80px rgba(157, 157, 174, 0.07), 0px 41.7776px 33.4221px rgba(157, 157, 174, 0.0503198), 0px 22px 24px rgba(157, 157, 174, 0.04), 0px 16px 10px rgba(157, 157, 174, 0.04), 0px 6px 6px rgba(157, 157, 174, 0.03), 0px 2.76726px 2.21381px rgba(157, 157, 174, 0.0196802)'
  };
  
  const typographyConfig = {
    fontFamilyOpenSans: '"Open Sans", sans-serif',
    fontFamilyRobotoSlab: '"Roboto Slab", serif',
    fontWeightThin: 100,
    fontWeightExtraLight: 200,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightSemiBold: 600,
    fontWeightBold: 700,
    fontWeightExtraBold: 800,
    fontWeightBlack: 900
  };
  
  const typographyVariant = {
    h1: {
      fontWeight: typographyConfig.fontWeightSemiBold,
      fontSize: '46px',
      lineHeight: '63px',
      letterSpacing: '-1.5px'
    },
    h2: {
      fontWeight: typographyConfig.fontWeightBold,
      fontSize: '40px',
      lineHeight: '60px',
      letterSpacing: '-0.5px'
    },
    h3: {
      fontWeight: typographyConfig.fontWeightSemiBold,
      fontSize: '36px',
      lineHeight: '49px',
      letterSpacing: '-0.5px'
    },
    h4: {
      fontWeight: typographyConfig.fontWeightBold,
      fontSize: '24px',
      lineHeight: '33px',
      letterSpacing: 'normal'
    },
    h5: {
      fontWeight: typographyConfig.fontWeightSemiBold,
      fontSize: '22px',
      lineHeight: '30px',
      letterSpacing: 'normal'
    },
    h6: {
      fontWeight: typographyConfig.fontWeightBold,
      fontSize: '20px',
      lineHeight: '27px',
      letterSpacing: '0.25px'
    },
    subheading1: {
      fontWeight: typographyConfig.fontWeightRegular,
      fontSize: '18px',
      lineHeight: '24px',
      letterSpacing: '0.15px'
    },
    subheading2: {
      fontWeight: typographyConfig.fontWeightSemiBold,
      fontSize: '14px',
      lineHeight: '20px',
      letterSpacing: '0.15px'
    },
    subheading3: {
      fontWeight: typographyConfig.fontWeightSemiBold,
      fontSize: '13px',
      lineHeight: '18px',
      letterSpacing: '0.15px'
    },
    body1: {
      fontWeight: typographyConfig.fontWeightRegular,
      fontSize: '16px',
      lineHeight: '22px',
      letterSpacing: 'normal'
    },
    body2: {
      fontWeight: typographyConfig.fontWeightRegular,
      fontSize: '15px',
      lineHeight: '24px',
      letterSpacing: 'normal'
    },
    body3: {
      fontWeight: typographyConfig.fontWeightRegular,
      fontSize: '14px',
      lineHeight: '24px',
      letterSpacing: 'normal'
    },
    body4: {
      fontWeight: typographyConfig.fontWeightRegular,
      fontSize: '13px',
      lineHeight: '24px',
      letterSpacing: 'normal'
    },
    button: {
      fontWeight: typographyConfig.fontWeightBold,
      fontSize: '16px',
      lineHeight: '16px',
      letterSpacing: 'normal'
    },
    buttonSmall: {
      fontWeight: typographyConfig.fontWeightBold,
      fontSize: '14px',
      lineHeight: '16px',
      letterSpacing: 'normal'
    },
    caption1: {
      fontWeight: typographyConfig.fontWeightSemiBold,
      fontSize: '12px',
      lineHeight: '16px',
      letterSpacing: '0.4px'
    },
    caption2: {
      fontWeight: typographyConfig.fontWeightRegular,
      fontSize: '12px',
      lineHeight: '16px',
      letterSpacing: '0.4px'
    },
    overline: {
      fontWeight: typographyConfig.fontWeightSemiBold,
      fontSize: '10px',
      lineHeight: '16px',
      letterSpacing: '1px'
    }
  };
  
  const convertPxToRem = (pxSize: number): string => {
    // eslint-disable-next-line prefer-const
    let defaultPxSize = 16;
    /* // can be fix letter on
    if(currentResolution < breakPoints.sm){
      defaultPxSize = 14;
    }
    */
    return `${pxSize / defaultPxSize}rem`;
  };
  
  const typography = {
    variant: typographyVariant,
    config: typographyConfig,
    pxToRem: convertPxToRem
  };
  
  const breakPoints = {};
  
  const mixins = {
    // Can be improve letter on
    styledStroke: `
      position: relative;
      &::before {
          content: "";
          padding-left: 6.25rem;
      }
      &::after {
          content: "";
          width: 4.5625rem;
          height: 0.1875rem;
          display: block;
          position: absolute;
          top: 1.875rem;
          background-image: ${gradients.lightHorizontal}
          );
      }
      `
  };
  
  const theme = {
    pallets,
    colors,
    gradients,
    socialMediaColor,
    shadow,
    typography,
    breakPoints,
    mixins
  };
  
  export default theme;