// Memanggil Function Untuk Tiap-Tiap Konten
content('https://api.themoviedb.org/3/discover/movie?api_key=c9ee16d63e6fc68fe4b8f2e4b7aedf5a&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate', 'main');

content('https://api.themoviedb.org/3/movie/now_playing?api_key=c9ee16d63e6fc68fe4b8f2e4b7aedf5a&language=en-US&page=1', 'playing');

content('https://api.themoviedb.org/3/movie/popular?api_key=c9ee16d63e6fc68fe4b8f2e4b7aedf5a&language=en-US&page=1', 'popular');

content('https://api.themoviedb.org/3/movie/top_rated?api_key=c9ee16d63e6fc68fe4b8f2e4b7aedf5a&language=en-US&page=1', 'rating');

content('https://api.themoviedb.org/3/movie/upcoming?api_key=c9ee16d63e6fc68fe4b8f2e4b7aedf5a&language=en-US&page=1', 'upcoming');

// Menyimpan Nilai Page = 1
localStorage.setItem('page', '1');

// search-box
const searchBox = document.querySelector('.search-box');

// Event Untuk Klik Pada Keseluruhan Body
document.body.addEventListener('click', (e) => {
  // Search
  e.target.id == 'search-input' ? searchBox.classList.add('search') : searchBox.classList.remove('search');
  // Tombol More
  if (e.target.className == 'more') {
    localStorage.setItem('class', e.target.parentNode.parentNode.className);
    localStorage.setItem('more', e.target.parentNode.parentNode.firstElementChild.firstElementChild.innerText);
  }
});

// Array Dan Objek
const buttons = [
  {
    ref: '#home',
    class: 'home',
    title: 'Home'
  },
  {
    ref: '#playing',
    class: 'stopwatch',
    title: 'Now playing'
  },
  {
    ref: '#popular',
    class: 'hot',
    title: 'Popular'
  },
  {
    ref: '#rating',
    class: 'star',
    title: 'Top Rating'
  },
  {
    ref: '#upcoming',
    class: 'party',
    title: 'Upcoming'
  }
];

const navbar = document.querySelector('nav');

// Fungsi Untuk Membuat Element Dan AppendChild Element
function addElement(tag, inner, kelas, parent) {
  const el = document.createElement(tag);
  el.className = kelas;
  el.innerHTML = inner;
  parent.appendChild(el);
  return el;
}

// Membuat Nav Dengan JS
buttons.forEach((e) => {
  const el = addElement('a', '', 'nav-link', navbar);
  el.href = e.ref;
  if (e.class == 'home') {
    el.classList.add('nav-active');
  }
  addElement('i', '', `bx bxs-${e.class}`, el);
  addElement('span', e.title, 'nav-link-title', el);
});

// Navbar event
const nav = document.querySelectorAll('.nav-link');
nav.forEach((e) => {
  e.addEventListener('click', () => {
    nav.forEach((elm) => {
      elm.classList.remove('nav-active');
    });
  });
});

const element = document.querySelectorAll('.heading-title');

// Mencari TataLetak Scroll Window Terhadap Element
window.onscroll = () => {
  let tam;
  if (window.scrollY < element[1].getBoundingClientRect().top + window.scrollY - 500) {
    tam = nav[0];
  }
  else if (window.scrollY < element[2].getBoundingClientRect().top + window.scrollY - 500) {
    tam = nav[1];
  }
  else if (window.scrollY < element[3].getBoundingClientRect().top + window.scrollY - 500) {
    tam = nav[2];
  }
  else if (window.scrollY < element[4].getBoundingClientRect().top + window.scrollY - 500) {
    tam = nav[3];
  }
  else {
    tam = nav[4];
  }
  nav.forEach((elm) => {
    elm.classList.remove('nav-active');
  });
  tam.classList.add('nav-active');
}