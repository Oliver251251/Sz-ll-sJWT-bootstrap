import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export const UpdateSzallas = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: "",
        hostname: "",
        location: "",
        price: "",
        minimum_nights: "",
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSzallas = async () => {
            try {
                const token = localStorage.getItem("jwt");
                const response = await axios.get(`https://szallasjwt.sulla.hu/data/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setFormData(response.data);
            } catch (error) {
                console.error("Hiba az adatok lekérésekor: ", error);
            }
        };
        fetchSzallas();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("jwt");
            await axios.put(`https://szallasjwt.sulla.hu/data/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert("Szállás sikeresen frissítve!");
            navigate("/SzallasList");
        } catch (error) {
            console.error("Hiba a frissítés során: ", error);
            alert("Nem sikerült frissíteni. Kérlek, próbáld újra!");
        }
    };

    return (
        <div className="p-5">
            <h1>Szállás módosítása</h1>
            <form onSubmit={handleSubmit}>
                <label>Név</label>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    className="form-control mb-2"
                    onChange={handleChange}
                />
                <label>Hoszt név</label>
                <input
                    type="text"
                    name="hostname"
                    placeholder="Hostname"
                    value={formData.hostname}
                    className="form-control mb-2"
                    onChange={handleChange}
                />
                <label>Hely</label>
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    className="form-control mb-2"
                    onChange={handleChange}
                />
                <label>Ár</label>
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    className="form-control mb-2"
                    onChange={handleChange}
                />
                <label>Minimum éjszakák</label>
                <input
                    type="text"
                    name="minimum_nights"
                    placeholder="Minimum Nights"
                    value={formData.minimum_nights}
                    className="form-control mb-2"
                    onChange={handleChange}
                />
                <button type="submit" className="btn btn-primary">
                    Frissítés
                </button>
            </form>
        </div>
    );
};

