/* eslint-disable no-unused-vars */
import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVideogames, getGenres, filterByGenre, filterCreated, orderByName, orderByRating } from "../../redux/actions";
import Nav from "../Nav/Nav";
import Filters from '../Filters/Filters'
import Paginado from "../Paginado/Paginado";
import Card from "../Card/Card";
import "./Home.css";
import loading from "../../assets/imgs/connecting-loading.gif";



export default function Home() {
    const dispatch = useDispatch()
    const allVideogames = useSelector(state => state.games);

    const [currentPage, setCurrentPage] = useState(1);

    const [gamesPerPage, setGamesPerPage] = useState(15);

    const [render, setRender] = useState("");

    const indexOfLastGame = currentPage * gamesPerPage;

    const indexOfFirstGame = indexOfLastGame - gamesPerPage;

    const currentGames = allVideogames.slice(indexOfFirstGame, indexOfLastGame);

    function paginado(pageNumber) {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getGenres())
        dispatch(getVideogames())
    }, [dispatch])


    const handleFilterByGenre = (e) => {
        dispatch(filterByGenre(e.target.value))
        setCurrentPage(1)
        if (e.target.value === "all") {
            dispatch(getVideogames())
        }

        setCurrentPage(1)
        setRender(e.target.value)
    }
    const handleFilterCreated = (e) => {
        dispatch(filterCreated(e.target.value))
        setCurrentPage(1)
        setRender(e.target.value)
    }
    const handleOrderByName = (e) => {
        if (e.target.value === "all") {
            dispatch(getVideogames())
        }
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        setRender(e.target.value)
    }
    const handleOrderByRating = (e) => {
        dispatch(orderByRating(e.target.value))
        if (e.target.value === "all") {
            dispatch(getVideogames())
        }
        setCurrentPage(1)
        setRender(e.target.value)
    }

    return (
        <>
            <Nav
                setCurrentPage={setCurrentPage}
            />
            {allVideogames.length ?
                <div className="bodyHome">

                    <div className="filters">
                        <Filters
                            handleOrderByName={handleOrderByName}
                            handleOrderByRating={handleOrderByRating}
                            handleFilterCreated={handleFilterCreated}
                            handleFilterByGenre={handleFilterByGenre}
                        />
                    </div>

                    <div className="cards">
                        {
                            currentGames.map(el => {
                                return (
                                    <div key={el.id} className="cards">
                                        <Card
                                            id={el.id}
                                            name={el.name}
                                            image={el.background_image}
                                            genres={el.genres.map(el => el.name ? <p key={el.name}>{el.name}</p> : <p key={el}>{el.toUpperCase() + ' '}</p>)}
                                            // rating={el.rating}
                                            // platforms={el.platforms.map(el => el.name ? <p key={el.name}>{el.name}</p> : <p key={el}>{el.toUpperCase() + ' '}</p>)}
                                            key={el.id}
                                        />
                                    </div>
                                )
                            })

                        }
                    </div>

                </div>
                : <div className="loader"> <img className="gif" src={loading} alt="not found" /></div>
            }
            <Paginado
                gamesPerPage={gamesPerPage}
                allVideogames={allVideogames.length}
                paginado={paginado}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
        </>
    )
}