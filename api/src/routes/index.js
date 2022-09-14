const { Router } = require('express');
const videogame = require('./Videogames')
const genre = require('./Genres')
const create = require('./CreateGame')
const platform = require('./Platforms')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.use('/videogames', videogame);
router.use('/genres', genre);
router.use('/createvideogame', create);
router.use('/platforms', platform);

module.exports = router;
