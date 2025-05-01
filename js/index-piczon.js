document.addEventListener('DOMContentLoaded', function() {
    const slidingBackground = document.getElementById('sliding');
    
    if (!slidingBackground) {
        console.error("Could not find element with ID 'sliding'");
        return;
    }
    
    try {
        const backgroundImages = [
            './images/bg-images/sasmerch.jpg',    
            './images/bg-images/safadmerch.jpg',
            './images/bg-images/soemerch.jpg',
            './images/bg-images/sbemerch.jpg',
            './images/bg-images/othersmerch.jpg'
        ];
        
        let currentImageIndex = 0;

        slidingBackground.style.backgroundImage = `url('${backgroundImages[currentImageIndex]}')`;
        
        // Log success
        console.log("Initial background set to:", backgroundImages[currentImageIndex]);

        function changeBackground() {
            currentImageIndex = (currentImageIndex + 1) % backgroundImages.length;
            slidingBackground.style.backgroundImage = `url('${backgroundImages[currentImageIndex]}')`;
            console.log("Background changed to:", backgroundImages[currentImageIndex]);
        }

        setInterval(changeBackground, 5000);
        
    } catch (error) {
        console.error("Error in sliding background:", error);
    }
});