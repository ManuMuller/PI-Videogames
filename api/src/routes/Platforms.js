const { Router } = require('express');
const { Platform } = require('../db.js');
// const axios = require('axios');
// const { API_KEY } = process.env;
const router = Router();
// const { getPlatforms } = require('../Controller/Controllers');


router.get('/', async (req, res) => {
        const platforms = await Platform.findAll();
        res.json(platforms);
});


module.exports = router;
// const getPlatforms = async () => {
//     const typePlatform = await Platform.findAll()
//     const platformType = typePlatform.map(el => el.name)

//     if (!typePlatform.length > 0) {
//         const nPages = 1000
//         const apiPlatforms = []

//         for (let i = 1; i <= nPages; i++) {
//             const api = (await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`)).data.results
//             const platforms = api.map(el => el.platforms.name)
//             apiPlatforms.push(platforms)
//         }
//         console.log(apiPlatforms);
        // const url1 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=1`)
        // const url2 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=2`)
        // const url3 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=3`)
        // const url4 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=4`)
        // const url5 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=5`)
        // const url6 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=6`)
        // const url7 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=7`)
        // const url8 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=8`)
        // const url9 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=9`)
        // const url10 = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=11`)



        // apiPlatforms = url1.data.results.concat(
        //     url2.data.results,
        //     url3.data.results,
        //     url4.data.results,
        //     url5.data.results,
        //     url6.data.results,
        //     url7.data.results,
        //     url8.data.results,
        //     url9.data.results,
        //     url10.data.results
        // );


        // apiPlatforms = apiPlatforms.map((platform) => {

        //     return {
        //         platforms: platform.platforms.map((g) => g.platform.name),
        //     };
        // });

        // const platform = await getVideogames()
        // //consologuear las plataformas
        // console.log(platform.platforms);

        // const games = platform.map(el => el)
        // const plataformas = apiPlatforms.map(el => el)

        // for (const platform of plataformas) {
        //     Platform.findOrCreate({
        //         where: { name: platform.platforms[0] }
        //     })
        // }
        // plataformas.forEach(name => {
        //     Platform.findOrCreate({
        //         where: { name: name }
        //     })
        // });
//         console.log(plataformas);

//         const info = await Platform.findAll()
//         const platformInfo = info.map(el => el.name)
//         console.log("plataformas", platformInfo);
//     } else {
//         console.log("no entro en el if")
//         console.log("plataformas existentes", platformType);
//     }
//     console.log("no entro en la funcion");
// }

// module.exports = {
//     getPlatforms
// }

