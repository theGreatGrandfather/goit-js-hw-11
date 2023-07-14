import {onImgClick} from './imgClick'
import { makeMarkup } from './makeMarkup';
import { fethImgs } from './imgApi';


const list = document.querySelector('.gallery');
list.addEventListener('click', onImgClick);
let searchValue = '';
const gallery = document.querySelector('.gallery');
const form = document.querySelector('#search-form');

const guard = document.querySelector('.guard');
let page = 1;

const options = {
    root: null,
    rootMargin: '310px',
    threshold: 0,
}
const handlePagination = (entries, observer) => {
    console.log('observer', observer)
    console.log('handlePagination')
    entries.forEach(entry => {
 
        if (entry.isIntersecting) {
            page += 1;
            fethImgs(searchValue, page)
                .then(data => {

    console.log('data1111', data)
    gallery.insertAdjacentHTML('beforeend', data.data.hits)
    gallery.insertAdjacentHTML('beforeend', met(data.data.hits))
    console.log('data.page', data.data.hits.length*page)
    console.log('first', typeof data.data.hits)
    console.log('page', page)
 
    if (page*5 >= data.data.totalHits) {
        observer.unobserve(entry.target);
        console.log('end')
        
    }


                    
                   
 
                    // console.log('data1111', data.data.hits)
                    // gallery.insertAdjacentHTML('beforeend', data.data.hits)
                    // gallery.insertAdjacentHTML('beforeend', createMarkup(data.data.hits))
                    // if (data.page >= 500) {
                    //     observer.unobserve(entry.target);
                    // }
                })
                .catch(err => { 
                    console.log(err)
                    observer.unobserve(entry.target);
                    console.log('aaaaaaaaaaaaaaaaaaa' )
                }

                   )
        }
    });
}

const met = (q)=>{
    return q.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
                `<li>
                    <img
                        src=${webformatURL} 
                        alt="${tags}" 
                        loading="lazy" 
                        data-source="${largeImageURL}"
                    />
                    <div class="info">
                        <p class="info-item">
                            <b>Likes</b>${likes}
                        </p>
                        <p class="info-item">
                            <b>Views</b>${views}
                        </p>
                        <p class="info-item">
                            <b>Comments</b>${comments}
                        </p>
                        <p class="info-item">
                            <b>Downloads</b>${downloads}
                        </p>
                    </div>
                </li>`).join('')
}


const observer = new IntersectionObserver(handlePagination, options);


const onFormSubmit = (e) => {
    e.preventDefault();
    gallery.innerHTML = '';
    page =1;
    searchValue = e.target[0].value;
    makeMarkup(searchValue, 1)
        .then(data => {
            if (data) {
                observer.observe(guard);
                gallery.innerHTML = data;
            } else {
                gallery.innerHTML = `<p class="error">Try reloading the page!</p>`
            }
        });
    form.reset();
};

const loadNextCollection = async () => {
     
};


form.addEventListener('submit', onFormSubmit);

