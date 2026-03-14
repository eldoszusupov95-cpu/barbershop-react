import { useApp } from '../context/AppContext'
import styles from './Navbar.module.css'

export default function Navbar() {
  const { currentUser, setPage, logout } = useApp()

  return (
    <nav className={styles.nav}>
      <div className={styles.logo} onClick={() => setPage('home')}>
        💈 <span>BarberShop</span>
      </div>

      <div className={styles.links}>
        {currentUser ? (
          <>
            <a onClick={() => setPage('home')}>Главная</a>
            <a onClick={() => setPage('booking')}>✂️ Записаться</a>
            <a onClick={() => setPage('mybookings')}>📋 Мои записи</a>
            <span className={styles.user}>👤 {currentUser.name}</span>
            <button className={styles.btnLogout} onClick={logout}>Выйти</button>
          </>
        ) : (
          <>
            <a onClick={() => setPage('home')}>Главная</a>
            <button className={styles.btnLogin} onClick={() => setPage('login')}>Войти</button>
            <button className={styles.btnRegister} onClick={() => setPage('register')}>Регистрация</button>
          </>
        )}
      </div>
    </nav>
  )
}
