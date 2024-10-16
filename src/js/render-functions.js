'use strict';

import SimpleLightbox from 'simplelightbox';

const simpleGallery = new SimpleLightbox('.gallery-item a', {
  captionsData: 'alt',
  captionDelay: '250',
});

export function renderImages(images, gallery) {
  const markup = images
    .map(image => {
      return `
  <li class="gallery-item">
  <a class="gallery-link" href=${image.largeImageURL}>
    <img
      class="gallery-image"
      src=${image.webformatURL} 
      alt="${image.tags}"
    />
  </a>
    <ul class="gallery-item-text">
      <li class="gallery-item-text-container">
        <p class="gallery-item-text-header">Likes</p>
        <p class="gallery-item-text-value">${image.likes}</p>
      </li>
      <li class="gallery-item-text-container">
        <p class="gallery-item-text-header">Views</p>
        <p class="gallery-item-text-value">${image.views}</p>
      </li>
      <li class="gallery-item-text-container">
        <p class="gallery-item-text-header">Comments</p>
        <p class="gallery-item-text-value">${image.comments}</p>
      </li>
      <li class="gallery-item-text-container">
        <p class="gallery-item-text-header">Downloads</p>
        <p class="gallery-item-text-value">${image.downloads}</p>
      </li>
      </ul>
    </li>`;
    })
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);

  simpleGallery.refresh();
}