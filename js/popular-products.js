let targetPage = 'pages/product-page.html';

async function fetchData(){
    try {
        const response = await fetch('https://dummyjson.com/products');

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
    const data = await fetchData();
    const products = data.products;
    console.log(products);

    if(products.length > 0){
        let cards = document.querySelectorAll('div.card-popular');
        const popular = [1, 3, 6, 5];

        let i = 0;
        for(const card of cards){
            const cardImage = card.querySelector('img.popular-image');
            const cardTitle = card.querySelector('h4.select-none');
            const cardAnchor = card.querySelector('a.urlVariables');

            const title = products[popular[i]].title;
            // Only use the first image if available
            const imageUrl = products[popular[i]].images && products[popular[i]].images.length > 0 ? 
                products[popular[i]].images[0] : 
                './images/SAS.jpg';
            const linkVariables = `./${targetPage}?id=${products[popular[i]].id}`;

            cardImage.src = imageUrl;
            cardTitle.innerHTML = title;
            cardAnchor.href = linkVariables;
            i++;
        }
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
});



  