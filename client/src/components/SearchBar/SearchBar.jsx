import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getGameName } from "../../redux/actions";
import "./SearchBar.css";

export default function SearchBar({ setCurrentPage }) {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const handleInputChange = (e) => {
        e.preventDefault();
        setName(e.target.value);
    }
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            setCurrentPage(1)
            dispatch(getGameName(name));
            setName("");
        }
    }
    return (
        <div >
            <div className="input-group">
                <input type="text" id="name" placeholder=" " value={name} onChange={(e) => handleInputChange(e)} onKeyPress={e => handleKeyPress(e)} />
                <label htmlFor="name">BUSCAR</label>
            </div>
        </div>
    );
}
