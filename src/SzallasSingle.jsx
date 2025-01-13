import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export const SzallasSingle = () => {
    const params = useParams();
    const id = params.id;
    const [data, setData] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchSzallas = async () => {
            try {
                const token = localStorage.getItem("jwt");
                const response = await axios.get(`https://szallasjwt.sulla.hu/data/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setData(response.data);
            } catch (error) {
                setError("Adatok lekérése sikertelen.");
                console.error("Hiba az adatok lekérésekor: ", error);
            }
        };

        fetchSzallas();
    }, [id]);

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem("jwt");
            await axios.delete(`https://szallasjwt.sulla.hu/data/${data.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert("Szállás sikeresen törölve!");
        } catch (error) {
            console.error("Hiba a törlés során: ", error);
            alert("Nem sikerült törölni a szállást. Kérlek, próbáld újra!");
        }
    };

    return (
        <div className="p-5 m-auto text-center content bg-ivory">
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {Object.keys(data).length > 0 ? (
                <div>
                    <p className="h1">{data.name}</p>
                    <div className="card col-sm-3 d-inline-block m-1 p-2" key={data.id}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{data.name}</h5>
                                <p className="card-text">
                                    <strong>Hostname:</strong> {data.hostname}<br />
                                    <strong>Location:</strong> {data.location}<br />
                                    <strong>Price:</strong> ${data.price}<br />
                                    <strong>Minimum Nights:</strong> {data.minimum_nights}
                                </p>
                                <div className="d-flex justify-content-between">
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(data.id)}
                                    >
                                        <i className="bi bi-trash3-fill"></i> Törlés
                                    </button>
                                    <Link to={`/szallas/${data.id}/update`}>
                                        <i className="bi bi-pencil-fill">Módosítás</i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <p>Nem találhatóak adatok</p>
            )}
        </div>
    );
};
