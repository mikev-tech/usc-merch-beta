// Import components
import checkUserAccessToken from "../components/checkAccessToken.js";
import createProductCard from "../components/createProductCard.js";
import fetch_productsByCategory from "../components/fetch_productsByCategory.js";
import displayProductCard from "../components/displayProductCard.js";
import productCategory_params from "../components/productCategory_params.js";

// Get Product Parent Container
let parentDiv = document.getElementById('product-parent-container');
// console.log(parentDiv);

document.addEventListener('DOMContentLoaded', async function (){

    // Get category url variable
    const category = await productCategory_params();

    // Fetch products by category
    const products = await fetch_productsByCategory(category);
    console.log(products);

    // check user login access token
    const userToken = await checkUserAccessToken();

    products.forEach((product) => {
        let card = createProductCard();
        displayProductCard(parentDiv, card, product, userToken);
    });
});