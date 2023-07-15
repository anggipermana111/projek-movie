// Konstanta Link
const tampilVideo = 'https://www.youtube.com/embed/';
const tampilGambar = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2';

// Menampung Element Kedalam Konstanta
const subJudul = document.querySelectorAll('.heading-title')[0];
const container = document.querySelector('.movie');
const figure = container.querySelector('figure');
const poster = figure.querySelector('img');
const figcaption = figure.querySelector('figcaption');
const judul = figcaption.querySelector('h2');
const rating = figcaption.querySelectorAll('p')[0];
const rilis = figcaption.querySelectorAll('p')[1];
const genre = figcaption.querySelector('span');
const description = container.querySelector('.description');
const judul2 = description.querySelector('h2');
const deskripsi = description.querySelector('p');

// Mengambil Nilai URL
const searchParams = new URLSearchParams(location.search);
const id = searchParams.get("id");

// Json Movie Berdasar Id
fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=c9ee16d63e6fc68fe4b8f2e4b7aedf5a`)
    .then((response) => response.json())
    .then((json) => {
        // Mengisi Nilai Element
        deskripsi.innerText = json.overview;
        judul2.innerText = json.original_title;
        genre.innerText = json.genres.map((genre) => genre.name).join(", ");
        rilis.innerText = json.release_date;
        let tamp = '';

        // Menggunakan Math Untuk Membulatkan Angka Rating (Ex:8.7656 => 8.7)
        let angka = Math.round(parseFloat(json.vote_average)*10)/10;

        // Perulangan Untuk Menentukan Nilai Rating Dari Angka Menjadi Ikon Bintang
        for(let i = 0;i<5;i++)
        {
            if(angka>=2)
            {
                tamp += `<i class='bx bxs-star'></i>`;
                angka-=2;
            }
            else if(angka>0){
                tamp += `<i class='bx bxs-star-half'></i>`;
                angka-=2;
            }
            else{
                tamp += `<i class='bx bx-star' ></i>`;
            }
        }

        rating.innerHTML = Math.round(parseFloat(json.vote_average)*10)/10 + '<br>' + tamp;
        judul.innerText = json.original_title;
        
        // Mengisi Poster Film
        poster.src = tampilGambar+json.poster_path;
    });


const cast = document.querySelector('.movie-cast .content');
const iframe = document.querySelector('iframe');

// Function Menampilkan Video Trailer Dan Cast/Aktor Film
async function detail(id, link2, kategori) {
    const link1 = 'https://api.themoviedb.org/3/movie/';
    let movie;
    await fetch(link1 + id + link2)
        .then(res => res.json())
        .then(res => {
            movie = res;
        });

    if (kategori == 'video') {
        let x = true;
        movie.results.forEach((e) => {
            if (e.type == "Trailer" && x==true) {
                iframe.src = tampilVideo + e.key;
                subJudul.innerText = e.name;
                x=false;
            }
        });
    }
    else if (kategori == 'cast') {
        movie.cast.forEach((e)=>{
            const figure = document.createElement('figure');
            const img = document.createElement('img');
            const figcaption = document.createElement('figcaption');
            const p = document.createElement('p');

            p.innerHTML = e.original_name;
            p.innerHTML += '<br>As<br>';
            p.innerHTML += e.character;
            figcaption.appendChild(p);

            img.src = tampilGambar+e.profile_path;

            figure.appendChild(img);
            figure.appendChild(figcaption);

            cast.appendChild(figure);
        });
    }
}

// Trailer
detail(id, '/videos?api_key=c9ee16d63e6fc68fe4b8f2e4b7aedf5a&language=en-US', 'video');

// Cast
detail(id, '/credits?api_key=c9ee16d63e6fc68fe4b8f2e4b7aedf5a&language=en-US', 'cast');

// Recomendation 
content('https://api.themoviedb.org/3/movie/'+id+'/recommendations?api_key=c9ee16d63e6fc68fe4b8f2e4b7aedf5a&language=en-US&page=1','recomendation');

// Similar
content('https://api.themoviedb.org/3/movie/'+id+'/similar?api_key=c9ee16d63e6fc68fe4b8f2e4b7aedf5a&language=en-US&page=1','similar');

// Search Box
const searchBox = document.querySelector('.search-box');
document.body.addEventListener('click', (e) => {
  e.target.id == 'search-input' ? searchBox.classList.add('search') : searchBox.classList.remove('search');
});