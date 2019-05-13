'use strict';

const apiKey = 'ad9322196147d012dd47c49a6a9555d7';

//displays movies and details after submitting a search
function displayResults(responseJson) {
    $('#searched-movie').empty();
    $('#recommendation-list').empty();
    const moviePoster = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2'
    //display searched movie
    $('#searched-movie').append(
        `<div class = "searched-movie">
            <h2>${responseJson.title}</h2>
            <img class = "moviePoster" src='${moviePoster}/${responseJson.poster_path}' alt='Poster Image'>
            <p>${responseJson.overview}</p>
            <p> ${responseJson.title}</p>
            <p>Rating:${responseJson.vote_average}/10</p>
            </li></div>`
    )
    $('#movie').removeClass('movie-hidden');

    //display recommended movies
    const results = responseJson.recommendations.results;
    results.forEach(i => {
        $('#recommendation-list').append(
            `<div class = "movie-recs">
        <h2>${i.original_title}</h2>
        <img class = "moviePoster" src='${moviePoster}/${i.poster_path}' alt='Poster Image'>
        <li><p>${i.overview}<p>
        <p>Rating: ${i.vote_average}/10</p>
        </li></div>`
        );
        $('#recommendation').removeClass('hidden');
    });
}

//searches for the movie
function getMovie(movie, responseJson) {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movie}`;
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

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchMovie = $('#js-search-movie').val();
        getMovie(searchMovie);
    });
}

$(watchForm);