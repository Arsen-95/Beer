const btn = document.querySelector('.search__button');
let thisList = [];
const searchFn = () => {
    let input = document.querySelector('.input__search');
    let beerName = input.value.trim();
    if (beerName != '') {
        loading.textContent = 'Loading...';
        prodList.classList.add('hide');
        loading.classList.remove('hide');
        sendRequest(`${url}?beer_name=${beerName}`, 'GET').then(data => {
            prodList.innerHTML = '';
            data.forEach(el => {
                console.log(el);
                const listEl = document.importNode(temp.content, true);
                const elementOfList = listEl.querySelector('.item');
                elementOfList.id = el.id;
                listEl.querySelector('.item__picture').src = el.image_url;
                listEl.querySelector('.item__name').textContent = el.name;
                listEl.querySelector('.item__descr').textContent = el.description.slice(0, 120) + '...';
                prodList.append(listEl);
                thisList.push(el.id);
            });
            console.log('This is search render', thisList)
            favItem(thisList);
            thisList = [];
            loading.classList.add('hide');
            prodList.classList.remove('hide');
        }).then(() => {
            if (prodList.innerHTML == '') {
                loading.textContent = 'There is not such an item';
                loading.classList.remove('hide');
            }
        });
    }
};
btn.addEventListener('click', searchFn);
inputSearch.addEventListener('keydown', (e) => {
    if (e.code == 'Enter') {
        searchFn();
    }
});


// ------- live search ------

// let input = document.querySelector('.input__search');


// input.addEventListener('input', search);

// function search() {
//     let value = input.value.trim().toLocaleLowerCase();
//     let product = document.querySelectorAll('.item');
    
//     if (value != '') {
//         product.forEach(item => {
//             let prodName = item.querySelector('.item__name').textContent.toLocaleLowerCase();

//             if (prodName.search(value) == -1) {
//                 item.classList.add('hide');
//             } else {
//                 item.classList.remove('hide');
//             }
//         })
//     } else {
//         product.forEach(item => {
//             item.classList.remove('hide');
//         });
//     }
// }