const prodList = document.querySelector('.products__list');
const temp = document.querySelector('template');
const url = 'https://api.punkapi.com/v2/beers';
const inputSearch = document.querySelector('.input__search')
const loading = document.querySelector('.products__load');
let idList = [];
async function sendRequest(url, method) {
    let request = await fetch(url, {
        method: method,
    });
    let response = await request.json();
    return response;
}

async function loadPage() {
    let data = await sendRequest(url, 'GET');
    data.forEach(el => {
        const listEl = document.importNode(temp.content, true);
        const elementOfList = listEl.querySelector('.item');
        elementOfList.id = el.id;
        listEl.querySelector('.item__picture').src = el.image_url;
        listEl.querySelector('.item__name').textContent = el.name;
        listEl.querySelector('.item__descr').textContent = el.description.slice(0, 120) + '...';
        prodList.append(listEl);
        idList.push(el.id);
    });
    loading.classList.add('hide');
    console.log('This is ids of rendered items', idList);

        // ------ check out localStorage and fill the star ---------

    favItem(idList);
}


function favItem(array) {
    if (localStorage.getItem('favoriteStorage')) {
        let storage = localStorage.getItem('favoriteStorage');
        console.log('This is arr', arr)
        arr = storage.split(',');
        console.log('This is arr in function', arr);
        for (let i = 0; i < arr.length; i++) {
            if (array.includes(+arr[i])) {
                console.log('This is arr[i]', arr[i]);
                let listEl = document.getElementById(`${arr[i]}`);
                listEl.querySelector('.path').classList.add('selected');
            }
        }
    }
}

loadPage();

// ------ rerender the page after cleaning the input ----------

inputSearch.addEventListener('input', () => {
    if (inputSearch.value == '') {
        loading.textContent = 'Loading...';
        loading.classList.remove('hide');
        prodList.innerHTML = '';

        loadPage();
        idList = [];
    }
});



// let xhr = new XMLHttpRequest();

// xhr.open('GET', url);
// xhr.responseType = 'json';
// xhr.onload = function() {
//     const listEl = xhr.response;
//     for (const el of listEl) {
//         const listEl = document.importNode(temp.content, true);
//         listEl.querySelector('.item__picture').src = el.image_url;
//         listEl.querySelector('.item__name').textContent = el.name;
//         listEl.querySelector('.item__descr').textContent = el.description;
//         prodList.append(listEl);
//     }
// }
// xhr.send();


// sendRequest(url, 'GET').then(data => {
//     data.forEach(el => {
//         const listEl = document.importNode(temp.content, true);
//         const elementOfList = listEl.querySelector('.item');
//         elementOfList.id = el.id;
//         listEl.querySelector('.item__picture').src = el.image_url;
//         listEl.querySelector('.item__name').textContent = el.name;
//         listEl.querySelector('.item__descr').textContent = el.description;
//         prodList.append(listEl);
//     });
// });