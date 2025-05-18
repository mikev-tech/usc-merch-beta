const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
console.log(queryString);

async function userId_params(){
    if(!urlParams.has('id')){
        return null;
    }
    const userID = urlParams.get('id');
    console.log(userID);
    return userID;
}

export default userId_params;