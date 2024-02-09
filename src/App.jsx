
import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/SignIn';
import Login from './pages/Login';
import Home from './pages/Home';
import Compose from './pages/Compose';
import Inbox from './pages/Inbox';
import Content from './pages/Content';
import Sent from './pages/Sent';

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
          <Route path='/Sent' element={<Sent/>} />
          <Route path='/Sent/:content' element={<Content/>} />
          <Route path='/Inbox' element={<Inbox/>} />
          <Route path='/Inbox/:content' element={<Content/>} />
         
        </Routes>
      </div>
    </Router>
    </>
  )
}

export default App
