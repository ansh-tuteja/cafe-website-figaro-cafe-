const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/figaro-cafe';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected Successfully'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

// Schemas
const reservationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    guests: { type: Number, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    occasion: { type: String },
    message: { type: String },
    status: { type: String, default: 'pending', enum: ['pending', 'confirmed', 'cancelled'] },
    createdAt: { type: Date, default: Date.now }
});

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

// Models
const Reservation = mongoose.model('Reservation', reservationSchema);
const User = mongoose.model('User', userSchema);
const Contact = mongoose.model('Contact', contactSchema);

// ==================== ROUTES ====================

// Health Check
app.get('/', (req, res) => {
    res.json({ 
        message: 'Figaro Cafe API Server', 
        status: 'Running',
        version: '1.0.0'
    });
});

// Create Reservation
app.post('/api/reservations', async (req, res) => {
    try {
        const reservation = new Reservation(req.body);
        await reservation.save();
        
        // Here you would send confirmation email
        console.log('New reservation created:', reservation);
        
        res.status(201).json({
            success: true,
            message: 'Reservation created successfully!',
            data: reservation
        });
    } catch (error) {
        console.error('Error creating reservation:', error);
        res.status(400).json({
            success: false,
            message: 'Error creating reservation',
            error: error.message
        });
    }
});

// Get All Reservations (Admin)
app.get('/api/reservations', async (req, res) => {
    try {
        const reservations = await Reservation.find().sort({ createdAt: -1 });
        res.json({
            success: true,
            count: reservations.length,
            data: reservations
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching reservations',
            error: error.message
        });
    }
});

// Get Reservation by ID
app.get('/api/reservations/:id', async (req, res) => {
    try {
        const reservation = await Reservation.findById(req.params.id);
        if (!reservation) {
            return res.status(404).json({
                success: false,
                message: 'Reservation not found'
            });
        }
        res.json({
            success: true,
            data: reservation
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching reservation',
            error: error.message
        });
    }
});

// Update Reservation Status
app.patch('/api/reservations/:id', async (req, res) => {
    try {
        const reservation = await Reservation.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true }
        );
        
        if (!reservation) {
            return res.status(404).json({
                success: false,
                message: 'Reservation not found'
            });
        }
        
        res.json({
            success: true,
            message: 'Reservation updated successfully',
            data: reservation
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating reservation',
            error: error.message
        });
    }
});

// Delete Reservation
app.delete('/api/reservations/:id', async (req, res) => {
    try {
        const reservation = await Reservation.findByIdAndDelete(req.params.id);
        
        if (!reservation) {
            return res.status(404).json({
                success: false,
                message: 'Reservation not found'
            });
        }
        
        res.json({
            success: true,
            message: 'Reservation deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting reservation',
            error: error.message
        });
    }
});

// User Registration
app.post('/api/auth/register', async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;
        
        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists with this email'
            });
        }
        
        // Hash password (in production, use bcrypt)
        const user = new User({ name, email, phone, password });
        await user.save();
        
        res.status(201).json({
            success: true,
            message: 'User registered successfully!',
            data: { id: user._id, name: user.name, email: user.email }
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error registering user',
            error: error.message
        });
    }
});

// User Login
app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }
        
        res.json({
            success: true,
            message: 'Login successful!',
            data: { id: user._id, name: user.name, email: user.email }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error logging in',
            error: error.message
        });
    }
});

// Contact Form
app.post('/api/contact', async (req, res) => {
    try {
        const contact = new Contact(req.body);
        await contact.save();
        
        res.status(201).json({
            success: true,
            message: 'Message sent successfully!',
            data: contact
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error sending message',
            error: error.message
        });
    }
});

// Get Statistics (Admin Dashboard)
app.get('/api/stats', async (req, res) => {
    try {
        const totalReservations = await Reservation.countDocuments();
        const pendingReservations = await Reservation.countDocuments({ status: 'pending' });
        const confirmedReservations = await Reservation.countDocuments({ status: 'confirmed' });
        const totalUsers = await User.countDocuments();
        
        res.json({
            success: true,
            data: {
                totalReservations,
                pendingReservations,
                confirmedReservations,
                totalUsers
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching statistics',
            error: error.message
        });
    }
});

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Something went wrong!',
        error: err.message
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📊 API ready at http://localhost:${PORT}/api`);
});
