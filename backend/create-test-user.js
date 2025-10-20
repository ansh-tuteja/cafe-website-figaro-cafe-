// Test script to create a demo user
// Run this with: node create-test-user.js

require('dotenv').config();
const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/figaro-cafe';

mongoose.connect(MONGODB_URI)
    .then(async () => {
        console.log('✅ Connected to MongoDB');
        
        // Create test user
        const testUser = {
            name: 'Test User',
            email: 'test@figaro.com',
            phone: '1234567890',
            password: 'test123'
        };

        try {
            // Check if user already exists
            const existingUser = await User.findOne({ email: testUser.email });
            
            if (existingUser) {
                console.log('ℹ️  Test user already exists!');
                console.log('📧 Email:', testUser.email);
                console.log('🔑 Password:', testUser.password);
            } else {
                const user = new User(testUser);
                await user.save();
                console.log('🎉 Test user created successfully!');
                console.log('📧 Email:', testUser.email);
                console.log('🔑 Password:', testUser.password);
            }
        } catch (error) {
            console.error('❌ Error creating user:', error.message);
        }

        await mongoose.connection.close();
        console.log('👋 Disconnected from MongoDB');
        process.exit(0);
    })
    .catch((error) => {
        console.error('❌ MongoDB connection error:', error);
        process.exit(1);
    });
