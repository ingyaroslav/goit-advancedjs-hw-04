'use strict';

import axios from 'axios';
const pixabayApiUrl = 'https://pixabay.com/api/';

export const fetchImages = async (userInput, requestPage) => {
  const searchParams = new URLSearchParams({
    q: userInput,
    key: '45298002-4b3df346318b923a57726fdbd',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page: requestPage,
  });

  const response = await axios.get(
    `${pixabayApiUrl}?${searchParams.toString()}`
  );
  return response.data;
};