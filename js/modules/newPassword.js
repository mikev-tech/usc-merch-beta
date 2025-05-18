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
        window.location.href = '/pages/login.html';
    }
});

// // // JS-componenets: filter user with username
// async function filterUser(username){
//     try {
//         const response = await fetch(`https://dummyjson.com/users/filter?key=username&value=${username}`);
//         if(!response.ok){
//             throw new Error(`HTTP Error! Status: ${response.status}`);
//         }
//         const user = await response.json();
//         return user;
//     } catch(error){
//         console.error('User not found: ', error.message);
//         alert('No user found at the moment.');
//         throw error;
//     }
// }


// // JS-componenets: Update password of user with userID
// async function updatePassword(userID, newPassword){
//     try {
//         const response = await fetch(`https://dummyjson.com/users/${userID}`, {
//             method: 'PUT', /* or PATCH */
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 password: newPassword,
//             })
//         })

//         if(!response.ok){
//             throw new Error(`HTTP Error! Status: ${response.status}`);
//         }

//         const updatedUser = await response.json();
//         return updatedUser;
//     } catch(error){
//         console.error('Password Update Failed: ', error.message);
//         alert('Cannot update password at the moment.');
//         throw error;
//     }
// }

// // JS-Components: Add or update localStorage session key 'updatePasswordSession'
// function forgotPasswordSession(updatedUser){
//     // Get key item from localStorage Session
//     let updatePasswordSession = localStorage.getItem('updatePasswordSession');

//     // Parse Existing data or create new Object
//     let userObj = updatePasswordSession ? JSON.parse(updatePasswordSession) : {};

//     // Add or update with new data
//     Object.assign(userObj, updatedUser);

//     // Stringify the updated object
//     const updateUserObj = JSON.stringify(userObj);

//     // Save back to localStorage
//     localStorage.setItem('updatePasswordSession', updateUserObj);

//     return userObj; // Return the updated object for convenience
// }