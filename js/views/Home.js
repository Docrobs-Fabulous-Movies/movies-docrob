import {showNotification} from "../messaging.js";
import {getUser} from "../auth.js";

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
                    <a class="movie-button" href="/editMovie"><i class="text-information fs-4 fas fa-edit"></i></a>
                    <a class="movie-button" href="/deleteMovie"><i class="text-danger fs-4 fas fa-trash-alt"></i></a>
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

}