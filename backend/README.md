# Figaro Cafe Backend

Backend server for Figaro Cafe website with MongoDB database and full cart functionality.

## Setup Instructions

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Install MongoDB
Download and install MongoDB from: https://www.mongodb.com/try/download/community

Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas

### 3. Configure Environment
Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

Edit `.env` with your settings:
```env
MONGODB_URI=mongodb://localhost:27017/figaro-cafe
PORT=3000
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
JWT_SECRET=your-secret-key
```

### 4. Start the Server

Development mode (with auto-restart):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

Server will run on: http://localhost:3000

## API Endpoints

### Cart Management
- `GET /api/cart/:sessionId` - Get cart (creates if doesn't exist)
- `POST /api/cart/add` - Add item to cart (auto-increments quantity if exists)
- `PUT /api/cart/update` - Update item quantity
- `DELETE /api/cart/remove` - Remove specific item
- `DELETE /api/cart/clear/:sessionId` - Clear entire cart

### Order Management
- `POST /api/orders` - Create order (auto-clears cart)
- `GET /api/orders` - Get all orders (sorted by date)

### Reservations
- `POST /api/reservations` - Create new reservation
- `GET /api/reservations` - Get all reservations
- `GET /api/reservations/:id` - Get reservation by ID
- `PATCH /api/reservations/:id` - Update reservation status
- `DELETE /api/reservations/:id` - Delete reservation

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login


### Contact
- `POST /api/contact` - Submit contact form

### Statistics
- `GET /api/stats` - Get dashboard statistics

## Database Schema

### Reservation
- name, email, phone, guests, date, time, occasion, message, status, createdAt

### User
- name, email, phone, password, createdAt

### Contact
- name, email, subject, message, createdAt

## Testing

Test API with tools like:
- Postman
- Thunder Client (VS Code Extension)
- curl commands

Example:
```bash
curl -X POST http://localhost:3000/api/reservations \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+91 9876543210",
    "guests": 4,
    "date": "2024-12-25",
    "time": "19:00"
  }'
```

## Production Deployment

1. Set up MongoDB Atlas
2. Configure environment variables
3. Deploy to services like:
   - Heroku
   - Railway
   - Render
   - DigitalOcean

## Security Notes

- Change JWT_SECRET in production
- Use bcrypt for password hashing (already included in dependencies)
- Enable CORS only for your frontend domain
- Add rate limiting for API endpoints
- Implement input validation
