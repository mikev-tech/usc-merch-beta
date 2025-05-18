// JS-componenets: Update password of user with userID
async function updatePassword(userID, newPassword){
    try {
        const response = await fetch(`https://dummyjson.com/users/${userID}`, {
            method: 'PUT', /* or PATCH */
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                password: newPassword,
            })
        })

        if(!response.ok){
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const updatedUser = await response.json();
        return updatedUser;
    } catch(error){
        console.error('Password Update Failed: ', error.message);
        alert('Cannot update password at the moment.');
        throw error;
    }
}

export default updatePassword;