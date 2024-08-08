const apiKey = "0ff70d54-dc0b-4262-9c3d-776cb0f34dbd";
const $moviesContainer = document.getElementById("moviesList");
const $genre = document.getElementById("genre");
const $movieName = document.getElementById("movieName");
const lupa = document.getElementById("movieName");

let movies = [];

fetch("https://moviestack.onrender.com/api/movies", {
  headers: {
    "X-API-Key": apiKey,
  },
})
  .then((response) => response.json())
  .then((peliculas) => {
    movies = peliculas.movies.filter((pelicula) => pelicula != null);

    //data and elements
    $moviesContainer.innerHTML = fillCards(movies);

    const generos = movies.map((movie) => movie.genres);
    const listGenres = generos.flat();

    $genre.innerHTML += fillOption(noRepeatGenres(listGenres));

    lupa.addEventListener("click", function (e) {
      lupa.className = "buscadorAbierto";
    });

    lupa.addEventListener("blur", function (e) {
      lupa.className = "buscadorCerrado";
    });

    $movieName.addEventListener("input", function (e) {
      applyFilters();
    });

    $genre.addEventListener("change", function (e) {
      applyFilters();
    });

    const button = document.querySelectorAll(".btnFavorite");

    // ...
    /*button.forEach(btnFav => {
      btnFav.addEventListener("click", function () {
        favIco.innerHTML = '&#128525;'
        toggleFavorite(btnFav.dataset.movieId);
        btnFav.className = 'btnFavorite2'
        console.log(favorites)

      });
    });*/

    $moviesContainer.addEventListener("click", (e) => {
      console.log(e.target.dataset.id);
      if (e.target.dataset.id != undefined) {
        toggleFavorite(e.target.dataset.id, e.target);
      }
    });

    // ...

    //-----------------------------------------------------

    //Functions

    //Card creators
    function cardStructure(movie) {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      const fav = favorites.includes(movie.id);
      if (fav) {
        return `
        <div class='card'>
            <img class='cardImg' src='https://moviestack.onrender.com/static/${movie.image}' alt='Movie image' />
            <div class='textCard'>
                <h2>${movie.title}</h2>
                <p>${movie.overview}</p>
            </div>
            <div class='buttons'>
                <button class='btnFavorite2' data-id="${movie.id}" > &#128525; </button>
                <a class='btnMovie' href='./movieDetail.html?id=${movie.id}'>More Info</a>
            </div>
        </div>
            `;
      } else {
        return `
      <div class='card'>
          <img class='cardImg' src='https://moviestack.onrender.com/static/${movie.image}' alt='Movie image' />
          <div class='textCard'>
              <h2>${movie.title}</h2>
              <p>${movie.overview}</p>
          </div>
          <div class='buttons'>
              <button class='btnFavorite' data-id="${movie.id}" > &#128564; </button>
              <a class='btnMovie' href='./movieDetail.html?id=${movie.id}'>More Info</a>
          </div>
      </div>
          `;
      }
    }

    function fillCards(movies) {
      const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      let cartitas = "";
      for (let i = 0; i < movies.length; i++) {
        const isFavorite = favorites.includes(movies[i].id);
        cartitas += cardStructure(movies[i]);
      }
      return cartitas;
    }
    //-----------------------------------------------------

    //search filters
    function applyFilters() {
      const filterByName = byName(movies, $movieName.value);
      const filterByGenre = byGenre(movies);
      const intersection = filterByName.filter((movie) =>
        filterByGenre.includes(movie)
      );
      if (intersection.length === 0) {
        $moviesContainer.innerHTML = `<h3 style='color black'>No match</h3>`;
      } else {
        $moviesContainer.innerHTML = fillCards(intersection);
      }
    }

    function byName(movies, name) {
      let movieName = name.trim().toLowerCase();
      if (movieName === "") {
        return movies;
      }
      return movies.filter((movie) =>
        movie.title.toLowerCase().includes(movieName)
      );
    }

    function byGenre(movies) {
      let genreSearch = $genre.options[$genre.selectedIndex].value;
      if (genreSearch === "All") {
        return movies;
      } else {
        return movies.filter((movie) => movie.genres.includes(genreSearch));
      }
    }
    //-----------------------------------------------------
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    //Favorites
    function toggleFavorite(movieId, eTarget) {
      const index = favorites.indexOf(movieId);
      console.log(eTarget);
      if (index == -1) {
        // La película no está en favoritos, la agregamos

        favorites.push(movieId);
        localStorage.setItem("favorites", JSON.stringify(favorites));
      } else {
        // La película ya está en favoritos, la quitamos

        favorites.splice(index, 1);
        localStorage.setItem("favorites", JSON.stringify(favorites));
      }

      // Almacenar la lista actualizada en localStorage
      localStorage.setItem("favorites", JSON.stringify(favorites));

      // Actualizar la visualización de las tarjetas
      applyFilters();
    }

    // genres

    function noRepeatGenres(listGenres) {
      const newList = [];
      for (let genre of listGenres) {
        if (newList.includes(genre) == false) {
          newList.push(genre);
        }
      }
      return newList.sort();
    }

    function addOption(option) {
      return `
      <option value='${option}'>${option}</option>
      `;
    }

    function fillOption(options) {
      let fill = "";
      for (let option of options) {
        fill += addOption(option);
      }
      return fill;
    }
  })
  .catch((e) => console.error(e));
