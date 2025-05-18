// JS-componenets: Fetch All Products, select specific data on products: title, img
async function fetch_allProducts(){
    try {
        const response = await fetch('https://dummyjson.com/products?select=title,images');
        if(!response.ok){
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const products = await response.json(); // returns json objects, in theory
        return products.products; // returns the products
    } catch(error) {
        console.error('Failed to fetch all products: ', error.message);
        throw error;
    }

}

export default fetch_allProducts;