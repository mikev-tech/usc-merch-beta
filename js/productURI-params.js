const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);


async function id_params(){
    if(!urlParams.has('id')){
        return null;
    }
    const productID = urlParams.get('id');
    console.log(productID);
    
    const apiLink = 'https://dummyjson.com/products';
    const singleProductID = `${apiLink}/${productID}`;
    return singleProductID;
}

export default id_params;





