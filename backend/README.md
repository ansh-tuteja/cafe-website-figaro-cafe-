# Figaro Cafe Backend

Backend server for Figaro Cafe website with MongoDB database.

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
Edit `.env` file with your settings:
- MongoDB connection string
- Email credentials (for sending confirmations)
- JWT secret key

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
