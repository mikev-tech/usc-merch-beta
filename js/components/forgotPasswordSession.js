// JS-Components: Add or update localStorage session key 'updatePasswordSession'
function forgotPasswordSession(updatedUser){
    // Get key item from localStorage Session
    let updatePasswordSession = localStorage.getItem('updatePasswordSession');

    // Parse Existing data or create new Object
    let userObj = updatePasswordSession ? JSON.parse(updatePasswordSession) : {};

    // Add or update with new data
    Object.assign(userObj, updatedUser);

    // Stringify the updated object
    const updateUserObj = JSON.stringify(userObj);

    // Save back to localStorage
    localStorage.setItem('updatePasswordSession', updateUserObj);

    return userObj; // Return the updated object for convenience
}

export default forgotPasswordSession;