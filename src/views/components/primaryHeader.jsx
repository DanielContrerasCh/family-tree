import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import Typography from '@mui/material/Typography';

export default function PrimaryHeader() {
  return (
    <Typography 
      variant="h3" 
      component="h1"
      sx={{
        color: 'white',
        textAlign: 'center',
        padding: '20px',
        margin: 0,
        fontWeight: 300,
        letterSpacing: '0.5px'
      }}
    >
      Family Gallery
    </Typography>
  );
}
