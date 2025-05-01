import getProduct from "./getSingleProduct.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

if(urlParams.has('id')){
    displayProduct();
}

async function displayProduct(){
    const productID = urlParams.get('id');
    console.log(productID);

    const apiLink = 'https://api.escuelajs.co/api/v1/products';
    const getSingleProduct = `${apiLink}/${productID}`;

    const product = await getProduct(getSingleProduct);

    const productImgDesc = document.querySelector('div.product-imgDesc');
    const productForm = document.querySelector('div.product-form');

    productImage = productImgDesc.querySelector('img.productImage');
    productDescription = productImgDesc.querySelector('p#description');
    productTitle = productForm.querySelector('h1#name');
    productStock = productForm.querySelector('p#stock');
    productPrice = productForm.querySelector('p#price');
    productSKU = productForm.querySelector('span#sku');

    const {} = product;
}