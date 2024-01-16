//card creator
export function cardStructure(movie) {
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
    
        `;
  }
}

// -----------------------------------------------

export function toggleFavorite(movieId, eTarget) {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
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

}
