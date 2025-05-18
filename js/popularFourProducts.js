// JS-Components: for Suggested Products & P
async function fetch_popularFourProducts(){
    const randomSkip = Math.floor(Math.random() * 10) + 1; // Returns a random integer from 1 to 10
    try {
        const res = await fetch(`https://dummyjson.com/products?limit=4&skip=${randomSkip}&select=title,images`);
        if(!res.ok){
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return await res.json();
    } catch(error){
        console.error('Failed Fetch Products: ', error.message);
        throw error;
    }
}

function getAllProductCards(){
    return document.querySelectorAll('.product-card');
}

async function displayProducts(productCards, products, accessToken){
    products.forEach((product, i) => {
        // Accessing Card Elements
        const card = productCards[i];
        const cardImg = card.querySelector('img.popular-image');
        const cardTitle = card.querySelector('h4.select-none');
        const cardAnchor = card.querySelector('a.urlVariables');

        // Extract product data 
        const title = product.title;
        // Only use the first image if available
        const imageUrl = product.images && product.images.length > 0 ? 
            product.images[0] : '../images/SAS.jpg'; // double check the SAS.jpg relative link

        // Assigns product data value to card
        cardTitle.textContent = title;
        cardImg.src = imageUrl;

        // Redirect to login page if there is no user login access token
        accessToken ? cardAnchor.href = `./pages/product-page.html?id=${product.id}`: cardAnchor.href = './pages/login.html';
        
    });
}


// JS-Components: Check if there is login user access token
function checkUserAccessToken(){
    const loginAuth = localStorage.getItem('loginAuth');
    // Check if there is loginAuth key stored locally
    if(loginAuth){
        const authData = JSON.parse(loginAuth);
        return authData && authData.accessToken ? true : false;
    }
    return false;
}

// Initializes page loads
document.addEventListener('DOMContentLoaded', async function(){
    try {
        const productCards = getAllProductCards();
        const fourProductsData = await fetch_popularFourProducts();
        const userToken = checkUserAccessToken();
        
        if (productCards.length > 0 && fourProductsData && fourProductsData.products) {
            displayProducts(productCards, fourProductsData.products, userToken);
        } else {
            console.error('Missing product cards or product data');
        }
    } catch (error) {
        console.error('Error initializing products:', error);
    }
});