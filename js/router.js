import Home, {HomeEvents} from "./views/Home.js";
import About, {AboutEvents} from "./views/About.js";
import Error404 from "./views/Error404.js";
import Loading from "./views/Loading.js";
import Login from "./views/Login.js";
import LoginEvent from "./auth.js";
import Register from "./views/Register.js"
import {RegisterEvent} from "./views/Register.js";
import UserIndex, {UserEvents} from "./views/User.js";
import Logout, {LogoutEvents} from "./views/Logout.js";
import addMovieHTML, {addMovieJS} from "./views/AddMovie.js";

/**
 * Returns the route object for a specific route based on the given URI
 * @param URI
 * @returns {*}
 */
export default function router(URI) {
    // console.log(URI);
    // if there is a path variable on the end, remove it and load it into props
    const URIParts = URI.split("/");
    let id = 0;
    if(URIParts[URIParts.length - 1] != '' && !isNaN(URIParts[URIParts.length - 1])) {
        // console.log(URIParts);
        id = URIParts[URIParts.length - 1];
        URI = URIParts.slice(0, URIParts.length - 1).join("/");
    }

    const routes = {
        '/': {
            returnView: Home,
            state: {
                movies: {
                    url: "https://plain-watery-sea.glitch.me/movies",
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            },
            uri: '/',
            title: 'My Movies',
            viewEvent: HomeEvents
        },
        '/addMovie': {
            returnView: addMovieHTML,
            state: {},
            uri: '/addMovie',
            title: 'Add Movie',
            viewEvent: addMovieJS
        },
        '/editMovie': {
            returnView: addMovieHTML,
            state: {
                id: id
            },
            uri: `/editMovie/${id}`,
            title: 'Edit Movie',
            viewEvent: addMovieJS
        },
        '/logout': {
            returnView: Logout,
            state: {},
            uri: '/',
            title: 'Logout',
            viewEvent: LogoutEvents
        },
        '/login': {
            returnView: Login,
            state: {},
            uri: '/login',
            title: "Login",
            viewEvent: LoginEvent
        },
        '/register': {
            returnView: Register,
            state: {},
            uri: '/register',
            title: 'Register',
            viewEvent: RegisterEvent
        },
        '/users': {
            returnView: UserIndex,
            state: {},
            uri: "/users",
            title: 'User Info',
            viewEvent: UserEvents
        },
        '/about': {
            returnView: About,
            state: {},
            uri: '/about',
            title: 'About',
            viewEvent: AboutEvents
        },
        '/error': {
            returnView: Error404,
            state: {},
            uri: location.pathname,
            title: ' ERROR',
        },
        '/loading': {
            returnView: Loading,
            state: {},
            uri: location.pathname,
            title: 'Loading...',
        }
    };

    // if we see a URI with index.html then interpret that as a route for /
    if(URI.indexOf("index.html") > -1) {
        URI = "/";
    }

    return routes[URI];
}