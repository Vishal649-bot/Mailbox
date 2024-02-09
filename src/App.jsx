
import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/SignIn';
import Login from './pages/Login';
import Home from './pages/Home';
import Compose from './pages/Compose';
import Inbox from './pages/Inbox';
import Content from './pages/Content';

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
          <Route path='/Compose' element={<Compose/>} />
          <Route path='/Inbox' element={<Inbox/>} />
          <Route path='/Inbox/:content' element={<Content/>} />
         
        </Routes>
      </div>
    </Router>
    </>
  )
}

export default App
