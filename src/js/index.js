import {onImgClick} from './imgClick'
import { makeMarkup } from './makeMarkup';

const list = document.querySelector('.gallery');
list.addEventListener('click', onImgClick);

const gallery = document.querySelector('.gallery');
const form = document.querySelector('#search-form');

const onFormSubmit = (e) => {
    e.preventDefault();
    gallery.innerHTML = '';
    const searchValue = e.target[0].value;
    makeMarkup(searchValue)
        .then(data => {
            if (data) {
                gallery.innerHTML = data;
            } else {
                gallery.innerHTML = `<p class="error">Try reloading the page!</p>`
            }
        });
    form.reset();
}

const loadNextCollection = async () => {
    
};


form.addEventListener('submit', onFormSubmit);

