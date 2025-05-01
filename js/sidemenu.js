let menuHamburger = document.getElementById("menu-hamburger");
let sideMenu = document.getElementById("sidebar");
let close = document.getElementById("x-close");
let overlay = document.getElementById("overlay");

menuHamburger.addEventListener('click', ()=> {
    sideMenu.style.display= "block";
});

close.addEventListener('click', ()=>{
    sideMenu.style.display= "none";
});

overlay.addEventListener('click', ()=>{
    sideMenu.style.display= "none";
});