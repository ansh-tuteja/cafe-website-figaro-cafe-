// Cart Management System
class CartManager {
    constructor() {
        this.sessionId = this.getOrCreateSessionId();
        this.cart = { items: [] };
        this.API_BASE = 'http://localhost:3000/api';
        this.init();
    }

    // Generate or retrieve session ID
    getOrCreateSessionId() {
        let sessionId = localStorage.getItem('figaro_session_id');
        if (!sessionId) {
            sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('figaro_session_id', sessionId);
        }
        return sessionId;
    }

    // Initialize cart
    async init() {
        console.log('Cart Manager initializing...');
        await this.loadCart();
        this.updateCartUI();
        console.log('Cart Manager initialized. Items:', this.cart.items.length);
    }

    // Load cart from server
    async loadCart() {
        try {
            const response = await fetch(`${this.API_BASE}/cart/${this.sessionId}`);
            const data = await response.json();
            if (data.success) {
                this.cart = data.cart;
                console.log('Cart loaded from server:', this.cart);
                // Sync to localStorage as backup
                this.saveToLocalStorage();
            }
        } catch (error) {
            console.log('Backend not available, using localStorage');
            // Fallback to localStorage
            this.loadFromLocalStorage();
        }
    }

    // Save cart to localStorage with error handling
    saveToLocalStorage() {
        try {
            localStorage.setItem('figaro_cart', JSON.stringify(this.cart));
        } catch (error) {
            console.error('Failed to save cart to localStorage:', error);
            this.showNotification('Unable to save cart. Storage may be full.', 'error');
        }
    }

    // Load cart from localStorage with error handling
    loadFromLocalStorage() {
        try {
            const savedCart = localStorage.getItem('figaro_cart');
            if (savedCart) {
                this.cart = JSON.parse(savedCart);
                console.log('Cart loaded from localStorage:', this.cart);
            } else {
                this.cart = { items: [] };
                console.log('Starting with empty cart');
            }
        } catch (error) {
            console.error('Failed to load cart from localStorage:', error);
            this.cart = { items: [] };
            this.showNotification('Unable to load saved cart.', 'error');
        }
    }

    // Add item to cart
    async addToCart(itemName, price, category = 'general', image = '') {
        console.log('Adding to cart:', itemName, price, category);
        
        // Validate inputs
        if (!itemName || !price) {
            this.showNotification('Invalid item details', 'error');
            return;
        }

        if (isNaN(price) || price <= 0) {
            this.showNotification('Invalid price', 'error');
            return;
        }
        
        const item = {
            name: itemName,
            price: parseFloat(price),
            quantity: 1,
            category: category,
            image: image
        };

        try {
            const response = await fetch(`${this.API_BASE}/cart/add`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sessionId: this.sessionId,
                    item: item
                })
            });

            const data = await response.json();
            if (data.success) {
                this.cart = data.cart;
                this.updateCartUI();
                this.showNotification(`✓ ${itemName} added to cart!`, 'success');
                this.saveToLocalStorage();
            }
        } catch (error) {
            console.log('Using local cart (backend unavailable)');
            this.addToCartLocally(item);
        }
    }

    // Fallback: Add to cart locally
    addToCartLocally(item) {
        try {
            const existingItemIndex = this.cart.items.findIndex(i => i.name === item.name);
            
            if (existingItemIndex > -1) {
                this.cart.items[existingItemIndex].quantity += 1;
            } else {
                this.cart.items.push(item);
            }
            
            this.saveToLocalStorage();
            this.updateCartUI();
            this.showNotification(`✓ ${item.name} added to cart!`, 'success');
        } catch (error) {
            console.error('Failed to add item locally:', error);
            this.showNotification('Failed to add item to cart', 'error');
        }
    }

    // Update item quantity
    async updateQuantity(itemName, change) {
        try {
            const itemIndex = this.cart.items.findIndex(i => i.name === itemName);
            if (itemIndex === -1) {
                this.showNotification('Item not found in cart', 'error');
                return;
            }

            const newQuantity = this.cart.items[itemIndex].quantity + change;

            // Don't allow quantity less than 1
            if (newQuantity < 1) {
                this.removeItem(itemName);
                return;
            }

            try {
                const response = await fetch(`${this.API_BASE}/cart/update`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        sessionId: this.sessionId,
                        itemName: itemName,
                        quantity: newQuantity
                    })
                });

                const data = await response.json();
                if (data.success) {
                    this.cart = data.cart;
                    this.updateCartUI();
                    this.saveToLocalStorage();
                }
            } catch (error) {
                console.log('Using local cart update');
                this.updateQuantityLocally(itemName, change);
            }
        } catch (error) {
            console.error('Failed to update quantity:', error);
            this.showNotification('Failed to update quantity', 'error');
        }
    }

    // Fallback: Update quantity locally
    updateQuantityLocally(itemName, change) {
        try {
            const itemIndex = this.cart.items.findIndex(i => i.name === itemName);
            if (itemIndex === -1) return;

            this.cart.items[itemIndex].quantity += change;
            
            if (this.cart.items[itemIndex].quantity <= 0) {
                this.cart.items.splice(itemIndex, 1);
            }
            
            this.saveToLocalStorage();
            this.updateCartUI();
        } catch (error) {
            console.error('Failed to update quantity locally:', error);
            this.showNotification('Failed to update quantity', 'error');
        }
    }

    // Remove item from cart
    async removeItem(itemName) {
        try {
            const response = await fetch(`${this.API_BASE}/cart/remove`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sessionId: this.sessionId,
                    itemName: itemName
                })
            });

            const data = await response.json();
            if (data.success) {
                this.cart = data.cart;
                this.updateCartUI();
                this.showNotification(`${itemName} removed from cart`, 'info');
                localStorage.setItem('figaro_cart', JSON.stringify(this.cart));
            }
        } catch (error) {
            console.error('Error removing item:', error);
            this.removeItemLocally(itemName);
        }
    }

    // Fallback: Remove item locally
    removeItemLocally(itemName) {
        this.cart.items = this.cart.items.filter(i => i.name !== itemName);
        localStorage.setItem('figaro_cart', JSON.stringify(this.cart));
        this.updateCartUI();
        this.showNotification(`${itemName} removed from cart`, 'info');
    }

    // Clear entire cart
    async clearCart() {
        try {
            const response = await fetch(`${this.API_BASE}/cart/clear/${this.sessionId}`, {
                method: 'DELETE'
            });

            const data = await response.json();
            if (data.success) {
                this.cart = data.cart;
                this.updateCartUI();
                this.showNotification('Cart cleared', 'info');
                localStorage.setItem('figaro_cart', JSON.stringify(this.cart));
            }
        } catch (error) {
            console.error('Error clearing cart:', error);
            this.cart.items = [];
            localStorage.setItem('figaro_cart', JSON.stringify(this.cart));
            this.updateCartUI();
        }
    }

    // Calculate total
    getTotal() {
        return this.cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Get item count
    getItemCount() {
        return this.cart.items.reduce((count, item) => count + item.quantity, 0);
    }

    // Update cart UI
    updateCartUI() {
        const cartCount = document.getElementById('cart-count');
        const cartTotal = document.getElementById('cart-total');
        
        if (cartCount) {
            const count = this.getItemCount();
            cartCount.textContent = count;
            cartCount.style.display = count > 0 ? 'flex' : 'none';
        }

        if (cartTotal) {
            cartTotal.textContent = `₹${this.getTotal()}`;
        }

        // Update cart modal if open
        this.updateCartModal();
    }

    // Update cart modal content
    updateCartModal() {
        const cartItemsContainer = document.getElementById('cart-items');
        if (!cartItemsContainer) return;

        if (this.cart.items.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
            return;
        }

        cartItemsContainer.innerHTML = this.cart.items.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p class="cart-item-price">₹${item.price} × ${item.quantity}</p>
                </div>
                <div class="cart-item-controls">
                    <button class="qty-btn" onclick="cartManager.updateQuantity('${item.name}', -1)">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="qty-display">${item.quantity}</span>
                    <button class="qty-btn" onclick="cartManager.updateQuantity('${item.name}', 1)">
                        <i class="fas fa-plus"></i>
                    </button>
                    <button class="remove-btn" onclick="cartManager.removeItem('${item.name}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');

        const modalTotal = document.getElementById('modal-cart-total');
        if (modalTotal) {
            modalTotal.textContent = `₹${this.getTotal()}`;
        }
    }

    // Show notification
    showNotification(message, type = 'success') {
        // Remove any existing notifications first
        const existingNotifications = document.querySelectorAll('.cart-notification');
        existingNotifications.forEach(notif => notif.remove());

        const notification = document.createElement('div');
        notification.className = `cart-notification ${type}`;
        
        // Add icon based on type
        const icon = type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ';
        notification.innerHTML = `<span class="notif-icon">${icon}</span> ${message}`;
        
        document.body.appendChild(notification);

        // Trigger animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 3000);
    }

    // Place order
    async placeOrder(customerInfo) {
        if (this.cart.items.length === 0) {
            this.showNotification('Your cart is empty!', 'error');
            return false;
        }

        try {
            const response = await fetch(`${this.API_BASE}/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sessionId: this.sessionId,
                    items: this.cart.items,
                    totalAmount: this.getTotal(),
                    customerInfo: customerInfo
                })
            });

            const data = await response.json();
            if (data.success) {
                this.cart.items = [];
                this.updateCartUI();
                localStorage.setItem('figaro_cart', JSON.stringify(this.cart));
                this.showNotification('Order placed successfully!', 'success');
                return true;
            }
        } catch (error) {
            console.error('Error placing order:', error);
            this.showNotification('Error placing order. Please try again.', 'error');
            return false;
        }
    }
}

// Initialize cart manager
const cartManager = new CartManager();

// Global function for easy access from HTML
function addToCart(itemName, price, category, image) {
    cartManager.addToCart(itemName, price, category, image);
}

// Toggle cart modal
function toggleCartModal() {
    const modal = document.getElementById('cart-modal');
    if (modal) {
        modal.classList.toggle('active');
        if (modal.classList.contains('active')) {
            cartManager.updateCartModal();
        }
    }
}
