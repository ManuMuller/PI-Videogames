require('dotenv').config();
const { Router } = require('express');
const { getVideogames, getVideogame, getVideogameByName } = require('../Controller/Controllers.js');
const { Videogame, Genre, Platform } = require('../db.js')
const axios = require('axios');
const API_KEY = process.env;
const { Op } = require('sequelize');

const router = Router();


router.get('/', async (req, res) => {
    const { name } = req.query;
    const videogames = await getVideogames();
    if (name) {
        //armo la condicion de que si pasan el nombre por query aparezcan los juegos con ese nombre,
        //sino hay query aparace la lista entera de juegos
        try {
            let gameDb = await Videogame.findAll({
                where: {
                    name: { [Op.iLike]: `%${name}%` }
                },
                include: [Genre, Platform]
            });

            const reGames = (await axios.get(`https://api.rawg.io/api/games?key=d5829f91a2ab4ad88fa89a4dba9d4bce&search=${name}`)).data.results;

            let arrGame = reGames?.map(videogame => {
                return {
                    id: videogame.id,
                    name: videogame.name,
                    background_image: videogame.background_image,
                    genres: videogame.genres.map((g) => g.name),
                    platforms: videogame.platforms.map((g) => g.platform),
                    rating: videogame.rating,
                    released: videogame.released,
                }
            });


            let allresult = gameDb.concat(arrGame).slice(0, 15);
            if (allresult.length !== 0) {
                res.status(200).send(allresult);
            } else {
                res.status(404).send('Video Game not exist');
            }

            // const videogamesName = await getVideogameByName(name);
            // console.log('videogamesName', videogamesName);
            // const videogame = videogamesName.filter(videogame => videogame.name.toLowerCase().includes(name.toLowerCase()));
            // videogame.length ? res.json(videogame) : res.status(404).json({ message: `No se encuentran videojuegos que incluyan ${name}` });
        } catch (error) {
            console.log(error)
        }
    } else {
        res.json(videogames);
    }
});


router.get('/:id', async (req, res) => {
    // const { id } = req.params;
    // try {
    //     if (id.includes("-")) { //detectar UUID en DB
    //         const gameDB = await Videogame.findOne({
    //             where: { id },
    //             include: [Genre, Platform],
    //         });
    //         return res.json(gameDB);
    //     }

    //     const gameAPI = await axios.get(
    //         `https://api.rawg.io/api/games/${id}?key=d5829f91a2ab4ad88fa89a4dba9d4bce`
    //     );
    //     res.json(gameAPI.data);
    // } catch (err) {
    //     res.status(404).json({ error: "Id not found" });
    // }
    const videogame = await getVideogame(req.params.id);
    res.json(videogame);
});

module.exports = router;