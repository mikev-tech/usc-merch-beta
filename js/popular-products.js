let targetPage = 'product-page.html';

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
        let cards = document.querySelectorAll('div.card-popular');

        let popularImages = document.querySelectorAll('img.popular-image');
        let popularTitles = document.querySelectorAll('h4.select-none');
        const popular = [1, 25, 6, 5];

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



  