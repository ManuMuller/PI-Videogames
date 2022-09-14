/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getDetails, resetDetails } from "../../redux/actions"
import './Detail.css'
import Nav from "../Nav/Nav"


export default function Detail() {
    const dispatch = useDispatch();
    const { id } = useParams()
    const detail = useSelector(state => state.details)
    useEffect(() => {
        dispatch(resetDetails())
        dispatch(getDetails(id))
    }, [dispatch, id])

    return (
        <div>
            <Nav />
            {
                detail.name ?
                    <div className="game">
                        <img src={detail.background_image} alt="Not found" />
                        <h1 className="gamename">{detail.name}</h1>
                        <div className="grid">
                            <h3>Generos:</h3>
                            <span>{detail.genres.map(el => el.name ? <p key={el.name}>{el.name}</p> : <p key={el}>{el.toUpperCase() + ' '}</p>)}</span>
                        </div>
                        <div className="grid">
                            <h3>Plataformas:</h3>
                            <span>{detail.platforms.map(el => el.name ? <p key={el.name}>{el.name}</p> : <p key={el}>{el.toUpperCase() + ' '}</p>)}</span>
                        </div>
                        <div className="grid">
                            <h1>Rating: </h1>
                            <h1>{detail.rating}</h1>
                        </div>
                        <div className="grid-des">
                            <h2>Descripcion:</h2>
                            <p className="descripcion" dangerouslySetInnerHTML={{ __html: detail.description }}></p>
                        </div>
                        <div className="grid">
                            <h2>Publicado el:</h2>
                            <span>{detail.released}</span>
                        </div>
                    </div> : <div className="loader"> <img className="gif" src="https://c.tenor.com/FBeNVFjn-EkAAAAC/ben-redblock-loading.gif" alt="not found" /></div>
            }
        </div>
    )
}