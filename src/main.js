'use strict';

import iziToast from 'izitoast';
import svgUrlX from '../src/img/x.svg';
import { fetchImages } from '../src/js/pixabay-api.js';
import { renderImages } from '../src/js/render-functions.js';

const form = document.querySelector('form');
const loadMoreButton = document.querySelector('.wrapper button');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.wrapper span');

let requestPage = null;
let UserInput = null;
let maxPages = null;
let cardHeight = null;

const errorMessage = (message, color) => {
  iziToast.show({
    message: `${message}`,
    messageColor: '#ffffff',
    color: color,
    position: 'topRight',
    displayMode: 1,
    iconUrl: `${svgUrlX}`,
  });
};

const createNewGallery = currentUserInput => {
  loader.classList.add('loader');
  fetchImages(currentUserInput, requestPage)
    .then(images => {
      if (images['hits'].length === 0) {
        errorMessage(
          'Sorry, there are no images matching your search query. Please try again!',
          '#EF4040'
        );
      } else {
        maxPages = Math.ceil(images['totalHits'] / 15);
        renderImages(images['hits'], gallery);
        cardHeight =
          gallery.firstElementChild.getBoundingClientRect().height * 2;
        scrollBy(0, cardHeight);
        if (requestPage === maxPages) {
          errorMessage(
            "We're sorry, but you've reached the end of search results.",
            '#68cce4'
          );
        } else if (requestPage < maxPages) {
          loadMoreButton.classList.remove('inactive');
        }
      }
    })
    .catch(error => console.log(error))
    .finally(() => {
      form.reset();
      loader.classList.remove('loader');
    });
};

form.addEventListener('submit', event => {
  event.preventDefault();
  gallery.innerHTML = '';
  loadMoreButton.classList.add('inactive');
  let currentUserInput = form.elements['userinput'].value.trim();
  if (!currentUserInput) {
    errorMessage('Search field can not be empty!', '#EF4040');
  } else {
    requestPage = 1;
    UserInput = currentUserInput;
    createNewGallery(currentUserInput);
  }
});

loadMoreButton.addEventListener('click', event => {
  if (event.target.type === 'button') {
    loadMoreButton.classList.add('inactive');
    requestPage += 1;
    createNewGallery(UserInput);
  }
});