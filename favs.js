const favoritesMovies = localStorage.getItem("favorites");
console.log(favoritesMovies);

const apiKey = "0ff70d54-dc0b-4262-9c3d-776cb0f34dbd";

const $favsContainer = document.getElementById("moviesList");

import { toggleFavorite, cardStructure } from "./funtions.js";

fetch("https://moviestack.onrender.com/api/movies", {
  headers: {
    "X-API-Key": apiKey,
  },
})
  .then((response) => response.json())
  .then((data) => {
    const movies = data.movies.filter((movie) =>
      favoritesMovies.includes(movie.id)
    );
    $favsContainer.innerHTML = fillCards(movies);

    console.log(movies);

    $favsContainer.addEventListener("click", (e) => {
      console.log(e.target.dataset.id);
      if (e.target.dataset.id != undefined) {
        $favsContainer.innerHTML = fillCards(movies);
        toggleFavorite(e.target.dataset.id, e.target);
      }
      $favsContainer.innerHTML = fillCards(movies);

    });


    function fillCards(movies) {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      let cartitas = "";
      if(favorites.length == 0){
        cartitas = `<h2>You did not add a favorite movie</h2>` 
      }else {
        for (let i = 0; i < movies.length; i++) {
            cartitas += cardStructure(movies[i]);
          }
      }
      
      return cartitas;
    }


    
  })
  .catch((e) => console.error(e));
