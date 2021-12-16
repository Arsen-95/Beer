const selectedItems = document.querySelector('.selectedItems');
const url = 'https://api.punkapi.com/v2/beers';
const temp = document.querySelector('template');
const emptyEl = document.querySelector('.empty');
let favIdsArr = [];

async function sendRequest(url, method) {
    let request = await fetch(url, {
        method: method,
    });
    let response = await request.json();
    return response;
}

let favListRender = () => {
    if (localStorage.getItem('favoriteStorage')) {
        let favIds = localStorage.getItem('favoriteStorage').split(',');
        favIds.forEach(id => {
            sendRequest(`${url}?ids=${id}`, 'GET').then(data => {
                data.forEach(el => {
                    const listEl = document.importNode(temp.content, true);
                    const elementOfList = listEl.querySelector('.item');
                    elementOfList.id = el.id;
                    listEl.querySelector('.item__picture').src = el.image_url;
                    listEl.querySelector('.item__name').textContent = el.name;
                    listEl.querySelector('.item__descr').textContent = el.description.slice(0, 120) + '...';
                    selectedItems.append(listEl);
                    // favIdsArr.push(el.id);
                    // console.log(favIdsArr);
                });
            });
        });
        
    } else {
        emptyEl.style.display = 'block';
    }
};

favListRender();


favList.addEventListener('click', e => {
    if (e.target.closest('.item__delete')) {
        let id = e.target.closest('.item').id;
        let liEl = document.querySelector(`[id='${id}']`);
        console.log(liEl);
        arr = localStorage.getItem('favoriteStorage').split(',');
        
        // ----- delete localStorage value -----
        
        arr.splice(arr.indexOf(id), 1);
        console.log(arr);
        localStorage.setItem('favoriteStorage', arr);
        favList.removeChild(liEl);
    }
    
});