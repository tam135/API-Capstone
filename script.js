'use strict';

const apiKey = 'ad9322196147d012dd47c49a6a9555d7';

//displays movies and details after submitting a search
function displayResults(responseJson) {
    console.log(responseJson)
    $('#searched-movie').empty();
    $('#recommendation-list').empty();
    const moviePoster = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2'
    //display searched movie
    $('#searched-movie').append(
        `<img id = "moviePoster1" src='${moviePoster}/${responseJson.poster_path}' alt='Poster Image'>
        <div class = "description1">
        <h3>${responseJson.title}</h3>
        <p>Rating:${responseJson.vote_average}/10</p>
        <p>${responseJson.overview}</p></div>`
    )
    $('#movie').removeClass('movie-hidden');


    //display recommended movies
    const results = responseJson.recommendations.results;
    results.forEach(i => {
        $('#recommendation-list').append(
        `<div class = "movie-recs">
            <div class = "cardFront">
                <h4>${i.original_title}</h3>
                <img class = "moviePoster2" src='${moviePoster}/${i.poster_path}' alt='Poster Image'>
            </div>
            <div class = "cardBack">
                <p class = "description2">Rating: ${i.vote_average}/10</p>
                <p class = "description2">Release date: ${i.release_date}</p>
                <p class = "description2">${i.overview}</p>
               
            </div>`
        );
        $('#recommendation').removeClass('hidden');
    });
}

//searches for the movie
function getMovie(movie, responseJson) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movie}`;
    console.log(responseJson)
    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => {
            return getRecommendations(responseJson)

        })
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: Did you spell it right?`);
        });

}

//retrieves list of recommended movies and details from api
function getRecommendations(responseJson) {
    const movieId = responseJson.results[0].id
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&append_to_response=recommendations`;

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: Did you spell it right?`);
        });
}
function homeButton() {
    $('.fas').on('click', function (event) {
        event.preventDefault();
        location.reload();
    });
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchMovie = $('#js-search-movie').val();
        getMovie(searchMovie);
        
    });
    homeButton();
}

$(watchForm);