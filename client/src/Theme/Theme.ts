import { createTheme } from '@mui/material';

declare module '@mui/material/styles' {
  interface PaletteOptions {
    neutral: PaletteOptions['primary'];
  }

  interface PaletteOptions {
    variant: PaletteOptions['primary'];
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#f6e9cb',
    },
    neutral: {
      main: '#64748B',
    },
    variant: {
      main: 'yellow',
    },
    secondary: {
      main: '#5d3a00',
    },
    text: {
      primary: 'rgb(72, 35, 7)',
      secondary: 'rgb(161, 114, 78)',
    },
    background: {
      default: 'rgb(255, 254, 253)',
    },
  },
});

export default theme;
