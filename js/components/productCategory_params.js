const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
console.log(queryString);

async function productCategory_params(){
    if(!urlParams.has('category')){
        return null;
    }
    const category = urlParams.get('category');
    console.log(category);
    return category;
}

export default productCategory_params;