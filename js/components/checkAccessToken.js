// JS-Components: Check if there is login user access token
function checkUserAccessToken(){
    const loginAuth = localStorage.getItem('loginAuth');
    // Check if there is loginAuth key stored locally
    if(loginAuth){
        const authData = JSON.parse(loginAuth);
        return authData && authData.accessToken ? true : false;
    }
    return false;
}

export default checkUserAccessToken;