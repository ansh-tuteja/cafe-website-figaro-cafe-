// API Base URL
const API_BASE = 'http://localhost:3000/api';

// Toggle Password Visibility
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const button = input.parentElement.querySelector('.toggle-password');
    const icon = button.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Validate Phone Number (only digits, 10 characters)
function validatePhone(phone) {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
}

// Format phone input to accept only numbers
document.addEventListener('DOMContentLoaded', () => {
    const phoneInput = document.getElementById('signupPhone');
    
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            // Remove any non-digit characters
            this.value = this.value.replace(/\D/g, '');
            
            // Limit to 10 digits
            if (this.value.length > 10) {
                this.value = this.value.slice(0, 10);
            }
        });
        
        phoneInput.addEventListener('keypress', function(e) {
            // Only allow digits
            if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete') {
                e.preventDefault();
            }
        });
    }
});

// Beautiful Modal System
class BeautifulModal {
    constructor() {
        this.createModalHTML();
    }

    createModalHTML() {
        if (document.getElementById('beautifulModal')) return;

        const modalHTML = `
            <div class="modal-overlay" id="beautifulModal">
                <div class="modal-container" id="modalContainer">
                    <div class="modal-header">
                        <button class="modal-close" id="modalClose">
                            <i class="fas fa-times"></i>
                        </button>
                        <div class="modal-icon" id="modalIcon"></div>
                        <h2 class="modal-title" id="modalTitle"></h2>
                    </div>
                    <div class="modal-body">
                        <p class="modal-message" id="modalMessage"></p>
                        <div class="modal-actions" id="modalActions"></div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // Event listeners
        const overlay = document.getElementById('beautifulModal');
        const closeBtn = document.getElementById('modalClose');

        closeBtn.addEventListener('click', () => this.hide());
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) this.hide();
        });

        // ESC key to close
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && overlay.classList.contains('active')) {
                this.hide();
            }
        });
    }

    show(options) {
        const { type = 'info', title, message, icon, buttons = [] } = options;

        const overlay = document.getElementById('beautifulModal');
        const container = document.getElementById('modalContainer');
        const iconEl = document.getElementById('modalIcon');
        const titleEl = document.getElementById('modalTitle');
        const messageEl = document.getElementById('modalMessage');
        const actionsEl = document.getElementById('modalActions');

        // Set type
        container.className = 'modal-container ' + type;

        // Set icon
        const iconMap = {
            success: '<i class="fas fa-check-circle"></i>',
            error: '<i class="fas fa-exclamation-circle"></i>',
            info: '<i class="fas fa-info-circle"></i>',
            warning: '<i class="fas fa-exclamation-triangle"></i>'
        };
        iconEl.innerHTML = icon || iconMap[type];
        iconEl.className = 'modal-icon';
        if (type === 'success') iconEl.classList.add('pulse');

        // Set title and message
        titleEl.textContent = title;
        messageEl.textContent = message;

        // Set buttons
        actionsEl.innerHTML = '';
        if (buttons.length === 0) {
            buttons.push({
                text: 'OK',
                primary: true,
                action: () => this.hide()
            });
        }

        buttons.forEach(btn => {
            const button = document.createElement('button');
            button.className = 'modal-btn ' + (btn.primary ? 'modal-btn-primary' : 'modal-btn-secondary');
            button.textContent = btn.text;
            button.addEventListener('click', () => {
                if (btn.action) btn.action();
            });
            actionsEl.appendChild(button);
        });

        // Show modal
        overlay.classList.add('active');

        // Shake animation for errors
        if (type === 'error') {
            container.classList.add('shake');
            setTimeout(() => container.classList.remove('shake'), 500);
        }
    }

    hide() {
        const overlay = document.getElementById('beautifulModal');
        overlay.classList.remove('active');
    }

    showLoading(message = 'Loading...') {
        const overlay = document.getElementById('beautifulModal');
        const container = document.getElementById('modalContainer');
        const iconEl = document.getElementById('modalIcon');
        const titleEl = document.getElementById('modalTitle');
        const messageEl = document.getElementById('modalMessage');
        const actionsEl = document.getElementById('modalActions');

        container.className = 'modal-container info';
        iconEl.innerHTML = '<div class="modal-loading"></div>';
        iconEl.className = 'modal-icon';
        titleEl.textContent = 'Please Wait';
        messageEl.textContent = message;
        actionsEl.innerHTML = '';

        overlay.classList.add('active');
    }
}

// Initialize modal
const modal = new BeautifulModal();

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
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Validate inputs
    if (!email || !password) {
        modal.show({
            type: 'error',
            title: 'Invalid Input',
            message: 'Please enter both email and password.'
        });
        return;
    }

    // Show loading
    modal.showLoading('Logging you in...');

    try {
        const response = await fetch(`${API_BASE}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (data.success) {
            // Store user data
            localStorage.setItem('figaro_user', JSON.stringify(data.data));
            
            // Show success modal
            modal.show({
                type: 'success',
                title: 'Welcome Back!',
                message: `Login successful! Welcome back to Figaro Café, ${data.data.name}!`,
                buttons: [
                    {
                        text: 'Go to Menu',
                        primary: true,
                        action: () => {
                            modal.hide();
                            window.location.href = 'menu.html';
                        }
                    },
                    {
                        text: 'Stay Here',
                        primary: false,
                        action: () => {
                            modal.hide();
                            loginForm.reset();
                        }
                    }
                ]
            });
        } else {
            // Show error modal
            modal.show({
                type: 'error',
                title: 'Login Failed',
                message: data.message || 'Invalid email or password. Please check your credentials and try again.'
            });
        }
    } catch (error) {
        console.error('Login error:', error);
        modal.show({
            type: 'error',
            title: 'Connection Error',
            message: 'Unable to connect to the server. Please make sure the backend is running and try again.'
        });
    }
});

// Handle Sign Up Form Submission
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const phone = document.getElementById('signupPhone').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    
    // Validate phone number
    if (!validatePhone(phone)) {
        modal.show({
            type: 'error',
            title: 'Invalid Phone Number',
            message: 'Please enter a valid 10-digit phone number (numbers only).'
        });
        return;
    }
    
    // Validate passwords match
    if (password !== confirmPassword) {
        modal.show({
            type: 'error',
            title: 'Password Mismatch',
            message: 'Passwords do not match! Please make sure both passwords are identical.'
        });
        return;
    }
    
    // Validate password strength (minimum 6 characters)
    if (password.length < 6) {
        modal.show({
            type: 'error',
            title: 'Weak Password',
            message: 'Password must be at least 6 characters long for your security.'
        });
        return;
    }

    // Show loading
    modal.showLoading('Creating your account...');

    try {
        const response = await fetch(`${API_BASE}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, phone, password })
        });

        const data = await response.json();

        if (data.success) {
            // Show success modal
            modal.show({
                type: 'success',
                title: 'Account Created!',
                message: `Welcome to the Figaro Café family, ${name}! Your account has been created successfully.`,
                buttons: [
                    {
                        text: 'Login Now',
                        primary: true,
                        action: () => {
                            modal.hide();
                            signupForm.reset();
                            loginToggle.click();
                            document.getElementById('loginEmail').value = email;
                        }
                    }
                ]
            });
        } else {
            modal.show({
                type: 'error',
                title: 'Registration Failed',
                message: data.message || 'Unable to create account. Please try again.'
            });
        }
    } catch (error) {
        console.error('Signup error:', error);
        modal.show({
            type: 'error',
            title: 'Connection Error',
            message: 'Unable to connect to the server. Please make sure the backend is running and try again.'
        });
    }
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
