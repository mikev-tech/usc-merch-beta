// JS-Components: for Suggested Products & P
async function fetch_similarFourProducts(){
    const randomSkip = Math.floor(Math.random() * 10) + 1; // Returns a random integer from 1 to 10
    try {
        const res = await fetch(`https://dummyjson.com/products?limit=4&skip=${randomSkip}&select=title,images`);
        if(!res.ok){
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const products = await res.json();
        return products.products;
    } catch(error){
        console.error('Failed Fetch Products: ', error.message);
        throw error;
    }
}

export default fetch_similarFourProducts;