// Category Filter
const tabBtns = document.querySelectorAll('.tab-btn');
const menuItems = document.querySelectorAll('.menu-item');

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
            } else {
                item.classList.add('hidden');
            }
        });
    });
});

// Checkout Function
function checkout() {
    if (cartManager.cart.items.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    // Simple checkout - you can customize this
    const name = prompt('Enter your name:');
    const phone = prompt('Enter your phone number:');
    const address = prompt('Enter your delivery address:');
    
    if (name && phone && address) {
        const customerInfo = {
            name: name,
            phone: phone,
            address: address,
            email: '' // Can add email field if needed
        };
        
        cartManager.placeOrder(customerInfo).then(success => {
            if (success) {
                toggleCartModal();
                alert('Order placed successfully! We will contact you soon.');
            }
        });
    }
}
