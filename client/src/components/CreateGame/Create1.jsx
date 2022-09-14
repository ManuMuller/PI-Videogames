import React, { useState, useEffect } from "react";
import { getGenres, postGame, getPlatforms } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import "./Create.css";
import Nav from "../Nav/Nav";

function validate(input) {
    const pattern = /(http:|https:\/\/)([^\s(["<,>/]*)(\/)[^\s[",><]*(.png|.jpg|.jpeg)(\?[^\s[",><]*)?/;
    let error = {};
    if (!input.name.trim()) {
        error.name = "Por favor, escribe un nombre";
    }
    if (!input.description.trim()) {
        error.description = "Por favor, escribe una descripción";
    }
    // if (!input.platforms.length) {
    //     error.platforms = "Por favor, selecciona al menos una plataforma";
    // }
    // if (!input.genres.length) {
    //     error.genres = "Por favor, selecciona al menos un genero";
    // }
    if (!input.background_image) error.background_image = "La url de la imagen es obligatoria";
    else if (!pattern.test(input.background_image)) error.background_image = "La url de la imagen no es valida";
    // if (!input.rating) {
    //     error.rating = "Por favor, selecciona una puntuación";
    // } else if (!/^[1-5]$/.test(input.rating)) {
    //     error.rating = 'El rating debe ser de 1 a 5';
    // }
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
        rating: "",
        background_image: "",
        platforms: [],
        genres: [],
    });

    function handleChange(e) {
        setInput({
            ...input, [e.target.name]: e.target.value,
        })

        setErrors(
            validate({
                ...input, [e.target.name]: e.target.value,
            })
        );
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
        if (!input.name || input.rating < 0 || input.rating > 5 || !input.description || !input.released || !input.platforms.length || !input.genres.length) return alert('Formulario no valido')
        e.preventDefault();
        // setErrors(
        //     validate({
        //         ...input,
        //         [e.target.name]: e.target.value,
        //     })
        // );

        if (Object.keys(errors).length !== 0) {
            alert("ERROR: Video Game not created");
            return
        }
        else {
            dispatch(postGame(input));
            setInput({
                name: "",
                description: "",
                released: "",
                rating: "",
                background_image: "",
                platforms: [],
                genres: [],
            })
            alert("You've created a videogame!");
        }
    }

    useEffect(() => {
        dispatch(getGenres());
        dispatch(getPlatforms());
    }, [dispatch]);

    return (
        <>
            <Nav search={false} />
            <div className="home-button">
                <Link className="home-btn" to="/home">
                    HOME
                </Link>
            </div>
            <h1 className="page-title">Crea tu jueguito</h1>
            <div className="main">
                <div className="create-Game">

                    <div className="right">
                        <form className="creation-form" onSubmit={(e) => handleSubmit(e)}>
                            <div>
                                <div>
                                    <label>Nombre:</label>
                                </div>
                                <input
                                    className="inputs"
                                    placeholder="Name videogame"
                                    required
                                    type="text"
                                    value={input.name}
                                    name="name"
                                    onChange={(e) => handleChange(e)}
                                />
                                {errors.name && <p className="error-message">{errors.name}</p>}
                            </div>
                            <div>
                                <label>Descripcion:</label>
                            </div>
                            <div>
                                <textarea
                                    className="inputsdes"
                                    placeholder="Description videogame"
                                    type="text"
                                    required
                                    value={input.description}
                                    name="description"
                                    onChange={(e) => handleChange(e)}

                                />
                                {errors.description && <p className="error-message">{errors.description}</p>}
                            </div>



                            <div>
                                <label>Rating:</label>
                            </div>
                            <div className="rating-input">
                                <input
                                    className="inputs"
                                    type="number"
                                    value={input.rating}
                                    name="rating"
                                    onChange={(e) => handleChange(e)}
                                />
                            </div>
                            <div>
                                <div>
                                    <label>Lanzamiento:</label>
                                </div>
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
                                    <label>Imagen:</label>
                                </div>
                                <input
                                    className="inputs"
                                    type='text'
                                    name='background_image'
                                    placeholder='URL de una imagen'
                                    required
                                    onChange={(e) => handleChange(e)} />
                                {errors.background_image && <p className="error-message">{errors.background_image}</p>}
                            </div>
                            <div classname="borde">
                                <p className="tituloPlatform">Selecciona las plataformas</p>
                                <div className="platform1">
                                    {platform?.map(el => {
                                        return (
                                            <>
                                                <div className="checks">
                                                    <label >
                                                        <input
                                                            className="checksb"
                                                            onChange={e => handleCheckPlatform(e)}
                                                            type='checkbox'
                                                            name={el.name}
                                                            value={el.name}
                                                            key={el.id}

                                                        >
                                                        </input>{el.name}</label>
                                                    {errors.platforms && <p className="error-message">{errors.platforms}</p>}
                                                </div>
                                            </>
                                        )
                                    })}
                                </div>
                            </div>
                            <div classname="borde">
                                <p className="tituloGenres">Selecciona los generos</p>
                                <div className="genres1">
                                    {genre?.map(el => {
                                        return (
                                            <>
                                                <div className="checks">
                                                    <label>
                                                        <input
                                                            className="checksb"
                                                            onChange={e => handleCheckGenres(e)}
                                                            type='checkbox'
                                                            name={el}
                                                            value={el}
                                                            key={el}

                                                        >
                                                        </input>{el}</label>
                                                    {errors.genres && <p className="error-message">{errors.genres}</p>}
                                                </div>
                                            </>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="submit">
                                <button type="submit" className="button-85" onClick={handleSubmit}>
                                    Crear
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}