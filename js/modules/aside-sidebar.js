import checkUserAccessToken from "../components/checkAccessToken.js"

// Get div block
let divDisplay = document.getElementById('logged-side-tabs');
let settings = document. getElementById('profile-settings');
let logout = document.getElementById('logout');
console.log(settings);


document.addEventListener('DOMContentLoaded', async function () {
    const userToken = await checkUserAccessToken(); // returns true or false
    console.log(userToken);
    if(userToken){
        let userAcess = JSON.parse(localStorage.getItem('loginAuth'));
        console.log(userAcess.accessToken);
        console.log(userAcess.id);
        divDisplay.style.display = 'block';
        settings.href = `../pages/profile.html?id=${userAcess.id}`;

        console.log(settings.href);
    }else{
        divDisplay.style.display = 'none';
    }
});

logout.addEventListener('click', async function () {
    logout.href = '../pages/login.html';
});