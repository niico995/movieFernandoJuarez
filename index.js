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
    <div class='btnIr'>
        <a class='btnMovie' href='./movieDetail.html?id=${movie.id}'>More Info</a>
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


const lupa = document.getElementById('movieName')

lupa.addEventListener('click', function(e) {
    lupa.className = 'buscadorAbierto'
})

lupa.addEventListener('blur',function(e){
    lupa.className = 'buscadorCerrado'
})



//Buscador por genero

function doubleSearch(movies,genre,name){
    return movies.filter(movie => movie.name === name && movie.genre.includes(genre))
}


const $genre = document.getElementById('genre')
const $movieName = document.getElementById('movieName')


$genre.addEventListener('change', function(){
    let selected = $genre.value
    console.log(selected)
    let movieName = $movieName.value
    //let genreFilter = (movies, genre) => {return movies.filter(movie => movie.genres == genre)}
    //let filtradas = genreFilter(movies,selected)
    let filtradas = []//doubleSearch(movies,selected,movieName)
    for(let pelicula of movies){
        if(selected=='All'){
            $moviesContainer.innerHTML = fillCards(movies)
        }else if(pelicula.genres.includes(selected)){
            filtradas.push(pelicula)
            
            $moviesContainer.innerHTML = fillCards(filtradas)
        }

    }
    console.log(filtradas)
     //$moviesContainer.innerHTML = fillCards(filtradas);
     console.log(filtradas)

    
})


$movieName.addEventListener('input',function (e){
    let movieName = $movieName.value
    let filtradas = []
    
    for(let pelicula of movies){
        if(pelicula.title.toLowerCase().includes(movieName.toLowerCase())){
            filtradas.push(pelicula)
        }
    }
    console.log(filtradas)


    $moviesContainer.innerHTML = fillCards(filtradas)
})


