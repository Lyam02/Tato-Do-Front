import React, {useState} from 'react';
import logo from "../assets/logo.png";
import { useNavigate} from "react-router-dom";
import {userService} from '../services/api'


function Connexion() {

    {/* Partie Fonction*/}
    const [email, setEmail] = useState("");
    const [mdp, setMdp] = useState("");
    const [showError, setShowError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleConnexion = async (e) => {
        e.preventDefault()
        try {
            const data = await userService.login(email, mdp);

            if (data.jwt) {
                localStorage.setItem('jwt', data.jwt);
                localStorage.setItem('user', JSON.stringify(data.user));
                navigate('/home');
            }

        } catch (error) {
            setShowError(true);
            setTimeout(() => setShowError(false), 3000);
        }
    };


    {/* Partie Front*/}
    return (

        <>
            <div
                className="alert alert-danger position-fixed top-0 end-0 m-3 shadow d-flex align-items-center"
                role="alert"
                style={{
                    zIndex: 1050,
                    minWidth: '300px',
                    transition: 'all 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55)',
                    opacity: showError ? 1 : 0,
                    transform: showError ? 'translateY(0)' : 'translateY(-100%)',
                    pointerEvents: showError ? 'auto' : 'none'
                }}
            >
                <i className="bi bi-exclamation-triangle-fill me-3 fs-4"></i>
                <div>
                    <strong>Erreur de connexion</strong>
                    <div className="small">Email ou mot de passe incorrect.</div>
                </div>
            </div>
        <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center"
             style={{ backgroundColor: '#E6F0F4' }}>

            <div className="card border-0 shadow-sm"
                 style={{
                     borderRadius: '30px',
                     maxWidth: '900px',
                     width: '90%',
                     backgroundColor: '#FFF9F9',
                     padding: '20px'
                 }}>

                <div className="row g-0">

                    <div className="col-md-6 d-none d-md-flex flex-column align-items-center justify-content-center"
                         style={{ borderRight: '1px solid #ccc' }}>
                            <img
                                src={logo}
                                alt="Logo Tato-Do"
                                className="img-fluid mb-3"
                                style={{ maxWidth: '180px' }}
                            />
                        <h2 className="fw-bold text-dark" style={{ letterSpacing: '1px' }}>
                            TATO-DO
                        </h2>
                    </div>

                    <div className="col-md-6 p-4 p-md-5">
                        <h3 className="fw-bold text-center mb-5 text-dark">Connexion</h3>
                        <form>
                            <div className="mb-4">
                                <input
                                    type="email"
                                    className="form-control p-2"
                                    placeholder="mail.exemple@mail.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleConnexion(e);
                                        }
                                    }}
                                    style={{ backgroundColor: 'transparent', borderColor: '#6c757d', borderRadius: '5px' }}
                                />
                            </div>

                            <div className="input-group mb-5">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="form-control p-2"
                                    placeholder="Mot de passe"
                                    value={mdp}
                                    onChange={(e) => setMdp(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleConnexion(e);
                                        }
                                    }}
                                    style={{ backgroundColor: 'transparent', borderColor: '#6c757d', borderRight: 'none' }}
                                />

                                <span
                                    className="input-group-text bg-transparent"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{ borderColor: '#6c757d', cursor: 'pointer' }}
                                >
                                    <i
                                        className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}
                                        style={{ color: '#6c757d' }}
                                    ></i>
                                </span>
                            </div>
                            <button
                                onClick={handleConnexion}
                                type="button"
                                className="btn w-100 py-2 text-white"
                                style={{
                                    backgroundColor: '#093352',
                                    borderRadius: '8px',
                                    fontWeight: '500'
                                }}
                            >
                                Se connecter
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default Connexion;