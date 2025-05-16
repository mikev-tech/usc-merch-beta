// DOM Elements
const uploadAvatarBtn = document.getElementById('upload-avatar');
const deleteAvatarBtn = document.getElementById('delete-avatar');
const avatarUploadInput = document.getElementById('avatar-upload');
const avatarImg = document.getElementById('avatar-img');
const editPasswordBtn = document.getElementById('edit-password');
const passwordModal = document.getElementById('password-modal');
const modalCloseBtn = document.querySelector('.close');
const modalCancelBtn = document.querySelector('.modal-cancel');
const passwordForm = document.getElementById('password-form');
const personalInfoForm = document.getElementById('personal-info-form');
const shippingPaymentForm = document.getElementById('shipping-payment-form');

// Default avatar URL (placeholder)
const defaultAvatarUrl = 'https://via.placeholder.com/150';

// Event Listeners
uploadAvatarBtn.addEventListener('click', () => {
    avatarUploadInput.click();
});

deleteAvatarBtn.addEventListener('click', () => {
    avatarImg.src = defaultAvatarUrl;
    // Here you would typically also send a request to your backend
    // to delete the user's avatar
    alert('Avatar deleted successfully');
});

avatarUploadInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        const file = e.target.files[0];
        const reader = new FileReader();
        
        reader.onload = (e) => {
            avatarImg.src = e.target.result;
            // Here you would typically also send the file to your backend
            // for storage using FormData and fetch API
        };
        
        reader.readAsDataURL(file);
    }
});

// Password modal functionality
editPasswordBtn.addEventListener('click', () => {
    passwordModal.style.display = 'block';
});

modalCloseBtn.addEventListener('click', () => {
    passwordModal.style.display = 'none';
});

modalCancelBtn.addEventListener('click', () => {
    passwordModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === passwordModal) {
        passwordModal.style.display = 'none';
    }
});

// Password form submission
passwordForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const currentPassword = document.getElementById('current-password').value;
    const newPassword = document.getElementById('new-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;
    
    // Simple validation
    if (!currentPassword || !newPassword || !confirmPassword) {
        alert('Please fill in all password fields');
        return;
    }
    
    if (newPassword !== confirmPassword) {
        alert('New password and confirmation do not match');
        return;
    }
    
    // Here you would typically send this data to your backend
    // to verify the current password and update to the new one
    
    alert('Password updated successfully');
    passwordModal.style.display = 'none';
    passwordForm.reset();
});

// Personal info form submission
personalInfoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Here you would collect all form data and send to your backend
    alert('Personal information updated');
});

// Shipping and payment form submission
shippingPaymentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Here you would collect all form data and send to your backend
    alert('Shipping and payment information updated');
});

// Load user data when page loads
window.addEventListener('DOMContentLoaded', () => {
    // Here you would typically fetch user data from your backend
    // and populate the form fields
    
    // For demonstration, we'll use dummy data
    const userData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '(123) 456-7890',
        username: 'johndoe',
        age: 35,
        address: '123 Main St',
        city: 'Any City',
        state: 'CA',
        zip: '12345',
        cardNumber: '**** **** **** 1234',
        cardName: 'John Doe'
    };
    
    // Populate form fields with user data
    document.getElementById('first-name').value = userData.firstName;
    document.getElementById('last-name').value = userData.lastName;
    document.getElementById('email').value = userData.email;
    document.getElementById('phone').value = userData.phone;
    document.getElementById('username').value = userData.username;
    document.getElementById('age').value = userData.age;
    document.getElementById('address').value = userData.address;
    document.getElementById('city').value = userData.city;
    document.getElementById('state').value = userData.state;
    document.getElementById('zip').value = userData.zip;
    document.getElementById('card-number').value = userData.cardNumber;
    document.getElementById('card-name').value = userData.cardName;
});