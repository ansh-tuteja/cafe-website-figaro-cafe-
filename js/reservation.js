// Set minimum date to today
const dateInput = document.getElementById('date');
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);

// Handle form submission
document.getElementById('reservationForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        guests: document.getElementById('guests').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        occasion: document.getElementById('occasion').value,
        message: document.getElementById('message').value,
        createdAt: new Date().toISOString()
    };
    
    try {
        // Show loading state
        const submitBtn = document.querySelector('.submit-reservation-btn');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        submitBtn.disabled = true;
        
        // Send to backend
        const response = await fetch('http://localhost:3000/api/reservations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // Hide form and show success message
            document.getElementById('reservationForm').style.display = 'none';
            document.getElementById('successMessage').style.display = 'block';
            
            // Send confirmation email (would be handled by backend in production)
            console.log('Reservation created:', data);
            
            // Reset form after 5 seconds and reload
            setTimeout(() => {
                window.location.reload();
            }, 5000);
        } else {
            throw new Error(data.message || 'Failed to create reservation');
        }
        
    } catch (error) {
        console.error('Error:', error);
        alert('Sorry, there was an error processing your reservation. Please try again or call us directly.');
        
        // Reset button
        const submitBtn = document.querySelector('.submit-reservation-btn');
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
});

// Check if coming from menu page with cart
document.addEventListener('DOMContentLoaded', () => {
    const cart = localStorage.getItem('cart');
    if (cart) {
        const cartItems = JSON.parse(cart);
        // You can display cart items or pre-fill message
        const messageField = document.getElementById('message');
        if (cartItems.length > 0) {
            let orderText = 'Pre-order items:\n';
            cartItems.forEach(item => {
                orderText += `${item.name} x ${item.quantity}\n`;
            });
            messageField.value = orderText;
        }
    }
});
