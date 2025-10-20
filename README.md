# ☕ Figaro Cafe - Full Stack Website

<div align="center">

![Figaro Cafe](https://img.shields.io/badge/Figaro-Cafe-8B7355?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Live-success?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)

**Better days being in Figaro** ☕

[View Demo](https://ansh-tuteja.github.io/cafe-website-figaro-cafe-/) · [Report Bug](https://github.com/ansh-tuteja/cafe-website-figaro-cafe-/issues) · [Request Feature](https://github.com/ansh-tuteja/cafe-website-figaro-cafe-/issues)

</div>

---

## 📖 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Usage](#-usage)
- [Animation System](#-animation-system)
- [Backend API](#-backend-api)
- [Pages](#-pages)
- [Customization](#-customization)
- [Browser Support](#-browser-support)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## 🎯 About

**Figaro Cafe** is a modern, full-stack cafe website featuring elegant design inspired by premium coffee house aesthetics. The website includes a comprehensive animation system, interactive menu with shopping cart, online reservations, user authentication, and a complete backend powered by Node.js and MongoDB.

### ✨ Highlights

- 🎨 **Beautiful UI Design** - Beige cafe-inspired aesthetic with warm colors
- 🎬 **30+ Smooth Animations** - Professional animations throughout
- 🛒 **Interactive Menu** - Shopping cart with category filters
- 📅 **Online Reservations** - Table booking system
- 🔐 **User Authentication** - Login/Signup with JWT
- 📱 **Fully Responsive** - Optimized for all devices
- ⚡ **High Performance** - Optimized for speed
- ♿ **Accessible** - WCAG compliant

---

## 🌟 Features

### Frontend Features

- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Smooth Animations** - 60fps scroll-triggered animations
- ✅ **Interactive Menu** - 16 menu items with cart functionality
- ✅ **Category Filtering** - Filter by Coffee, Beverages, Food, Desserts
- ✅ **Shopping Cart** - Add/remove items, checkout
- ✅ **Reservation System** - Book tables with date/time selection
- ✅ **User Authentication** - Login/Signup forms with validation
- ✅ **Newsletter Signup** - Email subscription
- ✅ **Contact Integration** - WhatsApp floating button
- ✅ **Social Media Links** - Instagram integration
- ✅ **About Page** - Company story, mission/vision, team showcase
- ✅ **Custom SVG Logo** - Scalable vector graphics

### Backend Features

- ✅ **RESTful API** - Express.js backend
- ✅ **MongoDB Database** - NoSQL data storage
- ✅ **User Management** - Registration, login with bcrypt
- ✅ **JWT Authentication** - Secure token-based auth
- ✅ **Reservation Management** - CRUD operations
- ✅ **Contact Forms** - Email handling with Nodemailer
- ✅ **CORS Enabled** - Cross-origin support
- ✅ **Environment Variables** - Secure configuration

---

## 🛠️ Tech Stack

### Frontend

| Technology | Purpose |
|-----------|---------|
| HTML5 | Structure |
| CSS3 | Styling & Animations |
| JavaScript (ES6+) | Interactivity |
| Font Awesome 6.4.0 | Icons |
| Google Fonts | Typography (Playfair Display, Lato, Great Vibes) |

### Backend

| Technology | Version | Purpose |
|-----------|---------|---------|
| Node.js | LTS | Runtime environment |
| Express.js | 4.18.2 | Web framework |
| MongoDB | Latest | Database |
| Mongoose | 8.0.3 | ODM |
| bcryptjs | 2.4.3 | Password hashing |
| jsonwebtoken | 9.0.2 | JWT authentication |
| CORS | 2.8.5 | Cross-origin support |
| dotenv | 16.3.1 | Environment variables |
| Nodemailer | 6.9.7 | Email handling |

### Design System

- **Primary Color**: `#F5F1E8` (Beige)
- **Accent Color**: `#8B7355` (Brown)
- **Text Color**: `#1A1A1A`, `#2C2C2C` (Dark)
- **Fonts**: Playfair Display (headings), Lato (body), Great Vibes (script)

---

## 📁 Project Structure

```
Figaro Cafe/
├── assets/                  # Images and logos
│   └── logo.svg            # Custom SVG logo
├── css/                    # Stylesheets
│   ├── animations.css      # Animation library (15KB)
│   ├── styles.css          # Main styles
│   ├── about.css           # About page styles
│   ├── menu-page.css       # Menu page styles
│   ├── reservation.css     # Reservation styles
│   └── auth.css            # Authentication styles
├── js/                     # JavaScript files
│   ├── animations.js       # Animation controller (8KB)
│   ├── menu.js             # Menu & cart logic
│   ├── reservation.js      # Reservation form
│   └── auth.js             # Authentication logic
├── pages/                  # HTML pages
│   ├── about.html          # About us
│   ├── menu.html           # Menu page
│   ├── reservation.html    # Reservations
│   └── auth.html           # Login/Signup
├── backend/                # Backend server
│   ├── server.js           # Express server
│   ├── package.json        # Dependencies
│   └── README.md           # Backend docs
├── index.html              # Landing page
├── animation-showcase.html # Animation demos
└── README.md               # This file
```

---

## 🚀 Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Git
- Modern web browser

### Frontend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/ansh-tuteja/cafe-website-figaro-cafe-.git
   cd cafe-website-figaro-cafe-
   ```

2. **Open with Live Server**
   - Install VS Code Live Server extension
   - Right-click `index.html`
   - Select "Open with Live Server"
   - Site opens at `http://localhost:5500`

### Backend Setup

1. **Navigate to backend folder**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file**
   ```env
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/figaro-cafe
   # OR use MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/figaro-cafe
   JWT_SECRET=your_super_secret_jwt_key_change_this
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-email-app-password
   ```

4. **Start the server**
   ```bash
   npm start
   ```
   Server runs at `http://localhost:3000`

5. **Verify connection**
   ```bash
   # Test API
   curl http://localhost:3000/api/stats
   ```

---

## 💻 Usage

### Running the Application

1. **Start Backend** (Terminal 1)
   ```bash
   cd backend
   npm start
   ```

2. **Start Frontend** (Terminal 2)
   - Use Live Server or any local server
   - Open `index.html` in browser

3. **Access the website**
   - Frontend: `http://localhost:5500`
   - Backend: `http://localhost:3000`

### Test Features

- 🏠 **Home Page**: Browse offerings, sign up for newsletter
- 📖 **About Page**: Learn company story, meet the team
- 🍽️ **Menu Page**: Browse 16 items, add to cart, checkout
- 📅 **Reservations**: Book a table with date/time
- 🔐 **Auth**: Register new account or login

---

## 🎬 Animation System

### Overview

The website features a **comprehensive animation system** with 30+ effects inspired by modern design trends.

### Animation Types

| Category | Animations | Use Case |
|----------|-----------|----------|
| **Fade** | fade-in, fade-in-up, fade-in-down, fade-in-left, fade-in-right | Content reveals |
| **Scale** | scale-in, zoom-in | Featured items, modals |
| **Slide** | slide-in-left, slide-in-right | Sidebars, panels |
| **Continuous** | pulse, bounce, float, shimmer | Buttons, loading states |
| **Hover** | hover-lift, hover-scale, hover-glow, hover-rotate | Interactive elements |
| **Scroll** | scroll-reveal | Progressive loading |

### Usage Examples

```html
<!-- Fade in animation -->
<div class="fade-in">Content appears smoothly</div>

<!-- Stagger animation with delays -->
<div class="fade-in delay-100">First item</div>
<div class="fade-in delay-200">Second item</div>
<div class="fade-in delay-300">Third item</div>

<!-- Hover effects -->
<div class="hover-lift">Card lifts on hover</div>

<!-- Continuous animation -->
<button class="pulse">Call to Action</button>

<!-- Scroll-triggered -->
<section class="scroll-reveal">
    Appears when scrolled into view
</section>

<!-- Image zoom -->
<div class="image-zoom">
    <img src="image.jpg" alt="Description">
</div>
```

### Animation Features

- ✅ **Performance Optimized** - 60fps with GPU acceleration
- ✅ **Scroll-Triggered** - Intersection Observer API
- ✅ **Smooth Transitions** - Cubic-bezier easing
- ✅ **Stagger Effects** - Sequential delays
- ✅ **Accessible** - Respects `prefers-reduced-motion`
- ✅ **Lightweight** - Only 23KB total

### View All Animations

Open `animation-showcase.html` to see all 30+ animations with live demos and code examples.

---

## 🔌 Backend API

### API Endpoints

#### Reservations

```http
POST   /api/reservations          # Create reservation
GET    /api/reservations          # Get all reservations
GET    /api/reservations/:id      # Get single reservation
PATCH  /api/reservations/:id      # Update reservation
DELETE /api/reservations/:id      # Delete reservation
```

**Request Body (POST):**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 98765 43210",
  "guests": 4,
  "date": "2025-10-25",
  "time": "19:00",
  "occasion": "Birthday",
  "message": "Window seat preferred"
}
```

#### Authentication

```http
POST /api/auth/register    # Register new user
POST /api/auth/login       # Login user
```

**Register Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 98765 43210",
  "password": "securePassword123"
}
```

**Login Request:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Contact

```http
POST /api/contact    # Submit contact form
```

#### Statistics

```http
GET /api/stats    # Get reservation statistics
```

### Database Schemas

#### Reservation Schema
```javascript
{
  name: String (required),
  email: String (required),
  phone: String (required),
  guests: Number (required),
  date: Date (required),
  time: String (required),
  occasion: String,
  message: String,
  status: String (default: 'pending'),
  createdAt: Date,
  updatedAt: Date
}
```

#### User Schema
```javascript
{
  name: String (required),
  email: String (required, unique),
  phone: String (required),
  password: String (required, hashed),
  createdAt: Date
}
```

---

## 📄 Pages

### 🏠 Landing Page (`index.html`)
- Hero section with full-width image
- Newsletter subscription
- Three offerings sections (Diverse Menu, Baked Fresh Daily, Artisanal Experience)
- Social media section
- Footer with contact info

### 📖 About Page (`pages/about.html`)
- Hero with overlay
- Company story
- Mission, Vision, Values cards
- Team showcase (4 members)

### 🍽️ Menu Page (`pages/menu.html`)
- 16 menu items across 4 categories
- Category filtering (All, Coffee, Beverages, Food, Desserts)
- Shopping cart sidebar
- Add to cart functionality
- Checkout with localStorage

**Menu Items:**
- ☕ Coffee: Espresso, Cappuccino, Latte, Americano
- 🥤 Beverages: Iced Tea, Fresh Juice, Smoothie, Hot Chocolate
- 🍔 Food: Club Sandwich, Pasta, Burger, Salad
- 🍰 Desserts: Cheesecake, Brownie, Tiramisu, Croissant

### 📅 Reservation Page (`pages/reservation.html`)
- Booking form with validation
- Date picker (no past dates)
- Time selection
- Guest count, occasion, special requests
- Visit info cards (address, hours, contact)
- Backend API integration

### 🔐 Auth Page (`pages/auth.html`)
- Login/Signup toggle
- Form validation
- Password confirmation
- Terms & conditions
- JWT authentication
- Remember me option

---

## 🎨 Customization

### Change Colors

Edit CSS variables in `css/styles.css`:

```css
:root {
    --primary-bg: #F5F1E8;      /* Beige background */
    --primary-text: #2C2C2C;    /* Dark text */
    --accent-color: #1A1A1A;    /* Black accent */
    --border-color: #D4C5B0;    /* Light border */
    --hover-color: #8B7355;     /* Brown hover */
    --white: #FFFFFF;           /* White */
}
```

### Change Fonts

Edit Google Fonts import in HTML files:

```html
<link href="https://fonts.googleapis.com/css2?family=YOUR_FONT&display=swap" rel="stylesheet">
```

Update CSS:
```css
body {
    font-family: 'YOUR_FONT', sans-serif;
}
```

### Change Animation Speed

Edit in `css/animations.css`:

```css
.fade-in {
    animation: fadeIn 0.8s ease-out; /* Change duration */
}
```

### Add Menu Items

Edit `pages/menu.html` and add to the menu grid:

```html
<div class="menu-item" data-category="coffee">
    <div class="item-image">
        <img src="YOUR_IMAGE_URL" alt="Item Name">
        <span class="badge">New</span>
    </div>
    <div class="item-details">
        <h3 class="item-name">Item Name</h3>
        <p class="item-description">Description here</p>
        <div class="item-footer">
            <span class="item-price">₹XXX</span>
            <button class="add-to-cart-btn" onclick="addToCart('Item Name', 'XXX')">
                Add to Cart
            </button>
        </div>
    </div>
</div>
```

### Configure Backend

Edit `backend/.env`:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
EMAIL_USER=your_email
EMAIL_PASS=your_email_password
```

---

## 🌐 Browser Support

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | Latest ✅ | Full |
| Firefox | Latest ✅ | Full |
| Safari | Latest ✅ | Full |
| Edge | Latest ✅ | Full |
| Opera | Latest ✅ | Full |

### Tested Devices

- ✅ Desktop (1920×1080, 1366×768)
- ✅ Laptop (1440×900)
- ✅ Tablet (768px, 1024px)
- ✅ Mobile (375px, 414px, 390px)

---

## 📊 Performance

- **Page Load Time**: < 2s
- **Animation Frame Rate**: 60fps
- **CSS Size**: ~50KB (minified)
- **JS Size**: ~15KB (minified)
- **Lighthouse Score**: 90+
- **Mobile Performance**: Optimized

---

## 🔒 Security

- ✅ **Password Hashing** - bcryptjs with salt rounds
- ✅ **JWT Tokens** - Secure authentication
- ✅ **Environment Variables** - Sensitive data protection
- ✅ **Input Validation** - Frontend & backend
- ✅ **CORS Configuration** - Controlled origins
- ✅ **SQL Injection Prevention** - Mongoose ODM
- ✅ **XSS Protection** - Sanitized inputs

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 📧 Contact

**Figaro Cafe**
- 📞 Phone: [098759 99500](tel:09875999500)
- ✉️ Email: [admin@figarocafe.com](mailto:admin@figarocafe.com)
- 💬 WhatsApp: [Chat with us](https://wa.me/919875999500)
- 📸 Instagram: [@figarocafeandbakery](https://instagram.com/figarocafeandbakery)

**Developer**
- GitHub: [@ansh-tuteja](https://github.com/ansh-tuteja)
- Repository: [cafe-website-figaro-cafe-](https://github.com/ansh-tuteja/cafe-website-figaro-cafe-)

---

## 🙏 Acknowledgments

- Design inspiration: Beige Cafe aesthetics
- Icons: [Font Awesome](https://fontawesome.com/)
- Fonts: [Google Fonts](https://fonts.google.com/)
- Images: [Unsplash](https://unsplash.com/)
- Animation concepts: Modern web design trends

---

## 📚 Documentation

### Quick Links

- 🎬 [View Animation Demos](animation-showcase.html)
- 📖 [Backend API Docs](backend/README.md)
- 🎨 [Design System](#design-system)
- 🔌 [API Reference](#backend-api)

### File Documentation

All pages include inline comments explaining functionality. Key files:

- `css/animations.css` - Animation library with all keyframes
- `js/animations.js` - Animation controller with Intersection Observer
- `backend/server.js` - Express server with all API routes

---

## 🎯 Roadmap

- [ ] Add payment gateway integration
- [ ] Implement user dashboard
- [ ] Add order tracking system
- [ ] Create admin panel
- [ ] Add delivery/pickup options
- [ ] Implement reviews & ratings
- [ ] Add loyalty program
- [ ] Multi-language support
- [ ] PWA capabilities
- [ ] Dark mode toggle

---

## 📈 Version History

- **v1.0.0** (October 2025) - Initial release
  - ✅ Complete frontend with 5 pages
  - ✅ Backend API with MongoDB
  - ✅ Animation system with 30+ effects
  - ✅ Shopping cart functionality
  - ✅ Reservation system
  - ✅ User authentication
  - ✅ Responsive design
  - ✅ Full documentation

---

<div align="center">

**Made with ❤️ and ☕ by Figaro Cafe Team**

⭐ Star this repo if you like it!

[⬆ Back to Top](#-figaro-cafe---full-stack-website)

</div>
