import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const CreateSzallas = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        hostname: '',
        price: '',
        minimum_nights: '',
        location: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("jwt");
            await axios.post('https://szallasjwt.sulla.hu/data', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            navigate('/SzallasList');
        } catch (error) {
            console.error('Hiba a szállás létrehozásakor:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h2>Új szállás létrehozása</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Szállás neve:</label>
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Hostname:</label>
                    <input
                        type="text"
                        name="hostname"
                        className="form-control"
                        value={formData.hostname}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Ár:</label>
                    <input
                        type="number"
                        name="price"
                        className="form-control"
                        value={formData.price}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Minimum éjszakák:</label>
                    <input
                        type="text"
                        name="nights"
                        className="form-control"
                        value={formData.nights}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Hely:</label>
                    <input
                        type="text"
                        name="location"
                        className="form-control"
                        value={formData.location}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-3">Létrehozás</button>
            </form>
        </div>
    );
};

