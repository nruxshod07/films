/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

"use strict";

import { movies } from "./db.js";

let bgImage = document.querySelector(".promo__bg");
let ads = document.querySelector(".promo__adv");
let genre = document.querySelector(".promo__genre");
let title = document.querySelector(".promo__title");
let description = document.querySelector(".promo__descr");
let rate = document.querySelector(".promo__ratings span");
let id;

ads.innerHTML = "";

bgImage.style.backgroundImage = "url(./img/bg.jpg)";

let ul = document.querySelector(".promo__interactive-list");

let names = [];

movies.forEach((movie) => {
  names.push(movie.Title);
});

for (let i = 0; i < names.length; i++) {
  let number = document.createElement("p");
  let li = document.createElement("li");
  let liTitle = document.createElement("p");
  let deleteButton = document.createElement("div");

  li.classList.add("promo__interactive-item");
  deleteButton.classList.add("delete");

  liTitle.innerHTML = movies[i].Title;

  number.innerHTML = i + 1;
  li.style.cursor = "pointer";
  ul.append(li);
  li.prepend(number, liTitle);
  li.append(deleteButton);

  li.style.display = "flex";
  li.style.gap = "10px";

  bgImage.classList.add("promo__bg");

  liTitle.onclick = () => {
    bgImage.style.backgroundImage = `url(${movies[i].Poster})`;
    title.innerHTML = movies[i].Title;
    description.innerHTML = movies[i].Plot;
    rate.innerHTML = `ImDb: ${movies[i].imdbRating}`;
    genre.innerHTML = movies[i].Genre;
  };
  deleteButton.onclick = () => {
    li.remove();
    console.log(movies.splice(movies.indexOf(movies[i]), 1));
    console.log(movies);
  };
}
