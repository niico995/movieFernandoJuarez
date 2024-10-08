const $moviesContainer = document.getElementById("moviesList");
const $genre = document.getElementById("genre");
const $movieName = document.getElementById("movieName");
const lupa = document.getElementById("movieName");

//const apiKey = "0ff70d54-dc0b-4262-9c3d-776cb0f34dbd";

// const newMovies = []

// fetch("https://moviestack.onrender.com/api/movies", {
//   headers: {
//     "X-API-Key": apiKey,
//   },
// })
//   .then((response) => response.json())
//   .then((peliculas) => {
//     console.log(peliculas)
//     newMovies.push(peliculas.movies.filter(pelicula => pelicula != null));
//     console.log(newMovies);
//   })
//   .catch((e) => console.error(e));

//   console.log("Arreglo nuevo"+newMovies);


let movies = newMovies
console.log(movies)

if(movies != undefined){

function cardStructure(movie) {
  return `
    <div class='card'>
       
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
  for (let i = 0;i <movies.length;i++) {
    cartitas += cardStructure(newMovies[i]);
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

//function byName(newMovies, name) {
//  let movieName = name;
//  let filtradas = [];
//
//  for (let pelicula of newMovies) {
//    console.log(pelicula)
//    if (pelicula.title.toLowerCase().includes(movieName.toLowerCase())) {
//      filtradas.push(pelicula);
//    }
//  }
//  return filtradas;
//}

function byName(newMovies, name) {
  let movieName = name;
  let filtradas = [];

  for (let i =0; i <movies.length; i++) {

    console.log(movies[i].title)
    console.log(movieName, newMovies[i].title);
    if (movies[i].title.toLowerCase().includes(movieName.toLowerCase())) {
      console.log(movieName, newMovies[i].title);
      filtradas.push(movies);
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
  const filterByName = byName(newMovies, $movieName.value);
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

const generos = newMovies.map((movie) => movie.genres);
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


}else {
  $moviesContainer.innerHTML = `<h3>No movies founded</h3>`
}