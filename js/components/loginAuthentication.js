async function loginAuth(user, pass) {
    try {
        const response = await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: user,
                password: pass,
                expiresInMins: 30, // optional, defaults to 60
            }),
        });

        if(!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const authData = await response.json();
        return authData;
        
    } catch(error) {
        console.error('Login failed:', error);
        // Handle login failure (show error message to user)
        alert('Login failed. Please check your username and password.');
        throw error; // <== This line throws the error again
    }
}

export default loginAuth;