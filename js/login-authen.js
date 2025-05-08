// Check if user is already logged in
function checkAuthStatus() {
    const userData = localStorage.getItem('userData');
    if (userData) {
        // Parse the stored user data
        const user = JSON.parse(userData);
        
        // Update the UI with user information
        document.getElementById('user-fullname').textContent = `${user.firstName} ${user.lastName}`;
        document.getElementById('user-email').textContent = user.email;
        document.getElementById('user-username').textContent = user.username;
        document.getElementById('user-token').textContent = user.token.substring(0, 20) + '...';
        
        // Set profile image if available
        if (user.image) {
            document.getElementById('user-image').src = user.image;
        }
        
        // Show user data section and hide login form
        document.getElementById('user-data').style.display = 'block';
        document.getElementById('login-section').style.display = 'none';
        
        return true;
    }
    return false;
}

// Function to handle user login
async function loginUser(username, password) {
    try {
        // Show loading state
        const loadingElement = document.getElementById('loading-status');
        const loginButton = document.getElementById('login-button');
        
        loadingElement.textContent = 'Logging in...';
        loginButton.disabled = true;
        
        const response = await fetch('https://dummyjson.com/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                password: password,
                expiresInMins: 30, // optional, defaults to 60
            }),
        });
        
        const data = await response.json();
        
        // Check if login was successful
        if (response.ok) {
            // Success - store token and user details
            localStorage.setItem('authToken', data.token);
            localStorage.setItem('userData', JSON.stringify(data));
            
            console.log('Login successful:', data);
            return {
                success: true,
                data: data
            };
        } else {
            // API returned an error
            console.error('Login failed:', data.message || 'Unknown error');
            return {
                success: false,
                error: data.message || 'Login failed. Please check your credentials.'
            };
        }
    } catch (error) {
        // Network or other error
        console.error('Login error:', error);
        return {
            success: false,
            error: 'Connection error. Please check your internet connection.'
        };
    } finally {
        // Clear loading state
        const loadingElement = document.getElementById('loading-status');
        const loginButton = document.getElementById('login-button');
        
        loadingElement.textContent = '';
        loginButton.disabled = false;
    }
}

// Handle form submission
document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorElement = document.getElementById('error-message');
    
    errorElement.textContent = '';
    
    const result = await loginUser(username, password);
    
    if (result.success) {
        // Update UI with user data
        checkAuthStatus();
    } else {
        // Display error message
        errorElement.textContent = result.error;
    }
});

// Handle logout
document.getElementById('logout-button').addEventListener('click', () => {
    // Clear stored user data
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    
    // Show login form and hide user data
    document.getElementById('user-data').style.display = 'none';
    document.getElementById('login-section').style.display = 'block';
    
    // Clear form fields
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
});

// Check auth status when page loads
document.addEventListener('DOMContentLoaded', () => {
    checkAuthStatus();
});