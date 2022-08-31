import { Routes, Route } from 'react-router-dom';
import Carrousel from '../components/Carrousel/Carrousel';
import NavBar from '../components/NavBar/NavBar';
import Footer from '../components/Footer/Footer';
import About from '../components/Footer/About';
import './App.css';

function App() {
  return (
  
   <div className='App'>
        <NavBar/>
        <Routes>
          <Route path='/' element={<Carrousel/>}></Route>
          <Route path='/about' element={<About/>}></Route>
        </Routes>
        <Footer/>
      </div>
  );
}

export default App;
