// Toggle between Login and Sign Up forms
const loginToggle = document.getElementById('loginToggle');
const signupToggle = document.getElementById('signupToggle');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');

loginToggle.addEventListener('click', () => {
    loginToggle.classList.add('active');
    signupToggle.classList.remove('active');
    loginForm.classList.add('active');
    signupForm.classList.remove('active');
});

signupToggle.addEventListener('click', () => {
    signupToggle.classList.add('active');
    loginToggle.classList.remove('active');
    signupForm.classList.add('active');
    loginForm.classList.remove('active');
});

// Handle Login Form Submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Here you would typically send this data to your backend
    console.log('Login attempt:', { email, password });
    
    // For demonstration purposes
    alert('Login successful! Welcome back to Figaro Cafe.');
    
    // Redirect to home page or dashboard
    // window.location.href = 'index.html';
});

// Handle Sign Up Form Submission
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const phone = document.getElementById('signupPhone').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    
    // Validate passwords match
    if (password !== confirmPassword) {
        alert('Passwords do not match! Please try again.');
        return;
    }
    
    // Validate password strength (minimum 6 characters)
    if (password.length < 6) {
        alert('Password must be at least 6 characters long!');
        return;
    }
    
    // Here you would typically send this data to your backend
    console.log('Sign up attempt:', { name, email, phone, password });
    
    // For demonstration purposes
    alert('Account created successfully! Welcome to the Figaro Cafe family.');
    
    // Redirect to home page or dashboard
    // window.location.href = 'index.html';
});

// Add smooth transitions and animations
document.addEventListener('DOMContentLoaded', () => {
    // Add focus effects to inputs
    const inputs = document.querySelectorAll('input');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });
});
