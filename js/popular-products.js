async function fetchData(){
    try {
        const response = await fetch('https://api.escuelajs.co/api/v1/products');

        if(!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const products = await response.json();
        return products;
    } catch(error){
        console.error('Error occurred: ', error.message);
    }
}

async function displayProducts(){
    const products = await fetchData();
    console.log(products);

    if(products.length > 0){
        let popularImages = document.querySelectorAll('img.popular-image');
        let popularTitles = document.querySelectorAll('h4.select-none');
        const popular = [1, 25, 6, 5];

        for(let i = 0; i < 4; i++){
            const title = products[popular[i]].title;
            // Only use the first image if available
            const imageUrl = products[popular[i]].images && products[popular[i]].images.length > 0 ? 
                products[popular[i]].images[0] : 
                './images/SAS.jpg';

            popularImages[i].src = imageUrl;
            popularTitles[i].innerHTML = title;
        }
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
});



  