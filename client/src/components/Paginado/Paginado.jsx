import React from "react";
import './Paginado.css'

export default function Paginado({ gamesPerPage, allVideogames, paginado, setCurrentPage, currentPage }) {
    const pageNumber = [];

    let maxPage = Math.ceil(allVideogames / gamesPerPage)

    for (let i = 0; i < maxPage; i++) {
        pageNumber.push(i + 1)
    }
    return (
        <div className="paginado">
            <nav >
                <ul>
                    <button onClick={currentPage !== 1 ? () => setCurrentPage(currentPage - 1) : 'hidden'}>Anterior</button>
                    {pageNumber && pageNumber.map(number => {
                        return (
                            <button className={number === currentPage ? 'active' : ''} onClick={() => paginado(number)} key={number}>{number}</button>
                        )
                    })}
                    <button onClick={maxPage !== currentPage ? () => setCurrentPage(currentPage + 1) : null}>Siguiente</button>
                </ul>
            </nav>
        </div>
    )

}