// import components
import checkUserAccessToken from "../components/checkAccessToken.js";

let shoppingCart = document.querySelector('a#shoppingBagCart');
console.log(shoppingCart);

document.addEventListener('DOMContentLoaded', ()=>{
    // Get header and footer logo link
    let headerLogoLink = document.getElementById('header-logo-img-link'); // return <a> element
    let footerLogoLink = document.getElementById('footer-logo-img-link'); // return <a> element


    const userAccess = checkUserAccessToken(); // returns boolean
    let logoLinkTo = undefined;
    let cartLink = undefined;
    if(userAccess){
        logoLinkTo = '../pages/all-products.html'; // home when there is user logged in
        cartLink = '../pages/cart-and-checkout.html';
        console.log(cartLink);
    }else{
        logoLinkTo = '../index.html'; // homepage when no user logged in
        cartLink = '../pages/login.html';
        console.log(cartLink);
    }

    shoppingCart.href = "";
    headerLogoLink.href = logoLinkTo;
    footerLogoLink.href = logoLinkTo;

    shoppingCart.href = cartLink;
    console.log(shoppingCart.href);
});