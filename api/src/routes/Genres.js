const { default: axios } = require('axios');
const { Router } = require('express');
const { Genre } = require('../db.js');


const router = Router();


router.get('/', async (req, res) => {
    const genres = await Genre.findAll();
    // console.log(genres);

    const typeGenres = genres.map(genre => genre.name);

    if (!genres.length > 0) {
        const videogames = (await axios.get(`https://api.rawg.io/api/genres?key=${process.env.API_KEY}`)).data.results;

        videogames.forEach(async videogame => {
            await Genre.findOrCreate({
                where: { name: videogame.name }
            });
        });

        const info = await Genre.findAll()
        const genresInfo = info.map(genre => genre.name);
        res.json(genresInfo);
    } else {
        res.json(typeGenres);
    }
});


module.exports = router;