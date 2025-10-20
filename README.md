# ☕ Figaro Café - Full Stack Website

**Better days being in Figaro** ☕

A modern, full-stack cafe website with elegant design, shopping cart, reservations, and user authentication.

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)

### Installation

1. **Clone & Install Backend:**
   ```bash
   cd backend
   npm install
   ```

2. **Setup Environment:**
   ```bash
   # Create .env file
   cp .env.example .env
   
   # Edit .env with your MongoDB URI
   MONGODB_URI=mongodb://localhost:27017/figaro-cafe
   PORT=3000
   ```

3. **Start Server:**
   ```bash
   npm run dev
   ```

4. **Open Frontend:**
   - Open `pages/menu.html` in browser or use Live Server

---

## ✨ Features

- 🛒 **Shopping Cart** - Add items, manage quantities, checkout
- 🔐 **Authentication** - Login/Signup with beautiful modals
- 📅 **Reservations** - Table booking system
- 🎨 **Animations** - Smooth scroll animations throughout
- 📱 **Responsive** - Mobile-friendly design
- 💾 **MongoDB** - Database persistence

---

## 🧪 Test Credentials

```
Email: test@figaro.com
Password: test123
```

---

## 🎯 Key Pages

- **Home** - `index.html` - Landing page with hero section
- **Menu** - `pages/menu.html` - Interactive menu with cart
- **About** - `pages/about.html` - Company story & values
- **Reservations** - `pages/reservation.html` - Book a table
- **Auth** - `pages/auth.html` - Login/Signup

---

## 🔌 API Endpoints

### Cart
- `GET /api/cart/:sessionId` - Get cart
- `POST /api/cart/add` - Add item
- `PUT /api/cart/update` - Update quantity
- `DELETE /api/cart/remove` - Remove item
- `POST /api/orders` - Place order

### Auth
- `POST /api/auth/register` - Sign up
- `POST /api/auth/login` - Login

### Reservations
- `POST /api/reservations` - Create reservation
- `GET /api/reservations` - Get all reservations

---

## 🛠️ Tech Stack

**Frontend:**
- HTML5, CSS3, Vanilla JavaScript
- Font Awesome Icons
- Google Fonts

**Backend:**
- Node.js + Express.js
- MongoDB + Mongoose
- CORS, dotenv

---

## 📁 Project Structure

```
Figaro Cafe/
├── index.html              # Home page
├── pages/                  # Other pages
│   ├── menu.html          # Menu with cart
│   ├── about.html         # About us
│   ├── auth.html          # Login/Signup
│   └── reservation.html   # Reservations
├── css/                   # Stylesheets
│   ├── styles.css         # Global styles
│   ├── cart.css           # Cart modal
│   ├── modal.css          # Auth modals
│   └── animations.css     # Animations
├── js/                    # JavaScript
│   ├── cart.js            # Cart management
│   ├── auth.js            # Authentication
│   └── animations.js      # Scroll animations
└── backend/               # Server
    ├── server.js          # Express server
    ├── package.json       # Dependencies
    └── .env.example       # Config template
```

---

## 🎨 Color Palette

- `#FFF8F0` - Warm Cream
- `#B8905F` - Golden Brown
- `#E0B878` - Vibrant Gold
- `#6B4E3D` - Warm Brown
- `#D4A574` - Golden Accents

---

## 📝 License

MIT License - feel free to use for your projects!

---

## 👤 Author

**Ansh Tuteja**
- GitHub: [@ansh-tuteja](https://github.com/ansh-tuteja)

---

**Made with ☕ and ❤️**
