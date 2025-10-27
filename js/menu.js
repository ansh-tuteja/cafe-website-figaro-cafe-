// Category Filter - Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const menuItems = document.querySelectorAll('.menu-item');

    // Show all items on page load
    menuItems.forEach(item => {
        item.classList.remove('hidden');
        item.style.display = '';
    });

    // Add click listeners to filter buttons
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const category = btn.dataset.category;
            
            menuItems.forEach(item => {
                if (category === 'all' || item.dataset.category === category) {
                    item.classList.remove('hidden');
                    item.style.display = '';
                } else {
                    item.classList.add('hidden');
                    item.style.display = 'none';
                }
            });
        });
    });
});

// Checkout Function
function checkout() {
    try {
        if (!cartManager || !cartManager.cart) {
            alert('Cart system not available. Please refresh the page.');
            return;
        }

        if (cartManager.cart.items.length === 0) {
            alert('Your cart is empty! Please add some items first.');
            return;
        }
        
        // Simple checkout - you can customize this
        const name = prompt('Enter your name:');
        if (!name) {
            alert('Name is required to place an order.');
            return;
        }

        const phone = prompt('Enter your phone number:');
        if (!phone) {
            alert('Phone number is required to place an order.');
            return;
        }

        // Validate phone number (basic validation)
        if (!/^\d{10}$/.test(phone.replace(/\D/g, ''))) {
            alert('Please enter a valid 10-digit phone number.');
            return;
        }

        const address = prompt('Enter your delivery address:');
        if (!address) {
            alert('Delivery address is required to place an order.');
            return;
        }
        
        const customerInfo = {
            name: name.trim(),
            phone: phone.trim(),
            address: address.trim(),
            email: '' // Can add email field if needed
        };
        
        cartManager.placeOrder(customerInfo).then(success => {
            if (success) {
                toggleCartModal();
                alert('✓ Order placed successfully! We will contact you soon. ☕');
            } else {
                alert('Failed to place order. Please try again.');
            }
        }).catch(error => {
            console.error('Checkout error:', error);
            alert('An error occurred while placing your order. Please try again.');
        });
    } catch (error) {
        console.error('Checkout error:', error);
        alert('An error occurred. Please refresh the page and try again.');
    }
}
