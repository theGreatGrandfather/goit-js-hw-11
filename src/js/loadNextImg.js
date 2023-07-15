export const loadNextImg = (data) => {
    return data.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) =>
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
        </li>`
    ).join('');
};