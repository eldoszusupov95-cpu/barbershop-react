import { useApp } from '../context/AppContext'
import { SERVICES, MASTERS } from '../data/constants'
import styles from './SuccessPage.module.css'

export default function SuccessPage() {
  const { bookings, setPage } = useApp()
  const latest = bookings[0]

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.icon}>🎉</div>
        <h2>Запись создана!</h2>
        {latest && (
          <>
            <p>{latest.service}</p>
            <p>Мастер: {latest.master}</p>
            <p>{latest.dateStr} в {latest.time}</p>
          </>
        )}
        <div className={styles.btns}>
          <button className={styles.btnMain} onClick={() => setPage('mybookings')}>
            Мои записи
          </button>
          <button className={styles.btnSec} onClick={() => setPage('booking')}>
            Записаться ещё
          </button>
        </div>
      </div>
    </div>
  )
}
