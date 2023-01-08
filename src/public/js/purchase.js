const form = document.getElementById('purchaseForm');
form.addEventListener('submit', evt => {
    evt.preventDefault();
    let data = new FormData(form);
    let obj = {};
    data.forEach((value,key) => obj[key]=value);
    fetch('api/purchases/purchase', {
        method: 'POST',
        body:JSON.stringify(obj),
        headers: {
            "Content-Type":"application/json"
        }
    }).then(result=>result.json()).then(json=>console.log(json));
})