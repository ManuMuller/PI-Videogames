require('dotenv').config();
const axios = require('axios');
const { Genre, Videogame, Platform } = require('../db.js');
const { API_KEY } = process.env;


const getApiVideogames = async () => {
    try {
        apiGames = (await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=200`)).data.results

        apiGames = apiGames.map((game) => {
            return {
                id: game.id,
                name: game.name,
                background_image: game.background_image,
                genres: game.genres.map((g) => g.name),
                platforms: game.platforms.map((g) => g.platform.name),
                rating: game.rating,
                released: game.released,
            };
        });
        return apiGames;



    } catch (error) {
        console.log('Error API', error.message)
    }
}


const getDbVideogames = async () => {
    return await Videogame.findAll({ include: [Genre, Platform] })
}




const getVideogame = async (id) => {
    try {

        const videogame = await Videogame.findOne({
            where: { id },
            include: [Genre, Platform],
        });
        return videogame
    } catch (error) {
        console.log('Error DB', error.message)
    }

    id = parseInt(id)
    try {
        const videogame = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)

        return {
            id: videogame.data.id,
            name: videogame.data.name,
            description: videogame.data.description,
            background_image: videogame.data.background_image,
            released: videogame.data.released,
            rating: videogame.data.rating,
            genres: videogame.data.genres.map((g) => g.name),
            platforms: videogame.data.platforms.map((g) => g.platform.name),
            stores: videogame.data.stores.map((g) => g.store.name),
        }
    } catch (error) {
        console.log('Error API', error.message)
    }
}

const getPlatforms = async () => {
    const platforms = await Platform.findAll();

    if (!platforms.length > 0) {
        const url1 = await axios.get(`https://api.rawg.io/api/platforms?key=${API_KEY}&page=1`)
        const url2 = await axios.get(`https://api.rawg.io/api/platforms?key=${API_KEY}&page=2`)
        const platformsApi = url1.data.results.concat(url2.data.results)
        const platforms = platformsApi;
        platforms.forEach(async (p) => {
            await Platform.findOrCreate({
                where: {
                    name: p.name,
                }
            })
        });

        const platformsDb = await Platform.findAll();
        const platformsNames = platformsDb.map((p) => p.name)
        console.log("Plataformas creadas");
        return platformsNames

    } else {
        console.log("Plataformas ya creadas");
    }
};


const getGenres = async () => {
    const genres = await Genre.findAll();
    // console.log(genres);

    const typeGenres = genres.map(genre => genre.name);

    if (!genres.length > 0) {
        const videogames = (await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)).data.results;

        videogames.forEach(async videogame => {
            await Genre.findOrCreate({
                where: { name: videogame.name }
            });
        });

        const info = await Genre.findAll()
        const genresInfo = info.map(genre => genre.name);
        console.log("Generos creados");
        return genresInfo;
    } else {
        console.log("Generos ya creados");
        return typeGenres;
    }
}
const getVideogameByName = async (name) => {
    try {
        console.log("la puta que te pario")
        const videogameAPI = (await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&search=${name}`)).data.results;
        const videogameInfo = videogameAPI.map(videogame => {
            return {
                id: videogame.id,
                name: videogame.name,
                background_image: videogame.background_image,
                genres: videogame.genres.map((g) => g.name),
                platforms: videogame.platforms.map((g) => g.platform.name),
                rating: videogame.rating,
                released: videogame.released,
            }
        })
        console.log("videogameInfo", videogameInfo)

        return videogameInfo

    } catch {
        (error => console.log(error.message))
    }
}

const getVideogames = async (name) => {
    const apiInfo = await getApiVideogames()
    // console.log('apiInfo', apiInfo)
    const dbInfo = await getDbVideogames()
    // console.log('dbInfo', dbInfo)
    const infoTotal = apiInfo ? apiInfo.concat(dbInfo) : dbInfo
    return infoTotal
}
module.exports = {
    getVideogames,
    getVideogame,
    getPlatforms,
    getGenres,
    getVideogameByName
}