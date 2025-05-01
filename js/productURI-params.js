const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

if(urlParams.has('id')){
    const productID = urlParams.get('id');
    console.log(productID);

    const apiLink = 'https://api.escuelajs.co/api/v1/products';
    const getSingleProduct = `${apiLink}/${productID}`;
    getProduct(getSingleProduct);
}