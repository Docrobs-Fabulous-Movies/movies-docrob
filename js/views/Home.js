import {showNotification} from "../messaging.js";
import createView from "../createView.js";

export default function Home(props) {
    let html = getTopHTML();
    html += getMoviesHTML(props.movies);
    html += getBottomHTML();
    return html;
}

function getTopHTML() {
    return `
        <header>
            <h1>My "favorite" Movies</h1>
        </header>
        <main>
            <a data-link href="/addMovie"><i class="text-success fs-4 fas fa-plus-square"></i></a>
    `;
}

function getMoviesHTML(movies) {
    let html = "";
    for (let i = 0; i < movies.length; i++) {
        html += `
            <div class="card">
                <div class="card-body">
                    <p>${movies[i].title}</p>
<!--                    <a class="edit-movie-button movie-button" href="/editMovie/${movies[i].id}"><i class="text-information fs-4 fas fa-edit"></i></a>-->
                    <a data-id="${movies[i].id}" class="edit-movie-button movie-button" href="#"><i class="text-information fs-4 fas fa-edit"></i></a>
                    <a data-id="${movies[i].id}" class="delete-movie-button movie-button" href="#"><i class="text-danger fs-4 fas fa-trash-alt"></i></a>
                </div>
            </div>
            `;
    }
    return html;
}

function getBottomHTML() {
    return `
        </main>`;
}

export function HomeEvents() {
    // attach delete handlers for all delete buttons
    const deleteButtons = document.querySelectorAll(".delete-movie-button");
    for (let i = 0; i < deleteButtons.length; i++) {
        deleteButtons[i].addEventListener("click", deleteMovie);
    }

    const editButtons = document.querySelectorAll(".edit-movie-button");
    for (let i = 0; i < editButtons.length; i++) {
        editButtons[i].addEventListener("click", editMovie);
    }
}

function deleteMovie() {
    const id = this.getAttribute("data-id");
    console.log("DELETING " + id);
    const requestOptions = {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
        }
    }
    fetch(`https://plain-watery-sea.glitch.me/movies/${id}`, requestOptions)
        .then(function(response) {
            if(!response.ok) {
                showNotification("Error: could not delete the movie!", "danger");
                return;
            }
            createView("/");
        });
}

function editMovie() {
    const id = this.getAttribute("data-id");
    console.log("EDITING " + id);
    createView(`/editMovie/${id}`);
}