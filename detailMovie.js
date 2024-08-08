const idToWork = location.search;

const queryParams = new URLSearchParams(idToWork).get("id");

const $movieDetailed = document.getElementById("movieDetailed");

const $title = document.querySelector("title");

fetch("https://moviestack.onrender.com/api/movies", {
  headers: {
    "X-API-Key": apiKey,
  },
})
  .then((response) => response.json())
  .then((data) => {
    const movie = data.movies.find((movie) => movie.id == queryParams);

    let calificacion = movie.vote_average.toFixed(2);

    $movieDetailed.innerHTML = fillCards(movie);

    let titulo = movie.title;
    $title.innerHTML = titulo;

    function cardStructure(movie) {
      return `
      <div class='movieContainer'>
          <div class='movieInfo'>
              <img class='detailImg' src='https://moviestack.onrender.com/static/${movie.image}' alt='Movie image' />
              <div class='movieData'>
                  <h2>${movie.title}</h2>
                  <p class='tagline'>${movie.tagline}</p>
                  <p class='overview'>${movie.overview}</p>
              </div>
          </div>
          
          <div class='movieTable'>
              
              <table>
              <tr>
                  <td>Original language</td>
                  <td>${movie.original_language}</td>
              </tr>
              <tr>
                  <td>Release date</td>
                  <td>${movie.release_date}</td>
              </tr>
              <tr>
                  <td>Runtime</td>
                  <td>${movie.runtime}</td>
              </tr>
              <tr>
                  <td>Status</td>
                  <td>${movie.status}</td>
              </tr>
          </table>
              <table>
              <tr>
                  <td>Vote average</td>
                  <td>${calificacion}%</td>
              </tr>
              <tr>
                  <td>Budget</td>
                  <td>USD ${movie.budget}</td>
              </tr>
              <tr>
                  <td>Revenue</td>
                  <td>USD  ${movie.revenue}</td>
              </tr>
              
          </table>
          </div>
      </div>
          `;
    }

    function fillCards(movie) {
      let cartitas = cardStructure(movie);
      return cartitas;
    }
  })
  .catch((e) => console.error(e));
