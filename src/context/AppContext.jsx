import { createContext, useContext, useState } from 'react'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [users, setUsers] = useState({})
  const [bookings, setBookings] = useState([])
  const [page, setPage] = useState('home')

  function register(name, phone, password) {
    const newUser = { name, phone, password }
    setUsers(prev => ({ ...prev, [phone]: newUser }))
    setCurrentUser(newUser)
    return newUser
  }

  function login(phone, password) {
    if (!users[phone]) {
      const newUser = { name: phone, phone, password }
      setUsers(prev => ({ ...prev, [phone]: newUser }))
      setCurrentUser(newUser)
      return { success: true }
    }
    if (users[phone].password === password) {
      setCurrentUser(users[phone])
      return { success: true }
    }
    return { success: false, error: 'Неверный пароль' }
  }

  function logout() {
    setCurrentUser(null)
    setPage('home')
  }

  function addBooking(booking) {
    setBookings(prev => [booking, ...prev])
  }

  function cancelBooking(id) {
    setBookings(prev =>
      prev.map(b => b.id === id ? { ...b, status: 'cancelled' } : b)
    )
  }

  return (
    <AppContext.Provider value={{
      currentUser, page, setPage,
      bookings, addBooking, cancelBooking,
      register, login, logout,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}
