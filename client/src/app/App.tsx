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
import { PublicRoutes, PrivatesRoutes } from '../routes/routes';
import AuthGuard from '../guards/auth.guard';
import Register from '../components/Register/Register';
import Test from '../pages/Test/Test';
import SearchedProducts from '../pages/SearchedProducts/SearchedProducts';
import Shopping from '../components/Shopping/Shopping';
import RoleGuard from '../guards/role.guard';
import { CheckoutP } from '@/pages/CheckoutP';

function App() {
  return (
    <>
      <NavBar />
      <Container maxWidth='lg' sx={{ width: '100%', mt: '5rem', minHeight: '75vh' }}>
        <Routes>
          <Route path={PublicRoutes.start} element={<LandingPage />} />
          <Route path={PublicRoutes.home} element={<LandingPage />} />
          <Route path={PublicRoutes.about} element={<About />} />
          <Route path={PublicRoutes.products} element={<Cards />} />
          <Route path={PublicRoutes.productsIdParams} element={<ProductDetail />} />
          <Route path={PublicRoutes.contact} element={<ContactForm />} />
          <Route path={PublicRoutes.cart} element={<Shopping />} />
          <Route path='/test' element={<Test></Test>}></Route>
          <Route path={PublicRoutes.searchResult} element={<SearchedProducts />} />

          {/* Private Routes  */}
          <Route element={<AuthGuard />}>
            <Route path={PrivatesRoutes.user} element={<></>} />
            <Route path={PrivatesRoutes.checkout} element={<CheckoutP />} />

            <Route element={<RoleGuard />}>
              <Route path={PrivatesRoutes.dashboard} element={<Dashboard />}>
                <Route path={PrivatesRoutes.addProduct} element={<AddProduct />} />
                <Route path={PrivatesRoutes.addCategory} element={<AddCategory />} />
                <Route path={PrivatesRoutes.addAtribute} element={<AddAtributes />} />
              </Route>
            </Route>
          </Route>

          <Route path={PublicRoutes.login} element={<Login />} />
          <Route path={PublicRoutes.error} element={<Error404 />} />
          <Route path='/register' element={<Register />}></Route>
        </Routes>
      </Container>
      <Footer />
    </>
  );
}

export default App;
