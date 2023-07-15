// Konstanta Untuk Menyimpan Link Gambar
const linkImage = "https://image.tmdb.org/t/p/w600_and_h900_bestv2";

// Function Menampilkan Konten
async function content(api, type) {

  // Mengabil Container Yang Akan Diisi Konten
  const tamp = document.querySelector(`.${type} .content`);
  // Variabel Penampung Isi Json
  let x;
  // Mengambil Json
  await fetch(api)
    .then((res) => res.json())
    .then((res) => {
      x = res;
      // Menyimpan Banyaknya Page Dari Suatu Link API
      localStorage.setItem("totalPage", res.total_pages);
    });

    // Perulangan Untuk Membuat Dan Mengisi HTML Sesuai Banyaknya Data Json
  x.results.forEach((val1) => {
    // Membuat Element
    let figure = document.createElement("figure");
    let img = document.createElement("img");
    let figcaption = document.createElement("figcaption");
    let h2 = document.createElement("h2");
    let span = document.createElement("span");
    let a = document.createElement("a");
    a.classList.add("watch-btn");
    a.classList.add("play-btn");
    a.href = `movie.html?id=${val1.id}`;
    a.innerHTML = `<i class="bx bx-right-arrow"></i>`;
    // Mengambil Data Nama Genre Di API Khusus Genre Sesuai Id Genre
    async function genre() {
      // Variabel Penampung Json
      let y;
      await fetch(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=c9ee16d63e6fc68fe4b8f2e4b7aedf5a&language=en-US"
      )
        .then((res) => res.json())
        .then((y) => {
          // Variabel Penampung Daftar Genre
          let tamp = "";
          y.genres.forEach((val2) => {
            val1.genre_ids.forEach((val3) => {
              if (val3 == val2.id) {
                tamp += val2.name + " ";
              }
            });
          });
          span.innerText = tamp;
        });
    }
    genre();

    // Memasukkan Element Kedalam Element Lain
    h2.innerText = val1.original_title;
    figcaption.appendChild(h2);
    figcaption.appendChild(span);
    figcaption.appendChild(a);
    img.src = linkImage + val1.poster_path;
    figure.appendChild(img);
    figure.appendChild(figcaption);
    figure.setAttribute("class", val1.id);
    tamp.appendChild(figure);
  });
}