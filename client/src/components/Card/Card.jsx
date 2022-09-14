import React from "react";
import { Link } from "react-router-dom";
import "./Card.css";


export default function Card({ id, name, image, genres, rating, platforms }) {
    return (
        <div className="card">
            <div className="card-image">
                <Link to={`/videogames/${id}`}>
                    <img src={image} alt="Not Found" />
                </Link>
            </div>
            <div className="card-content">
                <h3>{name}</h3>
                <span>Generos:</span>
                <div className="lista">
                    <span className="genres">{genres}</span>
                    {/* <span className="platfoms">Disponible para:</span>
                    <span> {platforms}</span> */}
                </div>
                {/* <span>{rating}</span> */}
            </div>
            <div className="card-action">
                <Link to={`/videogames/${id}`}><h6>Ver juego</h6></Link>
            </div>
        </div>
    )
}