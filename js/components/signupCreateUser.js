async function createUser(user){
    try {
        const {firstName, lastName, age, email, password} = user;

        const response = await fetch('https://dummyjson.com/users/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                firstName: firstName,
                lastName: lastName,
                age: age,
                email: email,
                password: password,
                /* other user data */
            })
        });

        if(!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch(error) {
        console.error('Cannot create account at the moment: ', error.message);
        alert('Error: Cannot register new account.');
        throw error;
    }
}

export default createUser;