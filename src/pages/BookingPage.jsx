import { useState } from 'react'
import { useApp } from '../context/AppContext'
import { SERVICES, MASTERS, TIME_SLOTS, formatDate, getTomorrowDate } from '../data/constants'
import styles from './BookingPage.module.css'

const STEP_LABELS = ['Услуга', 'Мастер', 'Дата и время', 'Подтверждение']

function StepsIndicator({ current }) {
  return (
    <div className={styles.steps}>
      {STEP_LABELS.map((label, i) => {
        const n = i + 1
        const done = n < current
        const active = n === current
        return (
          <div key={n} className={styles.stepGroup}>
            <div className={styles.stepItem}>
              <div className={`${styles.circle} ${done ? styles.done : ''} ${active ? styles.active : ''}`}>
                {done ? '✓' : n}
              </div>
              <div className={`${styles.label} ${active ? styles.labelActive : ''} ${done ? styles.labelDone : ''}`}>
                {label}
              </div>
            </div>
            {i < STEP_LABELS.length - 1 && (
              <div className={`${styles.line} ${done ? styles.lineDone : ''}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

export default function BookingPage() {
  const { currentUser, addBooking, setPage } = useApp()
  const [step, setStep] = useState(1)
  const [selectedSvc, setSelectedSvc] = useState(null)
  const [selectedMst, setSelectedMst] = useState(null)
  const [date, setDate] = useState(getTomorrowDate())
  const [time, setTime] = useState(null)

  function goStep(n) {
    setStep(n)
    window.scrollTo(0, 0)
  }

  function confirm() {
    if (selectedSvc === null) { alert('Выберите услугу'); goStep(1); return }
    if (selectedMst === null) { alert('Выберите мастера'); goStep(2); return }
    if (!date) { alert('Выберите дату'); goStep(3); return }
    if (!time) { alert('Выберите время'); goStep(3); return }

    const svc = SERVICES[selectedSvc]
    const mst = MASTERS[selectedMst]
    addBooking({
      id: Date.now(),
      service: svc.name,
      price: svc.priceNum,
      priceStr: svc.price,
      master: mst.name,
      duration: svc.duration,
      date,
      dateStr: formatDate(date),
      time,
      status: 'pending',
      created: new Date().toLocaleDateString('ru-RU'),
    })
    setPage('success')
  }

  const svc = selectedSvc !== null ? SERVICES[selectedSvc] : null
  const mst = selectedMst !== null ? MASTERS[selectedMst] : null

  return (
    <div className={styles.page}>
      <h2 className={styles.title}>Онлайн запись</h2>
      <p className={styles.sub}>Выберите услугу, мастера и удобное время</p>

      <StepsIndicator current={step} />

      {/* ── Step 1: Service ── */}
      {step === 1 && (
        <div className={styles.card}>
          <h3>Выберите услугу</h3>
          <div className={styles.servicesGrid}>
            {SERVICES.map((s, i) => (
              <div
                key={s.id}
                className={`${styles.svcCard} ${selectedSvc === i ? styles.selected : ''}`}
                onClick={() => setSelectedSvc(i)}
              >
                <div className={styles.svcIcon}>{s.icon}</div>
                <div className={styles.svcName}>{s.name}</div>
                <div className={styles.svcDur}>⏱ {s.duration}</div>
                <div className={styles.svcPrice}>{s.price}</div>
              </div>
            ))}
          </div>
          <div className={styles.navBtns}>
            <button className={styles.btnNext} onClick={() => goStep(2)}>Далее →</button>
          </div>
        </div>
      )}

      {/* ── Step 2: Master ── */}
      {step === 2 && (
        <div className={styles.card}>
          <h3>Выберите мастера</h3>
          <div className={styles.mastersGrid}>
            {MASTERS.map((m, i) => (
              <div
                key={m.id}
                className={`${styles.mstCard} ${selectedMst === i ? styles.selected : ''}`}
                onClick={() => setSelectedMst(i)}
              >
                <div className={styles.mstIcon}>{m.icon}</div>
                <div className={styles.mstName}>{m.name}</div>
                <div className={styles.mstSpec}>{m.spec}</div>
                <div className={styles.mstExp}>🥇 {m.exp}</div>
              </div>
            ))}
          </div>
          <div className={styles.navBtns}>
            <button className={styles.btnBack} onClick={() => goStep(1)}>← Назад</button>
            <button className={styles.btnNext} onClick={() => goStep(3)}>Далее →</button>
          </div>
        </div>
      )}

      {/* ── Step 3: Date & Time ── */}
      {step === 3 && (
        <div className={styles.card}>
          <h3>Дата и время</h3>
          <div className={styles.fieldGroup}>
            <label className={styles.fieldLabel}>Дата</label>
            <input
              type="date"
              className={styles.dateInput}
              value={date}
              onChange={e => setDate(e.target.value)}
            />
          </div>
          <label className={styles.fieldLabel}>Время</label>
          <div className={styles.timesGrid}>
            {TIME_SLOTS.map(t => (
              <button
                key={t}
                className={`${styles.timeBtn} ${time === t ? styles.timeBtnSelected : ''}`}
                onClick={() => setTime(t)}
              >
                {t}
              </button>
            ))}
          </div>
          <div className={styles.navBtns}>
            <button className={styles.btnBack} onClick={() => goStep(2)}>← Назад</button>
            <button className={styles.btnNext} onClick={() => goStep(4)}>Далее →</button>
          </div>
        </div>
      )}

      {/* ── Step 4: Confirm ── */}
      {step === 4 && (
        <div className={styles.card}>
          <h3>Подтверждение</h3>
          <div className={styles.confirmTable}>
            <Row label="Услуга"      value={svc?.name || '—'} />
            <Row label="Стоимость"   value={svc?.price || '—'} gold />
            <Row label="Мастер"      value={mst ? `💈 ${mst.name}` : '—'} />
            <Row label="Длительность" value={svc?.duration || '—'} />
            <Row label="Дата"        value={formatDate(date)} />
            <Row label="Время"       value={time || '—'} />
            <Row label="Клиент"      value={currentUser ? `${currentUser.name} · ${currentUser.phone}` : '—'} />
          </div>
          <div className={styles.navBtns}>
            <button className={styles.btnBack} onClick={() => goStep(3)}>← Назад</button>
            <button className={styles.btnConfirm} onClick={confirm}>✓ Записаться</button>
          </div>
        </div>
      )}
    </div>
  )
}

function Row({ label, value, gold }) {
  return (
    <div className={styles.confirmRow}>
      <span className={styles.rowLabel}>{label}</span>
      <span className={`${styles.rowValue} ${gold ? styles.gold : ''}`}>{value}</span>
    </div>
  )
}
