# CryptoPilot 

A modern, full-stack cryptocurrency trading and analytics platform.  
Track your assets, analyze crypto trends, and automate trading strategies with a sleek UI and powerful backend.

---

##  Tech Stack

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

## 📌 Features
- Real-time candlestick charts for BTC, ETH, and more
- MACD, RSI, and volume indicators
- Hot coins heatmap (top 20 coins)
- Wallet management and transaction history
- Auto trader bot simulation
- User account management and settings
- SignIn & SignUp pages
- Responsive design using Tailwind CSS


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

## 💡 Getting Started

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

## 🔗 Routes
- `/dashboard`
- `/trending-coins`
- `/bot-helper`
- `/auto-trader`
- `/wallet`
- `/settings`
- `/signin`
- `/signup`

---

## 🖤 Tech Used

![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/-React-61DAFB?logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/-Tailwind%20CSS-06B6D4?logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/-Framer%20Motion-0055FF?logo=framer&logoColor=white)
![Chart.js](https://img.shields.io/badge/-Chart.js-F7931A?logo=chartdotjs&logoColor=white)
![Django](https://img.shields.io/badge/-Django-092E20?logo=django&logoColor=white)
![Django REST Framework](https://img.shields.io/badge/-DRF-000000?logo=django&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/-Postg
