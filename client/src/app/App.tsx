import { Routes, Route } from 'react-router-dom';
import Carrousel from '../components/NavBar/Carrousel';
import NavBar from '../components/NavBar/NavBar';
import './App.css';


function App() {

  return (
      <div className='App'>
        <NavBar/>
        <Routes>
          <Route path='/' element={<Carrousel/>}></Route>
        </Routes>
      </div>
  );
}

export default App;
