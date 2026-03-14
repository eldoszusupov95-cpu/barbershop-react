export const SERVICES = [
  { id: 0, name: 'Мужская стрижка',    icon: '✂️',  duration: '45 мин', price: '800 ₽',  priceNum: 800  },
  { id: 1, name: 'Стрижка + борода',   icon: '😊',  duration: '60 мин', price: '1200 ₽', priceNum: 1200 },
  { id: 2, name: 'Оформление бороды',  icon: '🔨',  duration: '30 мин', price: '600 ₽',  priceNum: 600  },
  { id: 3, name: 'Королевское бритьё', icon: '👑',  duration: '45 мин', price: '1000 ₽', priceNum: 1000 },
  { id: 4, name: 'Детская стрижка',    icon: '😊',  duration: '30 мин', price: '600 ₽',  priceNum: 600  },
  { id: 5, name: 'Укладка',            icon: '💫',  duration: '20 мин', price: '400 ₽',  priceNum: 400  },
]

export const MASTERS = [
  { id: 0, name: 'Алексей Громов',  icon: '💈', spec: 'Барбер высшей категории',     exp: '8 лет' },
  { id: 1, name: 'Дмитрий Волков',  icon: '✂️', spec: 'Мастер классической стрижки', exp: '5 лет' },
  { id: 2, name: 'Игорь Смирнов',   icon: '🔨', spec: 'Специалист по бороде',         exp: '6 лет' },
]

export const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  '18:00', '18:30', '19:00', '19:30',
]

export const MONTHS = [
  'января','февраля','марта','апреля','мая','июня',
  'июля','августа','сентября','октября','ноября','декабря',
]

export function formatDate(dateStr) {
  if (!dateStr) return '—'
  const d = new Date(dateStr + 'T00:00:00')
  return `${d.getDate()} ${MONTHS[d.getMonth()]}`
}

export function getTomorrowDate() {
  const d = new Date()
  d.setDate(d.getDate() + 1)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}
