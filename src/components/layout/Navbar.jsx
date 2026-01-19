import './Navbar.css'
import {Link} from 'react-router-dom';
import logo from "../../assets/logo.png";
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

function Navbar({lists}) {

    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('jwt');
        localStorage.removeItem('user');
        navigate('/');
    };

  return (
    <div className="sidebar p-4 d-flex flex-column ">

      <div className="logo mb-4 d-flex">
        <NavLink to="/home">
            <img src={logo} className='logo-img'/>
        </NavLink>
        <span className="ms-1">TATO-DO</span>
      </div>

      <div className="search-wrapper mb-4">
        <input type="text" className="form-control search-input" placeholder="Rechercher..." />
      </div>
      
      <div className="mb-4">
        <h6 className="text-uppercase text-white-50 small mb-3">Tâches</h6>

          <NavLink
              to="/home"
              className="list-item btn btn-outline-light w-100 d-flex align-items-center justify-content-between"
              style={({ isActive }) => {
                  return {
                      backgroundColor: isActive ? '#DFDFDF' : '#E9F8F8',
                      borderColor: isActive ? '#495057' : '',
                      color: isActive ? '#000000' : '#000000'
                  };
              }}
          >
              <span><i className="bi bi-chevron-double-right me-2"></i> À Faire</span>
              <span className="badge bg-dark text-white rounded-pill">15+</span>
          </NavLink>
        
        <NavLink to="/today" className="list-item btn btn-outline-light w-100 d-flex align-items-center justify-content-between active"
                 style={({ isActive }) => {
                     return {
                         backgroundColor: isActive ? '#DFDFDF' : '#E9F8F8',
                         borderColor: isActive ? '#495057' : '',
                         color: isActive ? '#000000' : '#000000'
                     };
                 }}>
          <span><i className="bi bi-list-ul me-2"></i> Aujourd'hui</span>
          <span className="badge bg-dark rounded-pill">8</span>
        </NavLink>
        
        <NavLink to="/calendrier" className="list-item btn btn-outline-light w-100 d-flex align-items-center justify-content-between active"
                 style={({ isActive }) => {
                     return {
                         backgroundColor: isActive ? '#DFDFDF' : '#E9F8F8',
                         borderColor: isActive ? '#495057' : '',
                         color: isActive ? '#000000' : '#000000'
                     };
                 }}>
          <span><i className="bi bi-calendar3 me-2"></i> Calendrier</span>
        </NavLink>
      </div>

      <div className="mb-4">
        <h6 className="text-uppercase text-white-50 small mb-3">Listes</h6>

          {lists.map(list => (
              <NavLink
                  key={list.documentId}
                  to={`/lists/${list.documentId}`}
                  className="list-item text-decoration-none d-flex justify-content-between align-items-center"

                  style={({ isActive }) => {
                      return {
                          backgroundColor: isActive ? '#DFDFDF' : '#E9F8F8',
                          borderColor: isActive ? '#495057' : 'transparent',
                          color: '#000000',
                          cursor: 'pointer'
                      };
                  }}
              >
                  <div className="d-flex align-items-center">
                      <span className="list-dot" style={{backgroundColor: list.color}}></span>
                      <span className="ms-2">{list.name}</span>
                  </div>

                  {list.isPublic ? (
                      <i className="bi bi-people"></i>
                  ) : (
                      <i className="bi bi-lock"></i>
                  )}
              </NavLink>
          ))}
        
        <Link to={'/newlist'} className="text-decoratiob-none">
          <button className="btn btn-link text-white text-decoration-none mt-2">
            <i className="bi bi-plus-circle me-2"></i> Nouvelle liste
          </button>
        </Link>
      </div>

      <div className="sidebar-footer">
        <button className="btn btn-link text-white text-decoration-none d-flex align-items-center mb-2">
          <i className="bi bi-gear me-2"></i> Settings
        </button>
        
        <button onClick={handleLogout} className="btn btn-link text-danger text-decoration-none d-flex align-items-center">
          <i className="bi bi-box-arrow-right me-2"></i> Déconnexion
        </button>
      </div>
    </div>
  )
}

export default Navbar