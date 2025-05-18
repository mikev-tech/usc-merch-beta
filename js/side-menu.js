// Select elements
const menuBtn = document.querySelector('.menu-btn');
const closeBtn = document.querySelector('.close-btn');
const sidebar = document.querySelector('.sidebar');
const overlay = document.querySelector('.overlay');
const menuItems = document.querySelectorAll('.menu-items li');

// Toggle sidebar when menu button is clicked
menuBtn.addEventListener('click', () => {
    sidebar.classList.add('active');
    overlay.classList.add('active');
});

// Close sidebar when close button is clicked
closeBtn.addEventListener('click', () => {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
});

// Close sidebar when clicking outside (on overlay)
overlay.addEventListener('click', () => {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
});

// Add active class to menu item when clicked
menuItems.forEach(item => {
    item.addEventListener('click', function() {
        // Remove active class from all items
        menuItems.forEach(i => i.classList.remove('active'));
        
        // Add active class to clicked item
        this.classList.add('active');
        
        // If it's not the logout item, just close the sidebar on mobile
        if (window.innerWidth <= 768 && !this.classList.contains('logout')) {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        }
    });
});

// Set initial active tab (first tab)
if (menuItems.length > 0) {
    menuItems[0].classList.add('active');
}