import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

const breakpoints = {
  sm: "320px",
  md: "768px",
  lg: "1024px",
  xl: "1200px",
};

export const theme = extendTheme({
    breakpoints,
    initialColorMode: 'dark',
    primary: {
      background: '#FBF7EF',
      link: '#4A5568',
      card: '#ffffff',
      inputHelper: '#CBD5E0',
      mainButton: 'yellow'
    },
    secondary: {
      background: '#FBF7EF',
      link: '#4A5568',
      card: '#ffffff',
      inputHelper: '#CBD5E0'
    },
    fonts: {
      body: 'Inter, system-ui, sans-serif'
    },
    toggleBtnActive: {
      bg: '#fff',
      fill: '#2A3342'
    },
    toggleBtnUnactive: {
      bg: 'transparent',
      fill: '#9AC2DA'
    },
    colors: {
      discord: '#7289da',
      primary: '#E0FBFC',
      primaryWhite: '#E0FBFC',
      primaryButton: '#CA002D',
      secondaryButton: '#4890F9',
      white: '#fff',
      secondaryS: '#98C1D9',
      secondaryRGB: '255, 255, 255',
      placeholderColor: '#fff',
      mainOrange: '#fff',
      mainOrangeS: '#ee6c4d',
      mainOrangeR: '#ee6c4d',
      orangeToTransparent: 'transparent',
      mainBlue: '#fff',
      mainBlueS: '#3D5A80',
      whiteToDark: '#293241',
      darkToWhite: '#fff',
      cardBorder: '#3D5A80',
      cardShadow: '#FFFFFF0D',
      darkToBlue: '#3D5A80'
    },
    shadows: {
      largeSoft: 'rgba(60, 64, 67, 0.15) 0px 2px 10px 6px;'
    },
    styles: {
      global: (props: Record<string, any>) => ({
        'html, #__next': {
          height: '100%'
        },
        '#__next': {
          display: 'flex',
          flexDirection: 'column'
        },
        '.body': {
          height: '100%',
          overflowY: 'scroll'
        },
        body: {
          bg: mode('white', '#040D21 0% 0% no-repeat padding-box')(props),
          color: mode('black', 'white')(props)
        },
        html: {
          scrollBehavior: 'smooth'
        },
        '#nprogress': {
          pointerEvents: 'none'
        },
        '#nprogress .bar': {
          background: 'green.200',
          position: 'fixed',
          zIndex: '1031',
          top: 0,
          left: 0,
          width: '100%',
          height: '2px'
        }
      })
    }
  });
