// JS-component: Create product Card
function createProductCard(){
    // Template
    // <div class="card-popular product-card">
    //     <a href="../pages/login.html" class="urlVariables">
    //         <img src="../images/SAS.jpg" alt="Avatar" style="width:100%" class="popular-image">
    //         <div class="container product-info">
    //             <h4 class="select-none">Lorem Ipsum</h4>
    //         </div>
    //     </a>
    // </div>

    let productCard = document.createElement('div');

    // Assign attributes
    // productCard.id = '';
    productCard.className = 'card-popular product-card';
    
    // Creating the innerHTML template
    productCard.innerHTML =
        `<a href="#" class="urlVariables">
            <img src="../images/SAS.jpg" alt="Avatar" style="width:100%" class="popular-image">
            <div class="container product-info">
                <h4 class="select-none">Lorem Ipsum</h4>
            </div>
        </a>`;
    
    return productCard;
}

export default createProductCard;