const $moviesContainer = document.getElementById("moviesList");
const $genre = document.getElementById("genre");
const $movieName = document.getElementById("movieName");
const lupa = document.getElementById("movieName");

function cardStructure(movie) {
  return `
    <div class='card'>
        <img class='cardImg' src='${movie.image}' alt='Movie image' />
        <div>
            <h2>${movie.title}</h2>
            <p>${movie.overview}</p>
        </div>
        <div class='btnIr'>
            <a class='btnMovie' href='./movieDetail.html?id=${movie.id}'>More Info</a>
        </div>
    </div>
        `;
}

function fillCards(movies) {
  let cartitas = "";
  for (let movie of movies) {
    cartitas += cardStructure(movie);
  }
  return cartitas;
}

$moviesContainer.innerHTML = fillCards(movies);




lupa.addEventListener("click", function (e) {
  lupa.className = "buscadorAbierto";
});

lupa.addEventListener("blur", function (e) {
  lupa.className = "buscadorCerrado";
});

//Buscador por genero

function byGenre(names) {
  let genreSearch = $genre.options[$genre.selectedIndex].value;
  console.log(genreSearch);
  let filtradas = [];
  if (genreSearch == "All") {
    return names;
  } else {
    for (let movie of names) {
      if (movie.genres.includes(genreSearch)) {
        filtradas.push(movie);
      }
    }
  }

  return filtradas;
}

function byName(movies, name) {
  let movieName = name;
  let filtradas = [];

  for (let pelicula of movies) {
    if (pelicula.title.toLowerCase().includes(movieName.toLowerCase())) {
      filtradas.push(pelicula);
    }
  }
  return filtradas;
}

$movieName.addEventListener("input", function (e) {
  const filterByName = byName(movies, $movieName.value);
  const filterByGenre = byGenre(filterByName);
  console.log(filterByGenre);
  if (filterByGenre.length == 0) {
    let messageEmpty = `<h3>No match</h3>`;
    $moviesContainer.innerHTML = `<h3 style='color black'>No match</h3>`;
  } else {
    $moviesContainer.innerHTML = fillCards(filterByGenre);
  }
});

$genre.addEventListener("change", function (e) {
  const filterByName = byName(movies, $movieName.value);
  const filterByGenre = byGenre(filterByName);
  console.log(filterByGenre);
  if (filterByGenre.length == 0) {
    let messageEmpty = `<h3 style='color black'>No match</h3>`;
    $moviesContainer.innerHTML = `<h3 style='color black'>No match</h3>`;
  } else {
    $moviesContainer.innerHTML = fillCards(filterByGenre);
  }
});

// genres

const generos = movies.map((movie) => movie.genres);
console.log(generos);

const listGenres = generos.flat();

function noRepeatGenres(listGenres) {
  const newList = [];
  for (let genre of listGenres) {
    if (newList.includes(genre) == false) {
      newList.push(genre);
    }
  }
  return newList.sort();
}
console.log(listGenres);
console.log(noRepeatGenres(listGenres));

//$genre

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

$genre.innerHTML += fillOption(noRepeatGenres(listGenres));
