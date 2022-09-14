import React from "react";
import { Link } from 'react-router-dom'
import './LandingPage.css'


export default function LandingPage() {
    return (
        <div className="body">
            <div className="landingPage">
                <h1 className="title">Videogames</h1>
                <Link to="/home">
                    <button className="eightbit-btn">Entrar</button>
                </Link>
            </div>
        </div>
    )
}