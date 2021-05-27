import * as basicLightbox from 'basiclightbox';

export function appendItemCountryMarkup(ref, tpl, photos) {
  if (photos) {
    ref.insertAdjacentHTML('beforeend', tpl(photos));
  } else {
    ref.innerHTML = '';
  }
}

export function cleanContent(ref) {
  ref.innerHTML = '';
}

export function createPhotoModal(img, alt) {
  const instance = basicLightbox.create(`
        <img src="${img}" alt="${alt}">
    `);

  instance.show();
}
