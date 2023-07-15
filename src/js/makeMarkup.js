import Notiflix from 'notiflix';
import { fethImgs } from './imgApi';




export const makeMarkup = async (searchValue) => {
    
    try {
        const responce = await fethImgs(searchValue, 1)
            // .then( responce => console.log('qqqq', responce))  
        // console.log('responce', responce);
        // console.log('responce.data', responce.data);

        if (responce.data.hits.length !==0) {
            
            return responce.data.hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
                `<li class="photo-card _list">
                    <img
                        class="search__img"
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
                
        } else {
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        }
    } catch (error) {
        console.log('error.message', error.message);
        Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
    }
} 

 