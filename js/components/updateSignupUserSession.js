// JS-Components: Add or update localStorage session key 'signupUser'
function updateSignupUserSession(newUser){
    // Get existing Data
    let signupUserSession = localStorage.getItem('signupUser');

    // Parse Existing data or create new Object
    let userObj = (signupUserSession) ? JSON.parse(signupUserSession) : {};

    // Add or update with new data
    Object.assign(userObj, newUser);

    // Stringify the updated object
    const updateUserObj = JSON.stringify(userObj);

    // Save back to localStorage
    localStorage.setItem('signupUser', updateUserObj);

    return userObj; // Return the updated object for convenience
}

export default updateSignupUserSession;