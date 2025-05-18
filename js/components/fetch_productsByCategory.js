async function fetch_productsByCategory(category){
    try {
        const res = await fetch(`https://dummyjson.com/products/category/${category}`);
        if(!res.ok){
            throw new Error(`HTTP Error! Status: ${res.status}`);
        }
        const products = await res.json();
        return products.products; // returns products by category
    } catch(error){
        console.error('Fetch products by category failed: ', error.message);
        throw error;
    }
}

export default fetch_productsByCategory;