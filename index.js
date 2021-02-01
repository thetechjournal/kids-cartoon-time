let menuLinks = document.getElementsByClassName("menu-link");
let imageBanner = document.getElementById("img-banner-container");
let movieContainer = document.getElementById("movie-container");

let apiKey = "YOUR_API_KEY"

for (let i=0; i<menuLinks.length; i++){
    
    menuLinks[i].addEventListener("click", function() {
        let menu = menuLinks[i].textContent;
        if(menu !== 'Home'){
            imageBanner.style.display = "none";
            movieContainer.style.display = "block"
            getMovies(menu);
        }
        else {
            imageBanner.style.display = "block";
            movieContainer.style.display = "none"
        }
    })
}


function displayMovies(results) {

    let movieHTML = results.map(result => {
       if(result.poster_path){
            let posterPath = `https://image.tmdb.org/t/p/w185_and_h278_bestv2/${result.poster_path}`
            return (`
                <div class="movie-card">
                    <img class="movie-img" src="${posterPath}" />
                </div>
                `)
       }
    } ).join('')

    movieContainer.innerHTML = `<div class="movies">${movieHTML}</div>`
}


async function getMovies(menu) {
    let query = menu;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=1&include_adult=false`;
    let response = await fetch(url)
    let data = await response.json()
    displayMovies(data.results);
}




