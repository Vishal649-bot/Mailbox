
import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/SignIn';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
 

  return (
    <>
  <Router>
    {/* <Home/> */}
      <div className="App">
        <Routes>
          <Route path='/' element={<Signup/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/Home' element={<Home/>} />
         
        </Routes>
      </div>
    </Router>
    </>
  )
}

export default App
