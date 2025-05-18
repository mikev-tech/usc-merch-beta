// import components
import createUser from '../components/signupCreateUser.js';
import updateSignupUserSession from '../components/updateSignupUserSession.js';

// Get signup form element
const signup = document.getElementById('signupForm');

signup.addEventListener('submit', async function(event){
    event.preventDefault(); // prevent browser default process when submitting forms

    // Get <input> element and its value
    // const firstName = document.getElementById('firstName').value;
    // const lastName = document.getElementById('lastName').value;
    // const age = document.getElementById('age').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const user = {
        // firstName: firstName,
        // lastName: lastName,
        // age: age,
        email: email,
        password: password,
    };

    const newUser = await createUser(user);
    if(newUser && newUser.id){
        const userObj = await updateSignupUserSession(newUser);
        alert('new User is created');
        console.log(userObj);
        window.location.href = '/pages/login.html'
    }
});