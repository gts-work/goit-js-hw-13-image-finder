import './sass/main.scss';
import PixabayApiService from './js/pixabayApi';
import photosListTpl from './templates/photos.hbs';
import { appendItemCountryMarkup, cleanContent, createPhotoModal } from './js/markups';
import { refs } from './js/refs';
import { photoFetch } from './js/fetchApi';

// var debounce = require('lodash.debounce');

const pixabayApiService = new PixabayApiService();

const inputButton = refs.inputBtn;
// inputButton.addEventListener('input', debounce(onInputSearch, 800));

const searchForm = refs.searchForm;
searchForm.addEventListener('submit', onInputSearch);

const photoCard = refs.photoCard;
photoCard.addEventListener('click', onClickPhotoCard);

// LOAD MORE
const observer = new IntersectionObserver(entries => {
  const firstEntry = entries[0];

  if (firstEntry.isIntersecting) {
    if (inputButton.value) {
      pixabayApiService.page += 1;

      const infoMsg = 'No more images. This is all that was found on your request';
      const errMsg = 'Invalid query.';
      photoFetch(pixabayApiService, infoMsg, errMsg);
    }
  }
});

const scrollArea = refs.scrollArea;
observer.observe(scrollArea);
console.log('observer 2: ', observer);
// END LOAD MORE

function onInputSearch(e) {
  e.preventDefault();
  const form = e.currentTarget;
  console.log('onInputSearch ~ form: ', form);

  const photoQuery = form.elements.query.value.trim();
  console.log('onInputSearch ~ photoQuery: ', photoQuery);

  if (photoQuery) {
    pixabayApiService.page = 1;
    cleanContent(refs.container);

    pixabayApiService.photo = photoQuery;
    const infoMsg = 'No more images';
    const errMsg = 'Invalid query.';
    photoFetch(pixabayApiService, infoMsg, errMsg);
  } else {
    console.log('onInputSearch ~ photoQuery 2: ', photoQuery);
    appendItemCountryMarkup(refs.container, photosListTpl, '');
  }
}

function onClickPhotoCard(e) {
  const photoEl = e.target;
  const largeImage = photoEl.dataset.largeImage;
  const photoAlt = photoEl.getAttribute('alt');

  createPhotoModal(largeImage, photoAlt);
}
