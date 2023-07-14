import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '38252438-c1dd9658c1d73d001717cee1b';
const GET_PARAMETRS = '&image_type=photo&orientation=horizontal&safesearch=true'

const guard = document.querySelector('.guard');
let page = 1;
   
const per_page = 40;

export const fethImgs = async (searchValue) => {
    const responce = await axios.get(`
    ${BASE_URL}?key=${API_KEY}&q=${searchValue}${GET_PARAMETRS}&page=${page}&per_page=${per_page}`);
    console.log('searchValue', searchValue)
    console.log('url', `${BASE_URL}?key=${API_KEY}&q=${searchValue}${GET_PARAMETRS}&page=${page}&per_page=${per_page}`)
    return responce;
}

