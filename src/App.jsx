
import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/SignIn';

function App() {
 

  return (
    <>
  <Router>
    {/* <Home/> */}
      <div className="App">
        <Routes>
          <Route path='/' element={<Signup/>} />
         
        </Routes>
      </div>
    </Router>
    </>
  )
}

export default App
