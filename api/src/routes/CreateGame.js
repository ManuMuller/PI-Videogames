const { Router } = require('express');
const { Genre, Videogame, Platform } = require('../db.js');

const router = Router();

router.post('/', async (req, res, next) => {
    let { name, background_image, description, released, rating, genres, platforms }
        = req.body;
    console.log(req.body);
    let newGame = await Videogame.create({
        name,
        background_image,
        description,
        released,
        rating,
        createdInDb: true
    });
    console.log(newGame);

    let dbGenre = await Genre.findAll({ where: { name: genres } });

    let dbPlatform = await Platform.findAll({ where: { name: platforms } });

    newGame.addGenres(dbGenre);
    newGame.addPlatforms(dbPlatform);

    res.status(200).send(newGame);
});


module.exports = router;