 
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import Register from './Pages/Register';
import Login from './Pages/Login';
import ForgotPassword from './Pages/ForgotPassword';
import ResetPassword from './Pages/ResetPassword';
import Trainers from './Pages/Trainers';
import CreateTrainer from './Pages/CreateTrainer';
import ProtectedRoute from './Components/ProtectedRoute';
import UpdateTrainer from './Pages/UpdateTrainer';
import ClassesPage from './Pages/classes';
import MyBookings from './Pages/Mybooking';
import CreateBooking from './Pages/Booking';
import PaymentPage from './Pages/Payments';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { Toaster } from 'react-hot-toast';


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
function App() {


  return (
    <>
      <div className=' max-w-8xl mx-auto p-2'>
       <Navbar/>
        <Toaster position="top-center" reverseOrder={false} />
       <Elements stripe={stripePromise}>
       <main className='max-w-6xl mx-auto p-4'> 
       <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
         <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/trainers" element={<Trainers />} />
           <Route path="/trainers/create" element={<ProtectedRoute role="trainer"><CreateTrainer /></ProtectedRoute>} />
           <Route path="/trainers/update/:id" element={<ProtectedRoute role="trainer"><UpdateTrainer/></ProtectedRoute>}/>
           <Route path="/classes" element={<ClassesPage/>}/>
           <Route path="/bookings" element={<ProtectedRoute role="user"><MyBookings/></ProtectedRoute>}/>
            <Route path="/create-booking" element={<ProtectedRoute role="user"><CreateBooking/></ProtectedRoute>}/>
            <Route path="/payment" element={<PaymentPage/>}/>
       </Routes>
       </main>
       </Elements>
      </div>
    </>
  )
}

export default App
