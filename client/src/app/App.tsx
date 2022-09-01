import { Routes, Route } from 'react-router-dom';
import Carrousel from '../components/Carrousel/Carrousel';
import Container from '@mui/material/Container';
import NavBar from '../components/NavBar/NavBar';
import Footer from '../components/Footer/Footer';

import Cards from '../components/Cards/Cards';
import About from '../components/Footer/About';


function App() {
  return (
    <>
      <NavBar />
      <Container maxWidth='lg' sx={{ width: '100%', mt: '5rem' }}>
       
        <Routes>

          <Route path='/home' element={ <Cards />}></Route>
          <Route path='/' element={ <Carrousel />}></Route>
          <Route path='/about' element={<About/>}></Route>
        </Routes>
      </Container>
      <Footer />
    </>
  );
}

export default App;
