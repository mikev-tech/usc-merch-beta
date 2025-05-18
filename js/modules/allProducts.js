// Import components
import checkUserAccessToken from "../components/checkAccessToken.js";
import createProductCard from "../components/createProductCard.js";
import fetch_allProducts from "../components/fetch_allProducts.js";
import displayProductCard from "../components/displayProductCard.js";

// Get Product Parent Container
let parentDiv = document.getElementById('product-parent-container');
// console.log(parentDiv);

document.addEventListener('DOMContentLoaded', async function(){
    // let card = createProductCard();

    // Fetch all products
    const products = await fetch_allProducts();
    console.log(products);

    // check user login access token
    const userToken = await checkUserAccessToken();

    products.forEach((product) => {
        let card = createProductCard();
        displayProductCard(parentDiv, card, product, userToken);
    });
});