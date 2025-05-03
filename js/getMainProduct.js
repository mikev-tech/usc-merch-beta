import id_params from "./productURI-params.js";
import getProduct from "./getSingleProduct.js";

let productLeft = document.querySelector('#product-left');
let productForm = document.getElementById('product-form');
let breadcrumb = document.querySelector('nav#breadcrumb-parent');

let productImage = productLeft.querySelector('img.productImage');
let productDscrpt = productLeft.querySelector('p#description');

let productTitle = productForm.querySelector('h1#title');
let productStock = productForm.querySelector('p#stock');
let productPrice = productForm.querySelector('p#price');
let productCategory = productForm.querySelector('span#category');
let productSKU = productForm.querySelector('span#sku');

let breadcrumbCategory = breadcrumb.querySelector('a#breadcrumb-category');
let breadcrumbProduct = breadcrumb.querySelector('a#breadcrumb-product');

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    displayMainProduct();
});


async function displayMainProduct(){
    const productURI_ById = await id_params();
    if(productURI_ById === null){
        return;
    }

    const product = await getProduct(productURI_ById);
    console.log(product);

    const {title, price, description, id} = product;
    // Only use the first image if available
    const imageUrl = product.images && product.images.length > 0 ? 
                product.images[0] : './images/SAS.jpg';
    const category = product.category.name;
    
    document.title = title;
    breadcrumbProduct.innerHTML = title;
    breadcrumbCategory.innerHTML = category;

    productTitle.innerHTML = title;
    productImage.src = imageUrl;
    productDscrpt.innerHTML = description;
    productPrice.innerHTML = `₱${price.toLocaleString()}`;
}