import {
    GET_GAMES,
    GET_GAMES_NAME,
    GET_GENRES,
    GET_DETAILS,
    RESET_DETAILS,
    POST_GAME,
    FILTER_BY_GENRE,
    FILTER_CREATED,
    ORDER_BY_NAME,
    ORDER_BY_RATING,
    GET_PLATFORMS

} from "./actions"

const initialState = {
    games: [],
    gamesToFilter: [],
    gamesdb: [],
    genres: [],
    details: [],
    platforms: []
}


export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_GAMES:
            return {
                ...state,
                games: action.payload,
                gamesToFilter: action.payload,
                gamesdb: action.payload
            }
        case GET_GAMES_NAME:
            return {
                ...state,
                games: action.payload
            }
        case GET_GENRES:
            return {
                ...state,
                genres: action.payload
            }
        case GET_PLATFORMS:
            return {
                ...state,
                platforms: action.payload
            }
        case GET_DETAILS:
            return {
                ...state,
                details: action.payload
            }
        case RESET_DETAILS:
            return {
                ...state,
                details: []
            }
        case POST_GAME:
            return {
                ...state
            }
        case FILTER_BY_GENRE:
            let juegos = action.payload
            state.games = state.gamesToFilter.filter(videogames => videogames.genres?.includes(juegos))
            if (action.payload === "all") state.games = state.gamesToFilter
            if (state.games.length === 0) {
                alert("No hay resultados")
                state.games = state.gamesToFilter
            }
            return {
                ...state,
                games: state.games
            }
        case FILTER_CREATED:
            if (action.payload === "api") state.games = state.games.filter(game => typeof game.id === "number")
            if (action.payload === "db") state.games = state.gamesdb.filter(game => typeof game.id === "string")
            if (action.payload === "all") state.games = state.gamesToFilter
            return {
                ...state,
                games: state.games.length ? state.games : state.gamesdb.length ? state.gamesdb : state.gamesToFilter
            }
        case ORDER_BY_NAME:
            const sortName = action.payload === 'asc' ?
                state.games.sort((a, b) => {
                    if (a.name > b.name) {
                        return 1
                    }
                    if (b.name > a.name) {
                        return -1
                    }
                    return 0
                }) :
                state.games.sort((a, b) => {
                    if (a.name > b.name) {
                        return -1
                    }
                    if (b.name > a.name) {
                        return 1
                    }
                    return 0
                })
            return {
                ...state,
                games: sortName
            }
        case ORDER_BY_RATING:
            if (action.payload === 'all') state.games = state.gamesToFilter
            if (action.payload === 'desc') state.games = state.games.sort((a, b) => a.rating - b.rating)
            if (action.payload === 'asc') state.games = state.games.sort((a, b) => b.rating - a.rating)
            return {
                ...state,
                games: state.games
            }
        default:
            return state;
    }
}