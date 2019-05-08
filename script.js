'use strict';

const apiKey = 'ad9322196147d012dd47c49a6a9555d7';

function displayResults(responseJson) {
    console.log(responseJson);
    const tumbImage = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2'
    $('#results-list').empty();
    for (let i = 0; i < responseJson.results.length; i++) {
        $('#results-list').append(
            `<img id = "moviePoster" src='${tumbImage}/${responseJson.results[i].poster_path}' alt='Poster Image'>
            <li><h3>${responseJson.results[i].overview}<h3>
            <p>Rating: ${responseJson.results[i].vote_average}/10</p>
            <p>Release Date: ${responseJson.results[i].release_date}</p>
            </li`
        )
    };
    $('#results').removeClass('hidden');
}


function getMovie(movie) {
    console.log('getMovie ran')
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movie}`;

    console.log(url)

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson))
        .catch(err => {
            $('#js-error-message').text(`Something went wrong: ${err.message}`);
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