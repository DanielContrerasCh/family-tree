import FamilyTree from './views/pages/familyTree';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Crear un tema claro con blanco yeso
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#fefefe',
      paper: '#fefefe',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
  },
});

function App() {

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <FamilyTree />
    </ThemeProvider>
  )
}

export default App
