import './Navbar.css'
import {Link} from 'react-router-dom';
import logo from "../../assets/logo.png";

function Navbar() {
  return (
    <div className="sidebar p-4 d-flex flex-column ">

      <div className="logo mb-4 d-flex">
        <Link to="/">
            <img src={logo} className='logo-img'/>
        </Link>
        <span className="ms-1">TATO-DO</span>
      </div>

      <div className="search-wrapper mb-4">
        <input type="text" className="form-control search-input" placeholder="Rechercher..." />
      </div>
      
      <div className="mb-4">
        <h6 className="text-uppercase text-white-50 small mb-3">Tâches</h6>
        
        <button className="list-item btn btn-outline-light w-100 d-flex align-items-center justify-content-between active">
          <span><i className="bi bi-chevron-double-right me-2"></i> À Faire</span>
          <span className="badge bg-dark text-white rounded-pill">15+</span>
        </button>
        
        <button className="list-item btn btn-outline-light w-100 d-flex align-items-center justify-content-between active">
          <span><i className="bi bi-list-ul me-2"></i> Aujourd'hui</span>
          <span className="badge bg-dark rounded-pill">8</span>
        </button>
        
        <button className="list-item btn btn-outline-light w-100 d-flex align-items-center justify-content-between active">
          <span><i className="bi bi-calendar3 me-2"></i> Calendrier</span>
        </button>
      </div>

      <div className="mb-4">
        <h6 className="text-uppercase text-white-50 small mb-3">Listes</h6>
        
        <div className="list-item">
          <div className="d-flex align-items-center">
            <span className="list-dot bg-dark"></span>
            <span>Travail</span>
          </div>
          <i className="bi bi-people"></i>
        </div>
        
        <div className="list-item">
          <div className="d-flex align-items-center">
            <span className="list-dot bg-success"></span>
            <span>Perso</span>
          </div>
          <i className="bi bi-lock"></i>
        </div>
        
        <div className="list-item">
          <div className="d-flex align-items-center">
            <span className="list-dot bg-primary"></span>
            <span>Étude</span>
          </div>
          <i className="bi bi-people"></i>
        </div>
        
        <button className="btn btn-link text-white text-decoration-none mt-2">
          <i className="bi bi-plus-circle me-2"></i> Nouvelle liste
        </button>
      </div>

      <div className="sidebar-footer">
        <button className="btn btn-link text-white text-decoration-none d-flex align-items-center mb-2">
          <i className="bi bi-gear me-2"></i> Settings
        </button>
        
        <button className="btn btn-link text-danger text-decoration-none d-flex align-items-center">
          <i className="bi bi-box-arrow-right me-2"></i> Déconnexion
        </button>
      </div>
    </div>
  )
}

export default Navbar