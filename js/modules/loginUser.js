import loginAuth from '/js/components/loginAuthentication.js'

// Get Form Element
const loginForm = document.getElementById('loginForm');

// Add event listener properly
loginForm.addEventListener('submit', async function(event) {
    event.preventDefault(); // prevent browser form submission default process
            
    // Get username and password input
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const authData = await loginAuth(username, password);
    console.log(authData);

    // Check if there is Access Token for Successfull Login
    if(authData && authData.accessToken){
        // window.alert('Succesfull Login!');
        // alert('Welcome back, ', authData.firstName);
        // console.log('Succesfull Login: ', authData.accessToken);

        // Store access token and userID in localStorage
        localStorage.setItem('loginAuth', JSON.stringify({
            accessToken: authData.accessToken,
            id: authData.id, // userID for logged in User
        }));

        // Redirect to User Dashboard
        // Or I can redirect it to All Products Page
        window.location.href= `../pages/profile.html?id=${authData.id}`;
    }
});