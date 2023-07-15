import Notiflix from 'notiflix';
import { onImgClick } from './imgClick'
import { makeMarkup } from './makeMarkup';
import { fethImgs } from './imgApi';
import { loadNextImg } from './loadNextImg';

export const gallery = document.querySelector('.gallery');
export let searchValue = '';

let page = 0;

const list = document.querySelector('.gallery');
const form = document.querySelector('#search-form');
const guard = document.querySelector('.guard');
const serchingText = document.querySelector('.serching__text');


const options = {
    root: null,
    rootMargin: '310px',
    threshold: 0,
};

list.addEventListener('click', onImgClick);

const onFormSubmit = (e) => {
    e.preventDefault();
    gallery.innerHTML = '';
    page =1;
    searchValue = e.target[0].value;
    localStorage.setItem("ui-theme", searchValue);
    Notiflix.Loading.standard('Loading...', {
        backgroundColor: '#275eb6',
        color:"FFFFFF"
    });
    makeMarkup(searchValue, 1)
        .then(data => {
            if (data) {
                Notiflix.Loading.remove();
                observer.observe(guard);
                gallery.innerHTML = data;
            } else {
                Notiflix.Loading.remove();
                gallery.innerHTML = `<p class="error">Try reloading the page!</p>`
            }
        });
    form.reset();
};

form.addEventListener('submit', onFormSubmit);

const handlePagination = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            page += 1;
            fethImgs(searchValue, page)
                .then(data => {
                    console.log('data1111', data);
                    gallery.insertAdjacentHTML('beforeend', loadNextImg(data.data.hits));
                    console.log('data.page', page * 40+40);
                    console.log('totalHits',  data.data.hits);
                    console.log('page', page);
                    if (page * 40+40 >= data.data.totalHits) {
                        observer.unobserve(entry.target);
                        console.log('end')
                        Notiflix.Notify.info(`All images are uploaded.`);

                    };
                })
                .catch(err => {
                    console.log(err)
                    observer.unobserve(entry.target);
                    console.log('aaaaaaaaaaaaaaaaaaa')
                });
        };
    });
};

const observer = new IntersectionObserver(handlePagination, options);
