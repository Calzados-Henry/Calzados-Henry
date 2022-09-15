import { Routes, Route } from 'react-router-dom';
import Container from '@mui/material/Container';
import NavBar from '../components/NavBar/NavBar';
import Footer from '../components/Footer/Footer';
import About from '../components/Footer/About';
import LandingPage from '../pages/LandingPage/LandingPage';
import ContactForm from '../pages/ContactForm/ContactForm';
import IMAGEN from '@/pages/Dashboard/Products/AddProduct/adproduc2'; 
import AddProduct from '../pages/Dashboard/Products/AddProduct/AddProduct';
import AddCategory from '../pages/Dashboard/Products/AddCategory/AddCategory';
import AddAttributes from '../pages/Dashboard/Products/AddAttributes/AddAttributes';
import { PublicRoutes, PrivatesRoutes } from '../routes/routes';
import AuthGuard from '../guards/auth.guard';
import Test from '../pages/Test/Test';
import SearchedProducts from '../pages/SearchedProducts/SearchedProducts';
import RoleGuard from '../guards/role.guard';
import { CheckoutP } from '@/pages/CheckoutP';
import { lazy, Suspense } from 'react';
import Loader from './Loader';
import { Orders, Address } from '@/pages/UserSettings';
import Profile from '@/pages/UserSettings/Profile/Profile';
import Favorites from '@/pages/UserSettings/Favorites/Favorites';
// Lazy Loading
const Cards = lazy(() => import('@/components/Cards/Cards'));
const ProductDetail = lazy(() => import('@/components/ProductDetail/ProductDetail'));
const Dashboard = lazy(() => import('@/pages/Dashboard/Dashboard'));
const Shopping = lazy(() => import('@/components/Shopping/Shopping'));
const Login = lazy(() => import('@/components/Login/Login'));
const Register = lazy(() => import('@/components/Register/Register'));
const Error404 = lazy(() => import('@/components/Error404/Error404'));
const UserSettings = lazy(() => import('@/pages/UserSettings/UserSettings'));

function App() {
  return (
    <>
      <NavBar />
      <Suspense fallback={<Loader />}>
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
              <Route path={PrivatesRoutes.user} element={<></>}></Route>
              <Route path={PrivatesRoutes.settings} element={<UserSettings />}>
                <Route path={PrivatesRoutes.profile} element={<Profile />} />
                <Route path={PrivatesRoutes.addaddress} element={<Address />} />
                <Route path={PrivatesRoutes.favorites} element={<Favorites />} />
                <Route path={PrivatesRoutes.userOrders} element={<Orders />} />
              </Route>

              <Route element={<RoleGuard />}>
                <Route path={PrivatesRoutes.dashboard} element={<Dashboard />}>
                  <Route path={PrivatesRoutes.addProduct} element={<AddProduct />} />
                  <Route path={PrivatesRoutes.addCategory} element={<AddCategory />} />
                  <Route path={PrivatesRoutes.addAttribute} element={<AddAttributes />} />
                </Route>
              </Route>
            </Route>

            <Route path={PublicRoutes.login} element={<Login />} />
            <Route path={PublicRoutes.error} element={<Error404 />} />
            <Route path='/register' element={<Register />}></Route>
            <Route path={PublicRoutes.adproduc} element={<AddProduct />}></Route>
          </Routes>
        </Container>
      </Suspense>

      <Footer />
    </>
  );
}

export default App;
