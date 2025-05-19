        // Store products in an array
        let products = [];
        
        // DOM elements
        const addProductForm = document.getElementById('addProductForm');
        const productListEl = document.getElementById('productList');
        const notificationEl = document.getElementById('notification');
        
        // Load products from localStorage if available
        function loadProducts() {
            const savedProducts = localStorage.getItem('products');
            if (savedProducts) {
                products = JSON.parse(savedProducts);
                renderProducts();
            }
        }
        
        // Save products to localStorage
        function saveProducts() {
            localStorage.setItem('products', JSON.stringify(products));
        }
        
        // Show notification
        function showNotification(message, isError = false) {
            notificationEl.textContent = message;
            notificationEl.classList.add('show');
            
            if (isError) {
                notificationEl.classList.add('error');
            } else {
                notificationEl.classList.remove('error');
            }
            
            setTimeout(() => {
                notificationEl.classList.remove('show');
            }, 3000);
        }
        
        // Generate unique ID for products
        function generateId() {
            return Date.now().toString(36) + Math.random().toString(36).substring(2);
        }
        
        // Add new product
        function addProduct(name, price, description) {
            const newProduct = {
                id: generateId(),
                name,
                price,
                description
            };
            
            products.push(newProduct);
            saveProducts();
            renderProducts();
            showNotification(`"${name}" added successfully!`);
        }
        
        // Remove product
        function removeProduct(id) {
            const productIndex = products.findIndex(product => product.id === id);
            if (productIndex !== -1) {
                const removedProduct = products[productIndex];
                products.splice(productIndex, 1);
                saveProducts();
                renderProducts();
                showNotification(`"${removedProduct.name}" removed successfully!`);
            }
        }
        
        // Render all products to the DOM
        function renderProducts() {
            if (products.length === 0) {
                productListEl.innerHTML = '<div class="empty-message">No products added yet. Add your first product above!</div>';
                return;
            }
            
            productListEl.innerHTML = '';
            
            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'product-card';
                
                productCard.innerHTML = `
                    <div class="product-info">
                        <div class="product-name">${product.name}</div>
                        <div class="product-price">₱${parseFloat(product.price).toFixed(2)}</div>
                        <div class="product-description">${product.description || 'No description provided'}</div>
                        <button class="remove-btn" data-id="${product.id}">Remove</button>
                    </div>
                `;
                
                productListEl.appendChild(productCard);
            });
            
            // Add event listeners to remove buttons
            document.querySelectorAll('.remove-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const id = this.getAttribute('data-id');
                    removeProduct(id);
                });
            });
        }
        
        // Handle form submission
        addProductForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('productName');
            const priceInput = document.getElementById('productPrice');
            const descriptionInput = document.getElementById('productDescription');
            
            const name = nameInput.value.trim();
            const price = priceInput.value;
            const description = descriptionInput.value.trim();
            
            if (!name || !price) {
                showNotification('Product name and price are required!', true);
                return;
            }
            
            addProduct(name, price, description);
            
            // Reset form
            nameInput.value = '';
            priceInput.value = '';
            descriptionInput.value = '';
            nameInput.focus();
        });
        
        // Initialize the app
        document.addEventListener('DOMContentLoaded', function() {
            loadProducts();
        });