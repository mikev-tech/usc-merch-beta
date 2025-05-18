// // JS-componenets: filter user with username
async function filterUser(username){
    try {
        const response = await fetch(`https://dummyjson.com/users/filter?key=username&value=${username}`);
        if(!response.ok){
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        const user = await response.json();
        return user;
    } catch(error){
        console.error('User not found: ', error.message);
        alert('No user found at the moment.');
        throw error;
    }
}

export default filterUser;