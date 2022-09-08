import { Routes, Route } from 'react-router-dom';
import Container from '@mui/material/Container';
import NavBar from '../components/NavBar/NavBar';
import Footer from '../components/Footer/Footer';
import Cards from '../components/Cards/Cards';
import About from '../components/Footer/About';
import ProductDetail from '../components/ProductDetail/ProductDetail';
import Error404 from '../components/Error404/Error404';
import LandingPage from '../pages/LandingPage/LandingPage';
import ContactForm from '../pages/ContactForm/ContactForm';
import Login from '../components/Login/Login';
import Dashboard from '../pages/Dashboard/Dashboard';
import AddProduct from '../pages/Dashboard/Products/AddProduct/AddProduct';
import AddCategory from '../pages/Dashboard/Products/AddCategory/AddCategory';
import AddAtributes from '../pages/Dashboard/Products/AddAtributes/AddAtributes';
import Register from '../components/Register/Register';
import StripePay from '../components/StripePay/StripePay';

function App() {
  return (
    <>
      <NavBar />
      <Container maxWidth='lg' sx={{ width: '100%', mt: '5rem', minHeight: '100vh' }}>
        <Routes>
          <Route path='/' element={<LandingPage />}></Route>
          <Route path='/home' element={<LandingPage />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/products' element={<Cards />}></Route>
          <Route path='/products/:id' element={<ProductDetail />}></Route>
          <Route path='/user' element={<></>}></Route>
          <Route path='/contact' element={<ContactForm />}></Route>
          <Route path='/dashboard' element={<Dashboard></Dashboard>}>
            <Route path='addproduct' element={<AddProduct />}></Route>
            <Route path='addcategory' element={<AddCategory />}></Route>
            <Route path='addatribute' element={<AddAtributes />}></Route>
          </Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='*' element={<Error404></Error404>}></Route>
          <Route path='/test' element={<StripePay></StripePay>}></Route>
        </Routes>
      </Container>
      <Footer />
    </>
  );
}

export default App;
