const selectedItems = document.querySelector('.selectedItems');
let url = 'https://api.punkapi.com/v2/beers?ids=';
const temp = document.querySelector('template');
const emptyEl = document.querySelector('.empty');
const prodBody = document.querySelector('.products__body');
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
            url += `|${id}`;
        });
        console.log(url);
        sendRequest(url, 'GET').then(data => {
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
        emptyEl.textContent = 'Your favorites';
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
        if (!localStorage.getItem('favoriteStorage')) {
            emptyEl.textContent = 'You have not chosen any items';
        }
    }
    
});

