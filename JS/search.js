// Deklar
const span = document.querySelector(".page span");
// Mengambil Value Page dari LocalStorage
const page = localStorage.getItem("page");

// Mengambil URL
const searchParams = new URLSearchParams(location.search);
const q = searchParams.get("q");

const h2 = document.querySelector('.heading-title');
h2.innerText += ` ${q}`;

// Function Menampilkan Konten
async function x() {
  await content(
    `https://api.themoviedb.org/3/search/movie?api_key=c9ee16d63e6fc68fe4b8f2e4b7aedf5a&language=en-US&page=${page}&include_adult=false&query=${q}`,
    "search"
  );
  span.innerText +=
    " " +
    localStorage.getItem("page") +
    " of " +
    localStorage.getItem("totalPage");
  if (
    localStorage.getItem("page") == 1 ||
    localStorage.getItem("page") < localStorage.getItem("totalPage")
  ) {
    btn1.classList.add("hide");
  } else if (localStorage.getItem("page") > 1) {
    btn1.classList.remove("hide");
  }
  if (localStorage.getItem("page") >= localStorage.getItem("totalPage")) {
    btn2.classList.add("hide");
  } else if (localStorage.getItem("page") < localStorage.getItem("totalPage")) {
    btn2.classList.remove("hide");
  }
  if (localStorage.getItem("totalPage") <= 0) {
    alert(`${q} Tidak Ditemukan!`);
    window.location.href = "index.html";
  }
}
x();

// Tombol
const btn1 = document.querySelector(".btn1");
const btn2 = document.querySelector(".btn2");

// Tombol Event
btn1.addEventListener("click", () => {
  localStorage.setItem("page", parseInt(localStorage.getItem("page")) - 1);
});
btn2.addEventListener("click", () => {
  localStorage.setItem("page", parseInt(localStorage.getItem("page")) + 1);
});

// Search Event
const search = document.getElementById("search-input");
search.addEventListener("keypress", (event) => {
  if (event.key === "Enter" && search.value != "") {
    localStorage.setItem("page", "1");
  }
});

// search-box
const searchBox = document.querySelector(".search-box");
document.body.addEventListener("click", (e) => {
  e.target.id == "search-input"
    ? searchBox.classList.add("search")
    : searchBox.classList.remove("search");
  if (e.target.className == "more") {
    localStorage.setItem("class", e.target.parentNode.parentNode.className);
    localStorage.setItem(
      "more",
      e.target.parentNode.parentNode.firstElementChild.firstElementChild
        .innerText
    );
    localStorage.setItem("page", "1");
  }
});