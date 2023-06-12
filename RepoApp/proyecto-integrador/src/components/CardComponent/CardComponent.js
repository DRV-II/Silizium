import React, { useState, useEffect } from 'react';
import { Box, ThemeProvider, createTheme } from '@mui/system';

const theme = createTheme({
  palette: {
    background: {
      paper: '#fff',
    },
    text: {
      primary: '#173A5E',
      secondary: '#46505A',
    },
    action: {
      active: '#001E3C',
    },
    success: {
      dark: '#009688',
    },
  },
});

export default function Example({ jsonData }) {
  const certification = jsonData.certification;
  const cantidad = jsonData.cantidad;


  const [randomNumber, setRandomNumber] = useState(0);

  useEffect(() => {
    const randomNumber = Math.random() * 10; 
    setRandomNumber(randomNumber.toFixed(2));
  }, []); 

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          bgcolor: 'background.paper',
          boxShadow: 1,
          borderRadius: 2,
          p: 2,
          width: .2,
          minWidth: .2,
          margin: 4
        }}
      >
        <Box sx={{ color: 'text.secondary' }}>{certification}</Box>
        <Box sx={{ color: 'text.primary', fontSize: 34, fontWeight: 'medium' }}>
        {cantidad}
        </Box>
        <Box
          sx={{
            color: 'success.dark',
            display: 'inline',
            fontWeight: 'bold',
            mx: 0.5,
            fontSize: 14,
          }}
        >
          {`+${randomNumber}%`}
        </Box>
        <Box sx={{ color: 'text.secondary', display: 'inline', fontSize: 14 }}>
          vs. last comparison
        </Box>
      </Box>
    </ThemeProvider>
  );
}