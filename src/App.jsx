import { AppProvider, useApp } from './context/AppContext'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import BookingPage from './pages/BookingPage'
import SuccessPage from './pages/SuccessPage'
import MyBookingsPage from './pages/MyBookingsPage'

function Router() {
  const { page } = useApp()

  return (
    <>
      <Navbar />
      {page === 'home'       && <HomePage />}
      {page === 'register'   && <RegisterPage />}
      {page === 'login'      && <LoginPage />}
      {page === 'booking'    && <BookingPage />}
      {page === 'success'    && <SuccessPage />}
      {page === 'mybookings' && <MyBookingsPage />}
    </>
  )
}

export default function App() {
  return (
    <AppProvider>
      <Router />
    </AppProvider>
  )
}
