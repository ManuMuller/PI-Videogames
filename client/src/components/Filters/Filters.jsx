/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Link } from 'react-router-dom'
import './Filters.css'
import { filterByGenre, filterCreated, getGenres, getVideogames, orderByName, orderByRating } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'

const Filters = ({ handleFilterByGenre,
    handleFilterCreated,
    handleOrderByName,
    handleOrderByRating,
}) => {

    const allGenre = useSelector(state => state.genres)

    const dispatch = useDispatch()
    const handleClick = (e) => {
        e.preventDefault();
        dispatch(getVideogames());
    }
    return (
        <div className="filtros">
            <div>
                <button onClick={handleClick}>Recargar</button>
            </div>
            <div className="filter-by-genre">
                <h3>Filtrar por género</h3>
                <select defaultValue={"DEFAULT"} className="filter-genres"
                    onChange={(e) => handleFilterByGenre(e)}>

                    <option disabled="disabled" value="DEFAULT" name="DEFAULT" className="filter-genres">
                        Genres ⇵
                    </option>
                    <option value="all">All</option>

                    {allGenre.map((genre) => (
                        <option key={genre} value={genre}>
                            {genre}
                        </option>
                    ))}
                </select>

            </div>
            <div className="filter-name">
                <h3>Ordenar por nombre</h3>
                <select defaultValue={"DEFAULT"} onChange={(e) => handleOrderByName(e)} className="filter-names">

                    <option value="all" name="DEFAULT">
                        Order ⇵
                    </option>

                    <option value="asc">A-Z</option>
                    <option value="desc">Z-A</option>
                </select>
            </div>
            <div className="filter-rating">
                <h3>Ordenar por rating</h3>
                <select defaultValue={"DEFAULT"} onChange={(e) => handleOrderByRating(e)}>

                    <option value="all" name="DEFAULT">
                        Rating ⇵
                    </option>
                    <option value="asc">Rating Top</option>
                    <option value="desc">Rating Low</option>
                </select>
            </div>
            <div defaultValue={"DEFAULT"} className="filter-created">
                <h3>Ordenar por creación</h3>
                <select onChange={(e) => handleFilterCreated(e)}>

                    <option selected="false" disabled="disabled" value="DEFAULT" name="DEFAULT">
                        Games ⇵
                    </option>

                    <option value="all">All</option>
                    <option value="db">Created</option>
                    <option value="api">Existent</option>
                </select>
            </div>
            <div>
                <Link to="/createvideogame">
                    <button className="button-49">CREAR</button>
                </Link>
            </div>
        </div>
    )
}


export default Filters