import {showNotification} from "../messaging.js";
import createView from "../createView.js";

let movieId = 0;
export default function addMovieHTML(props) {
    if(props.id) {
        movieId = props.id;
    }
    return getHTML(movieId);
}

function getHTML(movieId) {
    let html = `<h1>Add a Movie</h1>`;
    if(movieId > 0) {
        // console.log(movieData)
        html = `<h1>Edit a Movie</h1>`;
    }
    html += `
        <form>
            <label for="titleInput">Title</label>
            <input id="titleInput" value="" placeholder="Enter the movie's title">
            <button id="saveButton">Save</button>        
        </form>`;
    console.log(html)
    return html;
}

async function fetchMovie(movieId) {
    return await fetch(`https://plain-watery-sea.glitch.me/movies/${movieId}`)
        .then(async function(response) {
            if(response.status !== 200) {
                console.log("cannot fetch movie data");
                return false;
            } else
                return await response.json();
        });
}

export async function addMovieJS() {
    const saveButton = document.querySelector("#saveButton");
    saveButton.addEventListener("click", saveMovie);

    // set movie input fields if we are editing a movie
    let movieData = {
        title: ""
    };
    if(movieId > 0) {
        movieData = await fetchMovie(movieId);
    }
    const titleInput = document.querySelector("#titleInput");
    titleInput.value = movieData.title;
}

function saveMovie() {
    const title = document.querySelector("#titleInput").value.trim();
    if(title.length < 1) {
        showNotification("Title cannot be blank", "warning");
        return;
    }
    const newMovie = {
        title
    }
    if(movieId > 0) {
        updateMovie(movieId, newMovie);
    } else {
        insertMovie(newMovie);
    }
}

function updateMovie(movieId, newMovie) {
    const requestOptions = {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMovie)
    }
    fetch(`https://plain-watery-sea.glitch.me/movies/${movieId}`, requestOptions)
        .then(function(response) {
            if(!response.ok) {
                showNotification("Error: could not save the movie!", "danger");
                return;
            }
            createView("/");
        })
}

function insertMovie(newMovie) {
    const requestOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMovie)
    }
    fetch("https://plain-watery-sea.glitch.me/movies", requestOptions)
        .then(function(response) {
            if(!response.ok) {
                showNotification("Error: could not save the movie!", "danger");
                return;
            }
            createView("/");
        })
}