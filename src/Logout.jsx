import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

export const Logout = () =>{
    const navigate = useNavigate();
    const handleLogout = () =>{
        localStorage.removeItem("jwt");
        navigate("/");
    }


    return(
<div className="container mt-5">
            <h2 className="text-center mb-4">Kijelentkezés</h2>
            
            <div className="card p-4 shadow-lg">
                <div className="card-body text-center">
                    <p>Biztosan ki szeretnél jelentkezni?</p>
                    <button
                        className="btn btn-danger"
                        onClick={handleLogout}
                    >
                        Kijelentkezés
                    </button>
                </div>
            </div>
        </div>
    );
}