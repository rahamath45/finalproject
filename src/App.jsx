 
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import Register from './Pages/Register';
import Login from './Pages/Login';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';
import Trainers from './Pages/Trainers';

function App() {


  return (
    <>
      <div className=' max-w-8xl mx-auto p-2'>
       <Navbar/>
       <main className='max-w-6xl mx-auto p-4'> 
       <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
         <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/trainers" element={<Trainers />} />
       </Routes>
       </main>
      </div>
    </>
  )
}

export default App
