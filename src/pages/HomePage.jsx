import { useApp } from '../context/AppContext'
import { SERVICES, MASTERS } from '../data/constants'
import styles from './HomePage.module.css'

export default function HomePage() {
  const { setPage, currentUser } = useApp()

  function handleBook() {
    setPage(currentUser ? 'booking' : 'register')
  }

  return (
    <div>
      {/* ── Hero ── */}
      <section className={styles.hero}>
        <p className={styles.heroTag}>Премиум Барбершоп</p>
        <h1 className={styles.heroTitle}>
          Твой стиль —<br />
          <span className={styles.gold}>наше мастерство</span>
        </h1>
        <p className={styles.heroSub}>
          Опытные мастера, премиальные инструменты и атмосфера<br />
          настоящего мужского клуба.
        </p>
        <button className={styles.heroBtn} onClick={handleBook}>
          Записаться онлайн
        </button>
      </section>

      {/* ── Services ── */}
      <section className={styles.sectionServices}>
        <p className={styles.sectionLabel}>Что мы предлагаем</p>
        <h2 className={styles.sectionTitle}>Наши услуги</h2>
        <div className={styles.servicesGrid}>
          {SERVICES.map(svc => (
            <div key={svc.id} className={styles.svcCard} onClick={handleBook}>
              <div className={styles.svcIcon}>{svc.icon}</div>
              <div className={styles.svcName}>{svc.name}</div>
              <div className={styles.svcDur}>⏱ {svc.duration}</div>
              <div className={styles.svcPrice}>{svc.price}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Masters ── */}
      <section className={styles.sectionMasters}>
        <p className={styles.sectionLabel}>Профессионалы</p>
        <h2 className={styles.sectionTitleWhite}>Наши мастера</h2>
        <div className={styles.mastersGrid}>
          {MASTERS.map(m => (
            <div key={m.id} className={styles.mstCard}>
              <div className={styles.mstIcon}>{m.icon}</div>
              <div className={styles.mstName}>{m.name}</div>
              <div className={styles.mstSpec}>{m.spec}</div>
              <div className={styles.mstExp}>🥇 Опыт: {m.exp}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
