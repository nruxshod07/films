import { movies } from "./db.js";

let promo__interactive = document.querySelector(".promo__interactive-list");
let bac = document.querySelector(".promo__bg");
let gen = document.querySelector(".promo__genre");
let title = document.querySelector(".promo__title");
let text = document.querySelector(".promo__descr");
let inp_search = document.querySelector("#search");

// let compStyle = window.getComputedStyle(inp_search.parentElement)
// let afterElement = compStyle.getPropertyValue(':after')

inp_search.onkeyup = (e) => {
  let val = inp_search.value.toLowerCase().trim();

  let filtered = movies.filter((item) => {
    let { Title } = item;

    if (Title.toLowerCase().includes(val)) {
      return item;
    }
  });

  reload(filtered);
};

reload(movies);

function reload(data) {
  promo__interactive.innerHTML = "";
  setMovie(data[0]);

  for (let item of data) {
    let idx = data.indexOf(item) + 1;

    let li = document.createElement("li");
    let dele = document.createElement("div");

    li.classList.add("promo__interactive-item");
    dele.classList.add("delete");

    li.innerHTML = `${idx}. ${item.Title.slice(0, 20)}`;

    li.append(dele);
    promo__interactive.append(li);

    dele.onclick = () => {
      let idx = data.indexOf(item);
      data.splice(idx, 1);
      console.log(data);
    };

    li.onclick = () => {
      setMovie(item);
    };
  }
}

let arr = [];
for (let i = 0; i < movies.length; i++) {
  arr.push(movies[i].Genre);
}
arr = [...new Set(arr)];
console.log(arr);

function setMovie(item) {
  bac.style.backgroundImage = `url("${item.Poster}")`;
  gen.innerHTML = item.Genre;
  title.innerHTML = item.Title;
  text.innerHTML = item.Plot;
}
let genreLinks = [];
let genresUl = document.querySelector(".promo__menu-list ul");
for (let i = 0; i < arr.length; i++) {
  let li = document.createElement("li");
  let a = document.createElement("a");
  genreLinks.push(a);

  a.classList.add("promo__menu-item");
  a.href = "#";

  a.innerHTML = arr[i];

  genresUl.prepend(a);
  a.onclick = () => {
    genreLinks.forEach((a) => {
      a.classList.remove("promo__menu-item_active");
    });
    a.classList.add("promo__menu-item_active");
    let clickedGenre = a.innerHTML;
    let filteredGenres = movies.filter((movie) => movie.Genre === clickedGenre);
    console.log(filteredGenres);
    reload(filteredGenres);
  };
}
