// Global variables
let cart = [];
let subtotal = 0;
let deliveryFee = 0;
let discount = 0;
let total = 0;

// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    // Set current date + 5 days as default delivery date
    updateDeliveryDate();
    
    // Add to cart buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });
    
    // Delivery option change
    const deliveryOption = document.getElementById('delivery-option');
    deliveryOption.addEventListener('change', updateSummary);
    
    // Voucher option change
    const voucherOption = document.getElementById('voucher-option');
    voucherOption.addEventListener('change', updateSummary);
    
    // Payment method change
    const paymentMethod = document.getElementById('payment-method');
    paymentMethod.addEventListener('change', validateCheckout);
    
    // Checkout button
    const checkoutBtn = document.getElementById('checkout-btn');
    checkoutBtn.addEventListener('click', openCheckoutModal);
    
    // Close modal
    const closeModal = document.querySelector('.close-modal');
    if (closeModal) {
        closeModal.addEventListener('click', closeCheckoutModal);
    }
    
    // Place order button
    const placeOrderBtn = document.getElementById('place-order-btn');
    placeOrderBtn.addEventListener('click', placeOrder);
    
    // Continue shopping button
    const continueShoppingBtn = document.getElementById('continue-shopping');
    continueShoppingBtn.addEventListener('click', continueShopping);
    
    // Show empty cart message initially
    updateCartDisplay();
});

// Add to Cart Function
function addToCart(event) {
    const productCard = event.target.closest('.product-card');
    const productId = productCard.dataset.id;
    const productName = productCard.dataset.name;
    const productPrice = parseFloat(productCard.dataset.price);
    const productImage = productCard.querySelector('img').src;
    
    // Check if product is already in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            image: productImage,
            quantity: 1
        });
    }
    
    // Update cart display
    updateCartDisplay();
    updateSummary();
    
    // Notification animation
    const button = event.target;
    button.textContent = 'Added!';
    button.style.backgroundColor = '#2E8B57';
    
    setTimeout(() => {
        button.textContent = 'Add to Cart';
        button.style.backgroundColor = '#4CAF50';
    }, 1000);
}

// Update Cart Display Function
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const cartCount = document.getElementById('cart-count');
    const summaryCount = document.getElementById('summary-count');
    
    // Clear previous items
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        emptyCartMessage.style.display = 'block';
        cartCount.textContent = '0';
        summaryCount.textContent = '0';
        document.getElementById('checkout-btn').disabled = true;
        return;
    }
    
    // Hide empty cart message when items exist
    emptyCartMessage.style.display = 'none';
    document.getElementById('checkout-btn').disabled = false;
    
    // Update cart count
    let totalItems = 0;
    cart.forEach(item => {
        totalItems += item.quantity;
    });
    
    cartCount.textContent = totalItems;
    summaryCount.textContent = totalItems;
    
    // Add items to cart
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="${item.image}" class="cart-item-image" alt="${item.name}">
            <div class="cart-item-details">
                <p class="cart-item-name">${item.name}</p>
                <p class="cart-item-price">P ${item.price.toFixed(2)}</p>
                <div class="cart-item-actions">
                    <div class="quantity-control">
                        <button class="quantity-btn minus" data-id="${item.id}">-</button>
                        <input type="text" class="quantity-input" value="${item.quantity}" readonly>
                        <button class="quantity-btn plus" data-id="${item.id}">+</button>
                    </div>
                    <button class="remove-btn" data-id="${item.id}">Remove</button>
                </div>
            </div>
        `;
        
        cartItemsContainer.appendChild(cartItem);
    });
    
    // Add event listeners for quantity buttons
    const minusButtons = document.querySelectorAll('.quantity-btn.minus');
    const plusButtons = document.querySelectorAll('.quantity-btn.plus');
    const removeButtons = document.querySelectorAll('.remove-btn');
    
    minusButtons.forEach(button => {
        button.addEventListener('click', decreaseQuantity);
    });
    
    plusButtons.forEach(button => {
        button.addEventListener('click', increaseQuantity);
    });
    
    removeButtons.forEach(button => {
        button.addEventListener('click', removeItem);
    });
}

// Increase Quantity Function
function increaseQuantity(event) {
    const productId = event.target.dataset.id;
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity += 1;
        updateCartDisplay();
        updateSummary();
    }
}

// Decrease Quantity Function
function decreaseQuantity(event) {
    const productId = event.target.dataset.id;
    const item = cart.find(item => item.id === productId);
    
    if (item && item.quantity > 1) {
        item.quantity -= 1;
        updateCartDisplay();
        updateSummary();
    }
}

// Remove Item Function
function removeItem(event) {
    const productId = event.target.dataset.id;
    cart = cart.filter(item => item.id !== productId);
    
    updateCartDisplay();
    updateSummary();
}

// Update Summary Function
function updateSummary() {
    // Calculate subtotal
    subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });
    
    // Update delivery fee based on selection
    const deliveryOption = document.getElementById('delivery-option');
    deliveryFee = 0;
    
    if (deliveryOption.value === 'standard') {
        deliveryFee = 50;
    } else if (deliveryOption.value === 'express') {
        deliveryFee = 100;
    }
    
    // Apply voucher discount
    const voucherOption = document.getElementById('voucher-option');
    discount = 0;
    
    if (voucherOption.value === 'newuser' && subtotal > 0) {
        discount = subtotal * 0.1; // 10% discount
    } else if (voucherOption.value === 'freeship' && deliveryFee > 0) {
        discount = deliveryFee;
    } else if (voucherOption.value === 'discount20' && subtotal >= 1000) {
        discount = 200;
    }
    
    // Calculate total
    total = subtotal + deliveryFee - discount;
    
    // Update DOM elements
    document.getElementById('subtotal-price').textContent = `P ${subtotal.toFixed(2)}`;
    document.getElementById('delivery-fee').textContent = `P ${deliveryFee.toFixed(2)}`;
    document.getElementById('discount-amount').textContent = `-P ${discount.toFixed(2)}`;
    document.getElementById('total-price').textContent = `P ${total.toFixed(2)}`;
    
    // Validate checkout button
    validateCheckout();
}

// Update Delivery Date Function
function updateDeliveryDate() {
    const today = new Date();
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + 5); // Default to 5 days from now
    
    const formattedDate = deliveryDate.toLocaleDateString('en-US', { 
        month: '2-digit', 
        day: '2-digit', 
        year: '2-digit' 
    });
    
    document.getElementById('delivery-date').textContent = formattedDate;
}

// Validate Checkout Function
function validateCheckout() {
    const checkoutBtn = document.getElementById('checkout-btn');
    const deliveryOption = document.getElementById('delivery-option');
    const paymentMethod = document.getElementById('payment-method');
    
    if (cart.length > 0 && deliveryOption.value && paymentMethod.value) {
        checkoutBtn.disabled = false;
    } else {
        checkoutBtn.disabled = true;
    }
}

// Open Checkout Modal Function
function openCheckoutModal() {
    const modal = document.getElementById('checkout-modal');
    const checkoutItems = document.getElementById('checkout-items');
    const checkoutTotal = document.getElementById('checkout-total-price');
    
    // Clear previous items
    checkoutItems.innerHTML = '';
    
    // Add items to checkout summary
    cart.forEach(item => {
        const checkoutItem = document.createElement('div');
        checkoutItem.classList.add('checkout-item');
        checkoutItem.innerHTML = `
            <p>${item.name} (x${item.quantity})</p>
            <p>P ${(item.price * item.quantity).toFixed(2)}</p>
        `;
        
        checkoutItems.appendChild(checkoutItem);
    });
    
    // Set total price
    checkoutTotal.textContent = `P ${total.toFixed(2)}`;
    
    // Show modal
    modal.style.display = 'block';
}

// Close Checkout Modal Function
function closeCheckoutModal() {
    const modal = document.getElementById('checkout-modal');
    modal.style.display = 'none';
}

// Place Order Function
function placeOrder() {
    // Validate form (simple validation for demo)
    const fullName = document.getElementById('full-name').value;
    const address = document.getElementById('address').value;
    const contact = document.getElementById('contact').value;
    const email = document.getElementById('email').value;
    
    if (!fullName || !address || !contact || !email) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Close checkout modal
    closeCheckoutModal();
    
    // Generate random order number
    const orderNumber = 'ORD-' + Math.floor(Math.random() * 1000000);
    document.getElementById('order-number').textContent = orderNumber;
    
    // Set delivery date in confirmation
    document.getElementById('confirm-delivery-date').textContent = document.getElementById('delivery-date').textContent;
    
    // Show confirmation modal
    const confirmationModal = document.getElementById('order-confirmation');
    confirmationModal.style.display = 'block';
}

// Continue Shopping Function
function continueShopping() {
    const confirmationModal = document.getElementById('order-confirmation');
    confirmationModal.style.display = 'none';
    
    // Clear cart and reset everything
    cart = [];
    updateCartDisplay();
    updateSummary();
    
    // Reset form fields
    document.getElementById('full-name').value = '';
    document.getElementById('address').value = '';
    document.getElementById('contact').value = '';
    document.getElementById('email').value = '';
    
    // Reset dropdowns
    document.getElementById('delivery-option').selectedIndex = 0;
    document.getElementById('voucher-option').selectedIndex = 0;
    document.getElementById('payment-method').selectedIndex = 0;
    
    // Scroll to product section
    document.getElementById('product-showcase').scrollIntoView({
        behavior: 'smooth'
    });
}

// Function to handle window click event for modals
window.addEventListener('click', function(event) {
    const checkoutModal = document.getElementById('checkout-modal');
    const confirmationModal = document.getElementById('order-confirmation');
    
    if (event.target === checkoutModal) {
        checkoutModal.style.display = 'none';
    }
    
    if (event.target === confirmationModal) {
        confirmationModal.style.display = 'none';
    }
});