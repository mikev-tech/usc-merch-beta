// JS-components: Display Product Cards, per product card with accessToken to check if user is logged in
async function displayProductCard(parentDiv, card, product, accessToken){
    // Get elements
    const cardImg = card.querySelector('img.popular-image');
    const cardTitle = card.querySelector('h4.select-none');
    const cardAnchor = card.querySelector('a.urlVariables');

    // Deconstruct product obj
    const {title, id} = product;

    // Only use the first image if available
    const imageUrl = product.images && product.images.length > 0 ? 
        product.images[0] : '../images/SAS.jpg'; // double check the SAS.jpg relative link

    // Assign the product data value to the elements
    cardImg.src = imageUrl;
    cardTitle.textContent = title;
    
    // Redirect to login page if there is no user login access token
    accessToken ? cardAnchor.href = `../pages/product-page.html?id=${id}`: cardAnchor.href = '../pages/login.html';
    // console.log(cardAnchor.href);

    // Append new card to parentDiv
    parentDiv.appendChild(card);
}

export default displayProductCard;