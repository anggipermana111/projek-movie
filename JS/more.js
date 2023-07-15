// Mengambil Element
const container = document.querySelector('section.container');
const span = document.querySelector('.page span');
const h2 = container.querySelector('h2');

// Mengambil Data Dari Local Storage
container.className = `${localStorage.getItem('class')}`;
h2.innerText = localStorage.getItem('more');
const page = localStorage.getItem('page');

// Satu Function Dengan Kondisi Untuk Banyak Link
async function x() {
    if (localStorage.getItem('more') == 'Movie') {
        await content(`https://api.themoviedb.org/3/discover/movie?api_key=c9ee16d63e6fc68fe4b8f2e4b7aedf5a&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate`, 'main');
    }
    else if (localStorage.getItem('more') == 'Popular') {
        await content(`https://api.themoviedb.org/3/movie/popular?api_key=c9ee16d63e6fc68fe4b8f2e4b7aedf5a&language=en-US&page=${page}`, 'popular');
    }
    else if (localStorage.getItem('more') == 'Now Playing') {
        await content(`https://api.themoviedb.org/3/movie/now_playing?api_key=c9ee16d63e6fc68fe4b8f2e4b7aedf5a&language=en-US&page=${page}`, 'playing');
    }
    else if (localStorage.getItem('more') == 'Top Rating') {
        await content(`https://api.themoviedb.org/3/movie/top_rated?api_key=c9ee16d63e6fc68fe4b8f2e4b7aedf5a&language=en-US&page=${page}`, 'rating');
    }
    else if (localStorage.getItem('more') == 'Up Coming') {
        await content(`https://api.themoviedb.org/3/movie/upcoming?api_key=c9ee16d63e6fc68fe4b8f2e4b7aedf5a&language=en-US&page=${page}`, 'upcoming');
    }
    // Mengambil Nilai Page Dan Total Page
    span.innerText += ' ' + localStorage.getItem('page') + ' of ' + localStorage.getItem('totalPage');
}
x();

// Konstanta Tombol
const btn1 = document.querySelector('.btn1');
const btn2 = document.querySelector('.btn2');

// Kondisi Untuk Tombol Ada/Hilang
if (localStorage.getItem('page') == 1) {
    btn1.classList.add('hide');
}
else if (localStorage.getItem('page') > 1) {
    btn1.classList.remove('hide');
}
if (localStorage.getItem('page') == localStorage.getItem('totalPage')) {
    btn2.classList.add('hide');
}
else if (localStorage.getItem('page') < localStorage.getItem('totalPage')) {
    btn2.classList.remove('hide');
}

// Kondisi Ketika Tombol Di Klik
btn1.addEventListener('click', () => {
    localStorage.setItem('page', parseInt(localStorage.getItem('page')) - 1);
});
btn2.addEventListener('click', () => {
    localStorage.setItem('page', parseInt(localStorage.getItem('page')) + 1);
});

// Search Box
const searchBox = document.querySelector('.search-box');
document.body.addEventListener('click', (e) => {
  e.target.id == 'search-input' ? searchBox.classList.add('search') : searchBox.classList.remove('search');
});