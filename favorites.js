let favList = document.querySelector('.products__list');
// let link = document.querySelector('.nav__item');
let arr = [];

favList.addEventListener('click', e => {
    if (e.target.closest('.svg')) {
        let id = e.target.closest('.item').id;
        let liEl = favList.querySelector(`[id='${id}']`);
        liEl.querySelector('.path').classList.toggle('selected');
        
        // ----- to localStorage -----

        if (!localStorage.getItem('favoriteStorage')) {
            localStorage.setItem('favoriteStorage', []);
        }

        const favs = localStorage.getItem('favoriteStorage');

        if (favs.indexOf(id) == -1) {
            arr.push(id);
            localStorage.setItem('favoriteStorage', arr);
        } else {
            arr.splice(arr.indexOf(id), 1);
            localStorage.setItem('favoriteStorage', arr);
        }
    }
});

