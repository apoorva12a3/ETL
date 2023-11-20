import React, { useState } from 'react';
import { Link, Navigate, Outlet } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  const [loginStatus, setLoginStatus] = useState(true);

  const handleLogout = () => {
    sessionStorage.clear();
    setLoginStatus(false);
  };

  if (loginStatus === false) {
    return <Navigate to="/" />;
  }
//wn the user scrolls down more than 20 pixels, it adds a "scrolled" class to the navbar, triggering corresponding styling changes.
// Wn the user scrolls back to the top, the "scrolled" class is removed.
  const handleScroll = () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);

  return (
    <>
      <nav className="navbar fixed-top navbar-light navbar-expand-lg opacity-75 p-2 fs-5">
        <div className="container-fluid">
          <a className="navbar-brand" to="/">
            <span className="text-white fs-3">Axis Reconcilio</span>
          </a>
          <button
            className="navbar-toggler bg-light"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon "></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" href="/navbar/home">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link scrollto" href="#services">
                  Our Services
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link scrollto" href="#about">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link scrollto" href="#contact">
                  Contact Us
                </a>
              </li>

              <li className="nav-item">
                <Link className="nav-link " to="/header/fileupload">
                  File Upload
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link " to="/header/report">
                  Reports
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link " to="/header/chart">
                  Chart
                </Link>
              </li> */}


            </ul>
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item ms-auto">
                <button className="nav-link btn btn-light border border-light " data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 text-black " id="staticBackdropLabel">
                Logout
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body text-black">Are you sure you want to Logout?</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-outline-dark btn-dark text-white"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button type="button" className="btn btn-warning" onClick={handleLogout} data-bs-dismiss="modal">
                Yes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
