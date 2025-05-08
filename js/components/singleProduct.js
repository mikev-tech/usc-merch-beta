async function getProduct(api){
    try{
        const response = await fetch(api);
        if(!response.ok){
            throw new Error(`HTTPS Status Error: ${response.status}`);
        }
        const product = await response.json();
        return product;
    }catch(error){
        console.error('Error occurred: ', error.message);
    };
}
export default getProduct;