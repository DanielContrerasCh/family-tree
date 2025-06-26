import Box from '@mui/material/Box';

export default function BoxBasic({ children, sx = {} }) {
  const defaultSx = {
    p: 0,
    m: 0,
    width: '100%',
    minHeight: '100vh',
  };

  return (
    <Box component="section" sx={{ ...defaultSx, ...sx }}>
      {children}
    </Box>
  );
}
