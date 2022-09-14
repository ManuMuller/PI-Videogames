import React from 'react'
import { Link } from 'react-router-dom'
import SearchBar from '../SearchBar/SearchBar'
import './Nav.css'
import logo from '../../assets/imgs/logo.jpg'


const Nav = ({ setCurrentPage }) => {

    return (
        <div className='nav'>
            <div className='nav-logo'>
                <Link to='/home' >
                    <img src={logo} alt='logo' width="100px" className='logo' />
                </Link>
            </div>
            <Link to='/home'><h1 className='nav-title' >Jueguitos</h1></Link>
            <div className='nav-search'>
                <SearchBar
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    )
}

export default Nav