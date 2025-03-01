import { fetchImages } from './js/pixabay.js';
import { renderImages, clearGallery } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.search-form');
const input = document.querySelector('input[name="searchQuery"]');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const loadingText = document.querySelector('.loading-text');
const backToTopBtn = document.querySelector('.back-to-top');

let query = '';
let page = 1;
const perPage = 40;

form.addEventListener('submit', async event => {
  event.preventDefault();
  query = input.value.trim();

  if (!query) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query.',
      position: 'topRight',
    });
    return;
  }

  page = 1;
  clearGallery();
  loadMoreBtn.style.display = 'none';
  loadingText.classList.remove('loading-top');
  loadingText.classList.add('loading-bottom');
  loadingText.style.display = 'block';

  try {
    const data = await fetchImages(query, page, perPage);

    if (!data || data.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message: 'No images found!',
        position: 'topRight',
      });
      return;
    }

    renderImages(data.hits);

    if (page * perPage < data.totalHits) {
      loadMoreBtn.style.display = 'block';
      backToTopBtn.style.display = 'block';
    } else {
      iziToast.info({
        title: 'End',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
      backToTopBtn.style.display = 'none';
    }
  } catch (error) {
    console.error('Error:', error);
    let errorMessage = 'An error occurred. Please try again later.';
    if (error.response) {
      errorMessage = `Server error: ${error.response.status}`;
    } else if (error.request) {
      errorMessage = 'No response received from the server.';
    }
    iziToast.error({
      title: 'Error',
      message: errorMessage,
      position: 'topRight',
    });
  } finally {
    loadingText.style.display = 'none';
    loadingText.classList.remove('loading-bottom');
  }

  input.value = '';
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  loadingText.classList.remove('loading-bottom');
  loadingText.classList.add('loading-top');
  loadingText.style.display = 'block';

  try {
    const data = await fetchImages(query, page, perPage);
    renderImages(data.hits);

    if (page * perPage >= data.totalHits) {
      loadMoreBtn.style.display = 'none';
      iziToast.info({
        title: 'End',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
      backToTopBtn.style.display = 'none';
    }

    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    setTimeout(() => {
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }, 100);
  } catch (error) {
    console.error('Error:', error);
    let errorMessage = 'An error occurred. Please try again later.';
    if (error.response) {
      errorMessage = `Server error: ${error.response.status}`;
    } else if (error.request) {
      errorMessage = 'No response received from the server.';
    }
    iziToast.error({
      title: 'Error',
      message: errorMessage,
      position: 'topRight',
    });
  } finally {
    loadingText.style.display = 'none';
    loadingText.classList.remove('loading-top');
  }
});

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});
