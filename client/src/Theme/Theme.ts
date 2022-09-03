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
      main: '#E6CCB2',
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
  },
});

export default theme;
