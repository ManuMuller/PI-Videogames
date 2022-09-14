/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { getGenres, postGame, getPlatforms } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./Create.css";
import Nav from "../Nav/Nav";

// function validator(input) {
//     let error = {};
//     const pattern = /(http:|https:\/\/)([^\s(["<,>/]*)(\/)[^\s[",><]*(.png|.jpg|.jpeg)(\?[^\s[",><]*)?/;
//     if (!input.name.trim()) {
//         error.name = "Por favor, escribe un nombre";
//     }
//     if (!input.description.trim()) {
//         error.description = "Por favor, escribe una descripción";
//     }
//     if (!input.platforms.length) {
//         error.platforms = "Por favor, selecciona al menos una plataforma";
//     }
//     if (!input.genres.length) {
//         error.genres = "Por favor, selecciona al menos un genero";
//     }
//     if (!input.background_image) error.background_image = "La url de la imagen es obligatoria";
//     else if (!pattern.test(input.background_image)) error.background_image = "La url de la imagen no es valida";
//     if (!input.rating) {
//         error.rating = "Por favor, selecciona una puntuación";
//     } else if (!/^[1-5]$/.test(input.rating)) {
//         error.rating = 'Rating must be between 1 and 5';
//     }
//     return error;
// }
function validate(input) {
    let error = {};
    if (!input.name.trim()) {
        error.name = "Name require";
    }
    if (!input.description.trim()) {
        error.description = "Description require";
    }
    if (!input.platforms.length) {
        error.platforms = "Platforms require";
    }
    if (!input.released) {
        error.platforms = "Platforms require";
    }
    return error;
}

export default function Create() {
    const dispatch = useDispatch();
    const genre = useSelector(state => state.genres);
    const platform = useSelector(state => state.platforms)

    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: "",
        description: "",
        released: "",
        background_image: "",
        rating: "",
        platforms: [],
        genres: [],
    });


    let handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }))
    }


    let handleCheckPlatform = (e) => {
        if (e.target.checked) {
            setInput({
                ...input,
                platforms: [...input.platforms, e.target.value]
            })
        } else {
            setInput({
                ...input,
                platforms: input.platforms.filter(el => el !== e.target.value)
            })
        }
    }
    let handleCheckGenres = (e) => {
        if (e.target.checked) {
            setInput({
                ...input,
                genres: [...input.genres, e.target.value]
            })
        } else {
            setInput({
                ...input,
                genres: input.genres.filter(el => el !== e.target.value)
            })
        }
    }

    function handleSubmit(e) {
        e.preventDefault();
        setErrors(
            validate({
                ...input,
                [e.target.name]: e.target.value,
            })
        );

        if (Object.keys(errors).length === 0) {
            dispatch(postGame(input));
            alert("You've created a videogame!");
            setInput({
                name: "",
                description: "",
                releaseDate: "",
                rating: "",
                platforms: [],
                genres: [],
            })
        } else {
            console.log(errors);
            alert("ERROR: Video Game not created");
            return;
        }
    }
    useEffect(() => {
        dispatch(getGenres());
        dispatch(getPlatforms());
    }, [dispatch]);
    return (
        <div className='container'>
            <form onChange={handleChange} className='style.inputs'>
                <div>
                    <div>
                        <label>Nombre:</label>
                    </div>
                    <input
                        type='text'
                        name='name'
                        value={input.name}
                        placeholder='Nombre'
                        required onChange={(e) => handleChange(e)}
                    />
                    {errors.name && <p className="error-message">{errors.name}</p>}

                </div>
                <div>
                    <div>
                        <label>Descripción:</label>
                    </div>
                    <input type='text'
                        name='description'
                        placeholder='Descripción'
                        required
                        onChange={(e) => handleChange(e)} />
                    {errors.description && <p className="error-message">{errors.description}</p>}
                </div>
                <div>
                    <div>
                        <label>Lanzamiento:</label>
                    </div>
                    {/* <input type='text' name='released' value={input.released} defaultValue={input.released} /> */}
                    <input
                        type='date'
                        name='released'
                        max={new Date().toISOString().slice(0, 10)}
                        required
                        onChange={(e) => handleChange(e)} />
                    {errors.released && <p className="error-message">{errors.released}</p>}
                </div>
                <div>
                    <div>
                        <label>Rating:</label>
                    </div>
                    <input
                        type='number'
                        name='rating'
                        min='1'
                        max='5'

                        onChange={(e) => handleChange(e)} />
                    {errors.rating && <p className="error-message">{errors.rating}</p>}
                </div>
                <div>
                    <div>
                        <label>Imagen:</label>
                    </div>
                    <input
                        type='text'
                        name='background_image'
                        placeholder='URL de una imagen'
                        required
                        onChange={(e) => handleChange(e)} />
                    {errors.background_image && <p className="error-message">{errors.background_image}</p>}
                </div>
            </form>
            <div className="platform">
                <p className="tituloPlatform">Selecciona las plataformas</p>
                {platform?.map(el => {
                    return (
                        <>
                            <div>
                                <label>
                                    <input
                                        onChange={e => handleCheckPlatform(e)}
                                        type='checkbox'
                                        name={el.name}
                                        value={el.name}
                                        key={el.id}
                                        required
                                    >
                                    </input>{el.name}</label>
                            </div>
                            {errors.platforms && <p className="error-message">{errors.platforms}</p>}
                        </>
                    )
                })}
            </div>  <div className="genres">
                <p className="tituloGenres">Selecciona los generos</p>
                {genre?.map(el => {
                    return (
                        <>
                            <div>
                                <label>
                                    <input
                                        onChange={e => handleCheckGenres(e)}
                                        type='checkbox'
                                        name={el}
                                        value={el}
                                        key={el}
                                        required
                                    >
                                    </input>{el}</label>
                                {errors.genres && <p className="error-message">{errors.genres}</p>}
                            </div>
                        </>
                    )
                })}
            </div>
            <div>
                <input type='submit' value='Subir Juego'
                    onClick={handleSubmit} />
            </div>
        </div>
    )
}
    // return (
    //     <>
    //         <Nav search={false} />
    //         <div className="main">
    //             <h1>Create your game</h1>

    //             <form onSubmit={handleSubmit}>
    //                 <div className="form">
    //                     <div className="name">
    //                         <label className="label">Nombre: </label>
    //                     </div>
    //                     <div>
    //                         <textarea
    //                             className="input"
    //                             placeholder="Name videogame"
    //                             required
    //                             type="textarea"
    //                             value={input.name}
    //                             name="name"
    //                             onChange={(e) => handleChange(e)}></textarea>
    //                         {errors.name && (<p>{errors.name}</p>)}
    //                     </div>
    //                     <div className="desc">
    //                         <label className="label">Description:</label>
    //                     </div>
    //                     <div>
    //                         <textarea
    //                             className="input-Des"
    //                             placeholder="Description videogame"
    //                             cols="50"
    //                             rows="10"
    //                             type='textarea'
    //                             name="description"
    //                             required
    //                             value={input.description}
    //                             onChange={(e) => handleChange(e)}></textarea>
    //                         {errors.description && (<p>{errors.description}</p>)}
    //                     </div>
    //                     <div>
    //                         <div>
    //                             <label>Imagen:</label>
    //                             <span>{errors.background_image}</span>
    //                         </div>
    //                         <input type='text' name='background_image' defaultValue={input.background_image} placeholder='URL de una imagen' />
    //                     </div>
    //                     <div>
    //                         <label className="label">Rating: </label>
    //                     </div>
    //                     <div>
    //                         <input
    //                             className="input"
    //                             type="number"
    //                             value={input.rating}
    //                             min="0"
    //                             max="5"
    //                             name="rating"
    //                             onChange={(e) => handleChange(e)}>
    //                         </input>
    //                         {errors.rating && (<p>{errors.rating}</p>)}
    //                     </div>
    //                     <div>
    //                         <div>
    //                             <label>Lanzamiento:</label>
    //                         </div>
    //                         <input type='date' name='released' defaultValue={input.released} max={new Date().toISOString().slice(0, 10)} />
    //                     </div>
                        // <div className="platform">
                        //     <p className="tituloPlatform">Selecciona las plataformas</p>
                        //     {platform?.map(el => {
                        //         return (
                        //             <>
                        //                 <div>
                        //                     <label>
                        //                         <input
                        //                             onChange={e => handleCheckPlatform(e)}
                        //                             type='checkbox'
                        //                             name={el.name}
                        //                             value={el.name}
                        //                             key={el.id}
                        //                         >
                        //                         </input>{el.name}</label>
                        //                 </div>
                        //             </>
                        //         )
                        //     })}
                        // </div>  <div className="genres">
                        //     <p className="tituloGenres">Selecciona los generos</p>
                        //     {genre?.map(el => {
                        //         return (
                        //             <>
                        //                 <div>
                        //                     <label>
                        //                         <input
                        //                             onChange={e => handleCheckGenres(e)}
                        //                             type='checkbox'
                        //                             name={el.name}
                        //                             value={el.name}
                        //                             key={el.id}
                        //                         >
                        //                         </input>{el}</label>
                        //                 </div>
                        //             </>
                        //         )
                        //     })}
                        // </div>
    //                     <button className="buttonSubmit" type="submit" >Crear</button>
    //                 </div>
    //             </form>
    //         </div>
    //     </>
    // )
