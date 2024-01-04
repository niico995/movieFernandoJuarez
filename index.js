const $moviesContainer = document.getElementById('moviesList')
console.log($moviesContainer)


function cardStructure(movie) {
    return `
<div class='card'>
    <img class='cardImg' src='${movie.image}' alt='Movie image' />
    <div>
    <h2>${movie.title}</h2>
    <p>${movie.overview}</p>
    </div>
</div>
    `
}


function fillCards(movies){
    let cartitas = ''
    for(let movie of movies){
        cartitas += cardStructure(movie)
    }
    return cartitas
}

$moviesContainer.innerHTML = fillCards(movies)