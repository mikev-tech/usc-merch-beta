// import components
import checkUserAccessToken from "../components/checkAccessToken.js"

window.addEventListener('DOMContentLoaded', async function () {
    // Check user access token
    const userAccess = checkUserAccessToken(); // returns true or false
    if(userAccess){
        let authData = JSON.parse(localStorage.getItem('loginAuth'));
        console.log(authData);

        const userId = authData.id;
        console.log(userId);
        const cart = await getUserCart(userId);
        console.log(cart);
    }
});

// JS-component: getting carts by user with userId
async function getUserCart(userId){
    try {
        const res = await fetch(`https://dummyjson.com/carts/user/${userId}`);
        if(!res.ok){
            throw new Error(`HTTP Error! Status: ${res.status}`);
        }
        const data = await res.json(); // returns json
        return data; // should return the cart with the products
    } catch(error) {
        console.error('Failed to get user card: ', error.message);
        throw error;
    }
}