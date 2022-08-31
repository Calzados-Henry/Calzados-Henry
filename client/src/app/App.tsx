import { Routes, Route } from 'react-router-dom';
import Carrousel from '../components/Carrousel/Carrousel';
import Container from '@mui/material/Container';
import NavBar from '../components/NavBar/NavBar';
import Footer from '../components/Footer/Footer';

function App() {
  return (
    <>
      <NavBar />
      <Container maxWidth='lg' sx={{ width: '100%', mt: '5rem' }}>
        <Carrousel />
        <Routes>
          <Route path='/' element={<></>}></Route>
        </Routes>
      </Container>
      <Footer />
    </>
  );
}

export default App;
