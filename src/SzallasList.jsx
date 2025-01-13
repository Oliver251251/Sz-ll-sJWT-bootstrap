import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

export const SzallasList = () =>{
    const [data, setData] = useState([]);
    const [error, setError] = useState('');
    
    useEffect(() => {
        const fetchData = async() =>{
            try {
                const token = localStorage.getItem("jwt");
                if (!token) {
                    throw new Error("Nem található JWT token.");
                }
                const response = await axios.get("https://szallasjwt.sulla.hu/data", {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                });
                setData(response.data)
            } catch (error) {
                setError("Adatok lekérése sikertelen.")
                console.error("Hiba az adatok lekérdezése közben: ", error)
            }
        }
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("jwt");
            await axios.delete(`https://szallasjwt.sulla.hu/data/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setData(data.filter((item) => item.id !== id));
            alert("Szállás sikeresen törölve!");
        } catch (error) {
            console.error("Hiba a törlés során: ", error);
            alert("Nem sikerült törölni a szállást. Kérlek, próbáld újra!");
        }
    };


    return(
        <div className="p-5 m-auto text-center content bg-ivory">
            {error && <p style={{color: 'red'}}>{error}</p>}
            {data.length > 0 ? (
                <div>
                    <p className="h1">Szállások</p>
                    {data.map((item) => (
                                <div className="card col-sm-3 d-inline-block m-1 p-2" key={item.id}>
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">{item.name}</h5>
                                            <p className="card-text">
                                                <strong>Hostname:</strong> {item.hostname}<br />
                                                <strong>Location:</strong> {item.location}<br />
                                                <strong>Price:</strong> ${item.price}<br />
                                                <strong>Minimum Nights:</strong> {item.minimum_nights}
                                            </p>
                                            <div className="d-flex justify-content-between"> 
                                            <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(item.id)}
                                        >
                                            <i className="bi bi-trash3-fill"></i> Törlés
                                        </button>
                                            <Link to={`/szallas/${item.id}/update`}><i className="bi bi-pencil-fill">Módosítás</i></Link>
                                            <Link to={`/szallas/${item.id}`}><i className="bi bi-zoom-in">Részletek</i></Link>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                    ))}
                </div>
            ) : (<p>Nem találhatóak adatok</p>)}
        </div>
    );
}