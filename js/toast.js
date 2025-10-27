// Toast Notification System - Figaro Café Edition
class ToastNotification {
    constructor() {
        this.container = null;
        this.init();
    }

    // Initialize toast container
    init() {
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.className = 'toast-container';
            document.body.appendChild(this.container);
        }
    }

    // Show toast notification
    show(options = {}) {
        const {
            type = 'info',
            icon = '☕',
            title = 'Notification',
            message = '',
            duration = 3000,
            position = 'top-right',
            closable = true,
            onClose = null
        } = options;

        // Update container position
        this.container.className = `toast-container ${position}`;

        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        toast.innerHTML = `
            <div class="toast-content">
                <div class="toast-icon">${icon}</div>
                <div class="toast-message">
                    <div class="toast-title">${title}</div>
                    ${message ? `<div class="toast-subtitle">${message}</div>` : ''}
                </div>
            </div>
            ${closable ? '<button class="toast-close" aria-label="Close">×</button>' : ''}
            <div class="toast-progress"></div>
        `;

        this.container.appendChild(toast);

        // Add close button listener
        if (closable) {
            const closeBtn = toast.querySelector('.toast-close');
            closeBtn.addEventListener('click', () => {
                this.hideToast(toast, onClose);
            });
        }

        // Show toast with animation
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);

        // Auto hide after duration
        setTimeout(() => {
            this.hideToast(toast, onClose);
        }, duration);

        return toast;
    }

    // Hide toast with animation
    hideToast(toast, callback) {
        toast.classList.remove('show');
        toast.classList.add('hide');
        
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
            if (callback) callback();
        }, 500);
    }

    // Logout notification with personalized message
    showLogout(username, options = {}) {
        const {
            duration = 3000,
            position = 'top-right',
            redirectUrl = '../index.html',
            redirectDelay = 3000
        } = options;

        try {
            // Validate username
            if (!username || typeof username !== 'string') {
                username = 'Guest';
            }

            // Console message
            console.log(`☕ ${username} has logged out — Figaro Café will miss you!`);

            // Show personalized toast
            this.show({
                type: 'logout',
                icon: '👋',
                title: `Logged out successfully, <span class="toast-username">${username}</span>!`,
                message: 'See you again soon ☕',
                duration: duration,
                position: position,
                closable: true,
                onClose: () => {
                    if (redirectUrl) {
                        window.location.href = redirectUrl;
                    }
                }
            });

            // Redirect after duration if not manually closed
            if (redirectUrl) {
                setTimeout(() => {
                    window.location.href = redirectUrl;
                }, redirectDelay);
            }

        } catch (error) {
            console.error('Error showing logout toast:', error);
            // Fallback to simple alert
            alert(`Logged out successfully, ${username}!`);
            if (redirectUrl) {
                window.location.href = redirectUrl;
            }
        }
    }

    // Show centered modal for logout
    showLogoutModal(username, options = {}) {
        const {
            redirectUrl = '../index.html',
            autoCloseDelay = 5000,
            showLoginButton = true
        } = options;

        try {
            // Validate username
            if (!username || typeof username !== 'string') {
                username = 'Guest';
            }

            // Console message
            console.log(`☕ ${username} has logged out — Figaro Café will miss you!`);

            // Create modal overlay
            const overlay = document.createElement('div');
            overlay.className = 'logout-modal-overlay';
            
            // Create modal content
            overlay.innerHTML = `
                <div class="logout-modal">
                    <div class="logout-modal-content">
                        <div class="logout-modal-icon">👋</div>
                        <h2 class="logout-modal-title">
                            Logged out successfully,<br>
                            <span class="logout-modal-username">${username}</span>!
                        </h2>
                        <p class="logout-modal-message">
                            Come back for another brew soon <span class="logout-modal-coffee">☕</span>
                        </p>
                        <div class="logout-modal-buttons">
                            <a href="${redirectUrl}" class="logout-modal-btn logout-modal-btn-primary">
                                <i class="fas fa-home"></i> Return to Home
                            </a>
                            ${showLoginButton ? `
                                <a href="${redirectUrl.replace('index.html', 'pages/auth.html')}" class="logout-modal-btn logout-modal-btn-secondary">
                                    <i class="fas fa-sign-in-alt"></i> Login Again
                                </a>
                            ` : ''}
                        </div>
                    </div>
                </div>
            `;

            document.body.appendChild(overlay);

            // Show modal with animation
            setTimeout(() => {
                overlay.classList.add('show');
            }, 10);

            // Auto close after delay
            const autoCloseTimeout = setTimeout(() => {
                this.hideModal(overlay, redirectUrl);
            }, autoCloseDelay);

            // Close on overlay click
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) {
                    clearTimeout(autoCloseTimeout);
                    this.hideModal(overlay, redirectUrl);
                }
            });

            // Prevent closing when clicking inside modal
            const modal = overlay.querySelector('.logout-modal');
            modal.addEventListener('click', (e) => {
                e.stopPropagation();
            });

        } catch (error) {
            console.error('Error showing logout modal:', error);
            // Fallback
            alert(`Logged out successfully, ${username}!`);
            if (redirectUrl) {
                window.location.href = redirectUrl;
            }
        }
    }

    // Hide modal with animation
    hideModal(overlay, redirectUrl) {
        overlay.classList.remove('show');
        setTimeout(() => {
            if (overlay.parentNode) {
                overlay.parentNode.removeChild(overlay);
            }
            if (redirectUrl) {
                window.location.href = redirectUrl;
            }
        }, 400);
    }

    // Success notification
    success(title, message, duration = 3000) {
        return this.show({
            type: 'success',
            icon: '✓',
            title: title,
            message: message,
            duration: duration
        });
    }

    // Error notification
    error(title, message, duration = 4000) {
        return this.show({
            type: 'error',
            icon: '✗',
            title: title,
            message: message,
            duration: duration
        });
    }

    // Info notification
    info(title, message, duration = 3000) {
        return this.show({
            type: 'info',
            icon: 'ℹ',
            title: title,
            message: message,
            duration: duration
        });
    }

    // Coffee-themed notification
    coffee(title, message, duration = 3000) {
        return this.show({
            type: 'info',
            icon: '☕',
            title: title,
            message: message,
            duration: duration
        });
    }
}

// Initialize global toast instance
const toast = new ToastNotification();

// Make it globally available
window.toast = toast;

// Logout handler with enhanced experience
function handleLogout(options = {}) {
    try {
        // Get user data from localStorage
        const userDataStr = localStorage.getItem('figaro_user');
        let username = 'Guest';

        if (userDataStr) {
            try {
                const userData = JSON.parse(userDataStr);
                username = userData.name || userData.username || 'Guest';
            } catch (parseError) {
                console.error('Error parsing user data:', parseError);
            }
        }

        // Clear session data
        localStorage.removeItem('figaro_user');
        localStorage.removeItem('figaro_token');
        
        // Optional: Clear cart if needed
        // localStorage.removeItem('figaro_cart');
        
        console.log('Session data cleared');

        // Use modal by default, can override with useToast option
        if (options.useToast) {
            // Show toast notification
            toast.showLogout(username, {
                duration: 3000,
                position: options.position || 'top-right',
                redirectUrl: options.redirectUrl || '../index.html',
                redirectDelay: 3000
            });
        } else {
            // Show centered modal (default)
            toast.showLogoutModal(username, {
                redirectUrl: options.redirectUrl || '../index.html',
                autoCloseDelay: options.autoCloseDelay || 5000,
                showLoginButton: options.showLoginButton !== false
            });
        }

        // Update navbar if updateNavbar function exists
        if (typeof updateNavbar === 'function') {
            setTimeout(() => {
                updateNavbar();
            }, 100);
        }

    } catch (error) {
        console.error('Logout error:', error);
        // Fallback
        localStorage.removeItem('figaro_user');
        localStorage.removeItem('figaro_token');
        alert('Logged out successfully!');
        window.location.href = '../index.html';
    }
}

// Global logout function
window.handleLogout = handleLogout;

console.log('Toast notification system loaded ☕');
