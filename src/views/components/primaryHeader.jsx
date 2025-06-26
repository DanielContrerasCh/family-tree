import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Typography from '@mui/material/Typography';

export default function PrimaryHeader({ text, children }) {
  return (
    <Typography 
      variant="h1" 
      component="h1"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
        margin: 0,
        fontWeight: 500,
        letterSpacing: '0.5px',
      }}
    >
      {text} {children}
    </Typography>
  );
}
