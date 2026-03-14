import { useApp } from '../context/AppContext'
import styles from './MyBookingsPage.module.css'

export default function MyBookingsPage() {
  const { bookings, cancelBooking, setPage } = useApp()

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h2>Мои записи</h2>
          <p>История ваших визитов</p>
        </div>
        <button className={styles.btnNew} onClick={() => setPage('booking')}>
          + Записаться
        </button>
      </div>

      {bookings.length === 0 ? (
        <div className={styles.empty}>
          <p className={styles.emptyIcon}>📋</p>
          <p>У вас пока нет записей</p>
        </div>
      ) : (
        bookings.map(b => (
          <div key={b.id} className={styles.item}>
            <div className={styles.itemTop}>
              <span className={`${styles.badge} ${b.status === 'pending' ? styles.pending : styles.cancelled}`}>
                {b.status === 'pending' ? 'Ожидает' : 'Отменено'}
              </span>
              <span className={styles.created}>{b.created}</span>
            </div>

            <h3>{b.service}</h3>
            <p className={styles.master}>💈 {b.master}</p>

            <div className={styles.meta}>
              <div className={styles.metaItem}>
                <label>ДАТА</label>
                <span>{b.dateStr}</span>
              </div>
              <div className={styles.metaItem}>
                <label>ВРЕМЯ</label>
                <span>{b.time}</span>
              </div>
              <div className={styles.metaItem}>
                <label>СУММА</label>
                <span className={styles.gold}>{b.priceStr}</span>
              </div>
            </div>

            {b.status === 'pending' && (
              <button className={styles.btnCancel} onClick={() => cancelBooking(b.id)}>
                ✕ Отменить
              </button>
            )}
          </div>
        ))
      )}
    </div>
  )
}
