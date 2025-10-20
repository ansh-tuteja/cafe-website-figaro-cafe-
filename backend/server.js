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
app.use(express.static('../')); // Serve static files

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/figaro-cafe';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB Connected Successfully'))
.catch(err => console.error('❌ MongoDB Connection Error:', err));

// ==================== SCHEMAS ====================

// Cart Item Schema
const cartItemSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    sessionId: { type: String }, // For guest users
    items: [{
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true, default: 1 },
        category: { type: String },
        image: { type: String },
        addedAt: { type: Date, default: Date.now }
    }],
    updatedAt: { type: Date, default: Date.now }
});

// Order Schema
const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [{
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true }
    }],
    totalAmount: { type: Number, required: true },
    customerInfo: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String }
    },
    status: { type: String, default: 'pending', enum: ['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'] },
    paymentStatus: { type: String, default: 'pending', enum: ['pending', 'paid', 'failed'] },
    orderDate: { type: Date, default: Date.now }
});
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
const Cart = mongoose.model('Cart', cartItemSchema);
const Order = mongoose.model('Order', orderSchema);

// ==================== CART ROUTES ====================

// Get Cart
app.get('/api/cart/:sessionId', async (req, res) => {
    try {
        let cart = await Cart.findOne({ sessionId: req.params.sessionId });
        if (!cart) {
            cart = new Cart({ sessionId: req.params.sessionId, items: [] });
            await cart.save();
        }
        res.json({ success: true, cart });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Add to Cart
app.post('/api/cart/add', async (req, res) => {
    try {
        const { sessionId, item } = req.body;
        
        let cart = await Cart.findOne({ sessionId });
        
        if (!cart) {
            cart = new Cart({ sessionId, items: [item] });
        } else {
            // Check if item already exists
            const existingItemIndex = cart.items.findIndex(i => i.name === item.name);
            
            if (existingItemIndex > -1) {
                // Item exists, increase quantity
                cart.items[existingItemIndex].quantity += 1;
            } else {
                // New item
                cart.items.push(item);
            }
        }
        
        cart.updatedAt = new Date();
        await cart.save();
        
        res.json({ success: true, cart });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Update Cart Item Quantity
app.put('/api/cart/update', async (req, res) => {
    try {
        const { sessionId, itemName, quantity } = req.body;
        
        const cart = await Cart.findOne({ sessionId });
        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }
        
        const itemIndex = cart.items.findIndex(i => i.name === itemName);
        if (itemIndex > -1) {
            if (quantity <= 0) {
                // Remove item if quantity is 0 or less
                cart.items.splice(itemIndex, 1);
            } else {
                cart.items[itemIndex].quantity = quantity;
            }
            cart.updatedAt = new Date();
            await cart.save();
        }
        
        res.json({ success: true, cart });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Remove from Cart
app.delete('/api/cart/remove', async (req, res) => {
    try {
        const { sessionId, itemName } = req.body;
        
        const cart = await Cart.findOne({ sessionId });
        if (!cart) {
            return res.status(404).json({ success: false, message: 'Cart not found' });
        }
        
        cart.items = cart.items.filter(i => i.name !== itemName);
        cart.updatedAt = new Date();
        await cart.save();
        
        res.json({ success: true, cart });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Clear Cart
app.delete('/api/cart/clear/:sessionId', async (req, res) => {
    try {
        const cart = await Cart.findOne({ sessionId: req.params.sessionId });
        if (cart) {
            cart.items = [];
            cart.updatedAt = new Date();
            await cart.save();
        }
        res.json({ success: true, cart });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ==================== ORDER ROUTES ====================

// Create Order
app.post('/api/orders', async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        
        // Clear cart after order
        if (req.body.sessionId) {
            await Cart.findOneAndUpdate(
                { sessionId: req.body.sessionId },
                { items: [], updatedAt: new Date() }
            );
        }
        
        res.json({ success: true, order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Get Orders
app.get('/api/orders', async (req, res) => {
    try {
        const orders = await Order.find().sort({ orderDate: -1 });
        res.json({ success: true, orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// ==================== EXISTING ROUTES ====================

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
