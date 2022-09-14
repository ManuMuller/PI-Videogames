import axios from 'axios';

export const GET_GAMES = 'GET_GAMES';
export const GET_GAMES_NAME = 'GET_GAMES_NAME'
export const GET_GENRES = 'GET_GENRES'
export const GET_DETAILS = 'GET_DETAILS'
export const RESET_DETAILS = 'RESET_DETAILS'
export const POST_GAME = 'POST_GAME'
export const FILTER_BY_GENRE = 'FILTER_BY_GENRE'
export const FILTER_CREATED = 'FILTER_CREATED'
export const ORDER_BY_NAME = 'ORDER_BY_NAME'
export const ORDER_BY_RATING = 'ORDER_BY_RATING'
export const GET_PLATFORMS = 'GET_PLATFORMS'

export function getVideogames() {
    return dispatch => {
        axios.get('http://localhost:3001/videogames')
            .then(res => {
                dispatch({
                    type: GET_GAMES,
                    payload: res.data
                })
            }).catch(err => console.log(err))
    }
}

export function getGameName(name) {
    return dispatch =>
        axios.get(`http://localhost:3001/videogames?name=${name}`)
            .then(res => {
                dispatch({
                    type: GET_GAMES_NAME,
                    payload: res.data
                })
            }).catch(err => alert(`No se encontraron juegos que incluyan ${name}`, err))
}

export function getDetails(id) {
    return function (dispatch) {
        axios.get(`http://localhost:3001/videogames/${id}`)
            .then(res => {
                dispatch({
                    type: GET_DETAILS,
                    payload: res.data
                })
            }).catch(err => alert(`No se encontraron los detalles del juego`, err))
    }
}


export function getGenres() {
    return function (dispatch) {
        axios.get('http://localhost:3001/genres', {})
            .then(res => {
                dispatch({
                    type: GET_GENRES,
                    payload: res.data
                })
            }).catch(err => console.log(err))
    }
}

export function getPlatforms() {
    return function (dispatch) {
        axios.get('http://localhost:3001/platforms')
            .then(res => {
                dispatch({
                    type: GET_PLATFORMS,
                    payload: res.data
                })
            }).catch(err => console.log(err))
    }
}


export function resetDetails() {
    return {
        type: RESET_DETAILS
    }
}


export function postGame(game) {
    return async function () {
        let info = await axios.post('http://localhost:3001/createvideogame', game)
        return info.data
    }
}


export function filterByGenre(payload) {
    return {
        type: FILTER_BY_GENRE,
        payload
    }
}


export function filterCreated(payload) {
    return {
        type: FILTER_CREATED,
        payload
    }
}

export function orderByName(payload) {
    return {
        type: ORDER_BY_NAME,
        payload
    }
}

export function orderByRating(payload) {
    return {
        type: ORDER_BY_RATING,
        payload
    }
}
