import Box from '@mui/material/Box';

export default function BoxBasic({ children }) {
  return (
    <Box component="section" sx={{ 
        p: 0,
        m: 0,
        width: '100%',
        height: '100vh',
        backgroundColor: '#1a1a1a'
        }}>
      {children}
    </Box>
  );
}
