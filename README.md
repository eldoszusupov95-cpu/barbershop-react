# BarberShop 💈

Онлайн-запись в барбершоп — React + Vite приложение.

## Структура проекта

```
barbershop/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx              # Точка входа
    ├── App.jsx               # Роутинг
    ├── context/
    │   └── AppContext.jsx    # Глобальный стейт (пользователь, записи)
    ├── data/
    │   └── constants.js      # Услуги, мастера, временные слоты
    ├── styles/
    │   └── global.css        # CSS переменные и сброс стилей
    ├── components/
    │   ├── Navbar.jsx
    │   └── Navbar.module.css
    └── pages/
        ├── HomePage.jsx           # Главная: Hero + Услуги + Мастера
        ├── HomePage.module.css
        ├── RegisterPage.jsx       # Регистрация
        ├── LoginPage.jsx          # Вход
        ├── AuthPage.module.css    # Общие стили для авторизации
        ├── BookingPage.jsx        # 4-шаговая запись
        ├── BookingPage.module.css
        ├── SuccessPage.jsx        # Успешная запись
        ├── SuccessPage.module.css
        ├── MyBookingsPage.jsx     # Мои записи
        └── MyBookingsPage.module.css
```

## Запуск

```bash
# Установить зависимости
npm install

# Запустить dev-сервер
npm run dev

# Собрать для продакшена
npm run build
```

## Страницы

- **Главная** — Hero секция, список услуг, мастера
- **Регистрация / Вход** — авторизация пользователя
- **Запись** — 4 шага: Услуга → Мастер → Дата и время → Подтверждение
- **Успех** — подтверждение записи
- **Мои записи** — история визитов с возможностью отмены

## Технологии

- React 18
- Vite 5
- CSS Modules
- Context API (без внешних библиотек)
