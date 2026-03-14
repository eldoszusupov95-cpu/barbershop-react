import { useState } from 'react'
import { useApp } from '../context/AppContext'
import styles from './AuthPage.module.css'

export default function LoginPage() {
  const { login, setPage } = useApp()
  const [form, setForm] = useState({ phone: '', password: '' })
  const [error, setError] = useState('')

  function handleSubmit() {
    if (!form.phone || !form.password) {
      setError('Заполните все поля'); return
    }
    const result = login(form.phone, form.password)
    if (result.success) {
      setPage('booking')
    } else {
      setError(result.error)
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.icon}>✂️</div>
        <h2>Вход</h2>
        <p className={styles.subtitle}>Войдите в свой аккаунт</p>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.field}>
          <label>Телефон</label>
          <input type="tel" placeholder="+7" value={form.phone}
            onChange={e => setForm(p => ({...p, phone: e.target.value}))} />
        </div>
        <div className={styles.field}>
          <label>Пароль</label>
          <input type="password" placeholder="••••••" value={form.password}
            onChange={e => setForm(p => ({...p, password: e.target.value}))} />
        </div>

        <button className={styles.btnSubmit} onClick={handleSubmit}>
          → Войти
        </button>
        <p className={styles.switch}>
          Нет аккаунта?{' '}
          <a onClick={() => setPage('register')}>Зарегистрироваться</a>
        </p>
      </div>
    </div>
  )
}
