import { Routes, Route } from 'react-router-dom';
import Container from '@mui/material/Container';
import NavBar from '../components/NavBar/NavBar';
import Footer from '../components/Footer/Footer';
import Cards from '../components/Cards/Cards';
import About from '../components/Footer/About';
import ProductDetail from '../components/ProductDetail/ProductDetail';
import Error404 from '../components/Error404/Error404';
import LandingPage from '../pages/LandingPage';

function App() {
  return (
    <>
      <NavBar />
      <Container maxWidth='lg' sx={{ width: '100%', mt: '5rem' }}>
        <Routes>
          <Route path='/' element={<LandingPage />}></Route>
          <Route path='/home' element={<Cards />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/products' element={<Cards />}></Route>
          <Route path='/products/:id' element={<ProductDetail />}></Route>
          <Route path='*' element={<Error404></Error404>}></Route>
        </Routes>
      </Container>
      <Footer />
    </>
  );
}

export default App;
