import { useState } from 'react'
import { useApp } from '../context/AppContext'
import styles from './AuthPage.module.css'

export default function RegisterPage() {
  const { register, setPage } = useApp()
  const [form, setForm] = useState({ name: '', phone: '', password: '', password2: '' })
  const [error, setError] = useState('')

  function handleSubmit() {
    if (!form.name || !form.phone || !form.password) {
      setError('Заполните все поля'); return
    }
    if (form.password !== form.password2) {
      setError('Пароли не совпадают'); return
    }
    register(form.name, form.phone, form.password)
    setPage('booking')
  }

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.icon}>✂️</div>
        <h2>Регистрация</h2>
        <p className={styles.subtitle}>Создайте аккаунт для онлайн-записи</p>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.field}>
          <label>Ваше имя</label>
          <input type="text" placeholder="Введите имя" value={form.name}
            onChange={e => setForm(p => ({...p, name: e.target.value}))} />
        </div>
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
        <div className={styles.field}>
          <label>Повторите пароль</label>
          <input type="password" placeholder="••••••" value={form.password2}
            onChange={e => setForm(p => ({...p, password2: e.target.value}))} />
        </div>

        <button className={styles.btnSubmit} onClick={handleSubmit}>
          ✓ Зарегистрироваться
        </button>
        <p className={styles.switch}>
          Уже есть аккаунт?{' '}
          <a onClick={() => setPage('login')}>Войти</a>
        </p>
      </div>
    </div>
  )
}
