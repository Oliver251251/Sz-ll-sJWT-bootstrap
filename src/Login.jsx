import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Login = () =>{
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const handleLogin = async() =>{
        try {
            const response = await axios.post('https://szallasjwt.sulla.hu/login',{
                username,
                password
              });
            const token = response.data.token;
            localStorage.setItem("jwt", token);
            setError('');
            navigate('/SzallasList');
        } catch (error) {
            setError('Hitelesítés sikertelen. Ellenőrizd a bejelentkezési adatokat!');
            console.error('Hiba a bejelentkezés során: ', error);
        }
    }

    return(
<div className="container mt-5">
            <h2 className="text-center mb-4">Bejelentkezés</h2>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="card p-4 shadow-lg">
                <div className="card-body">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Felhasználónév</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                placeholder="Felhasználónév"
                                value={username}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Jelszó</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Jelszó"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div className="d-grid gap-2">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleLogin}
                            >
                                Bejelentkezés
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}