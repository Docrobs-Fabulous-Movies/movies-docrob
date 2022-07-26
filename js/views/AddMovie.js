import {showNotification} from "../messaging.js";

export default function addMovieHTML(props) {
    return getHTML();
}

function getHTML() {
    return `
        <h1>Add a Movie</h1>
        <form>
            <label for="titleInput">Title</label>
            <input id="titleInput" placeholder="Enter the movie's title">
            <button id="addButton">Add the movie</button>        
        </form>
`;
}

export function addMovieJS() {
    const addButton = document.querySelector("#addButton");
    addButton.addEventListener("click", function() {
        addMovie();
    });
}

function addMovie() {
    const title = document.querySelector("#titleInput").value.trim();
    if(title.length < 1) {
        showNotification("Title cannot be blank", "warning");
        return;
    }
    const newMovie = {
        title
    }
    const requestOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMovie)
    }
    fetch("", requestOptions)
        .then(function(response) {

        })
}