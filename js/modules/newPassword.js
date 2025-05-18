import filterUser from "../components/filterUser.js";
import updatePassword from "../components/updatePassword.js";
import forgotPasswordSession from "../components/forgotPasswordSession.js";


// Get forgotPasswordForm element
const forgotPasswordForm = document.getElementById('forgotPasswordForm');

forgotPasswordForm.addEventListener('submit', async function(event){
    event.preventDefault();

    // Get <input> elements and its value;
    const username = document.getElementById('username').value;
    const newPassword = document.getElementById('newPassword').value;

    // filter user with username
    const results = await filterUser(username);
    if(results.users && results.users.length > 0){
        const user_found = results.users[0]; // Get the first matching user
        alert(`Found user ${username}`);

        console.log('Found User: ', user_found);
        const updatedUser = await updatePassword(user_found.id, newPassword);
        console.log('Update User: ', updatedUser);

        const updatedUserPass = await forgotPasswordSession(updatedUser);

        // Redirect to Login page
        window.location.href = '../../login.html';
    }
});