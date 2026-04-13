# CryptoPilot

A modern, full-stack cryptocurrency trading and analytics platform under development , designed to track assets, analyze crypto trends, and simulate automated trading strategies with a responsive interface.

---

## Tech Stack

### Frontend
- ![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white)
- ![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=black)
- ![Tailwind CSS](https://img.shields.io/badge/-Tailwind%20CSS-06B6D4?logo=tailwind-css&logoColor=white)
- ![Framer Motion](https://img.shields.io/badge/-Framer%20Motion-0055FF?logo=framer&logoColor=white)
- ![Chart.js](https://img.shields.io/badge/-Chart.js-F7931A?logo=chartdotjs&logoColor=white)

### Backend
- ![Django](https://img.shields.io/badge/-Django-092E20?logo=django&logoColor=white)
- ![Django REST Framework](https://img.shields.io/badge/-DRF-000000?logo=django&logoColor=white)
- ![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-4169E1?logo=postgresql&logoColor=white)

---

## 📌 Features (Planned)
- Real-time candlestick charts for BTC, ETH, and other cryptocurrencies
- Technical indicators: MACD, RSI, and volume
- Hot coins heatmap visualization
- Wallet management and transaction history tracking
- Auto trader bot simulation with ML integration
- User account management with secure authentication
- Responsive, interactive UI using Tailwind CSS and Framer Motion
- SignIn & SignUp pages

---

## Project Structure

### Frontend
```
frontend/
├─ src/
│  ├─ assets/          # Images, icons
│  ├─ components/      # Reusable components (Navbar, Footer, Sidebar, Charts, Cards)
│  ├─ pages/           # All pages (Dashboard, Wallet, BotHelper, AutoTrader, Settings, SignIn, SignUp)
│  ├─ hooks/           # Custom hooks
│  ├─ services/        # API calls
│  ├─ styles/          # Tailwind and global styles
│  ├─ App.tsx
│  └─ main.tsx
├─ tailwind.config.js
├─ tsconfig.json
└─ package.json
```

### Backend
```
backend/
├─ CryptoPilot/       # Django project settings
├─ api/               # API app (cryptocurrency, trades, analytics)
├─ users/             # User app (authentication, profiles)
├─ manage.py
└─ requirements.txt
```

---

## 💡 Getting Started (Development)

### Frontend
```bash
cd frontend
npm install
npm start
```

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

---

## 🔗 Planned Routes
- `/dashboard`
- `/trending-coins`
- `/bot-helper`
- `/auto-trader`
- `/wallet`
- `/settings`
- `/signin`
- `/signup`

---

## 🖤 Tech Used (Current & Upcoming)
- React, TypeScript, Tailwind CSS, Framer Motion, Chart.js
- Django, Django REST Framework, PostgreSQL, REST APIs
- Planned ML & AI integration for predictive trading models
- Full-stack development, responsive design, and automated trading simulations
