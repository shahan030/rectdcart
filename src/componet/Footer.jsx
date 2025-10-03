import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-5 mt-5">
      <div className="container">
        <div className="row gy-4 text-start">
          {/* Intro Section */}
          <div className="col-12 col-md-6 col-lg-3">
            <h5 className="fw-bold">
              <i className="fa-solid fa-truck-fast me-2"></i> Daily Cart
            </h5>
            <p>
              Designed and built with all the love in the world by the D cart team with the help of our contributors.
            </p>
            <p>Code licensed Dcart market, docs CC BY 3.0.</p>
            <p>Currently v5.3.2.</p>
          </div>

          {/* Links Section */}
          <div className="col-12 col-md-3 col-lg-2">
            <h5 className="fw-bold">Links</h5>
            <Link to="/" className="text-white text-decoration-none d-block">Home</Link>
            <Link to="/dasbord" className="text-white text-decoration-none d-block">Dashbord</Link>
            <Link to="/cart" className="text-white text-decoration-none d-block">Cart</Link>
          </div>

          {/* Guides Section */}
          <div className="col-12 col-md-3 col-lg-2">
            <h5 className="fw-bold">Guides</h5>
            <a href="https://react.dev/" className="text-white text-decoration-none d-block" target="_blank" rel="noreferrer">Privacy Policy</a>
            <a href="https://react-bootstrap.github.io/" className="text-white text-decoration-none d-block" target="_blank" rel="noreferrer">Terms</a>
            <a href="https://reactrouter.com/en/main" className="text-white text-decoration-none d-block" target="_blank" rel="noreferrer">Contact</a>
          </div>

          {/* Contact Section */}
          <div className="col-12 col-md-6 col-lg-5">
            <h5 className="fw-bold">Contact Us</h5>
            <div className="d-flex flex-column flex-sm-row">
              <input
                placeholder="Enter your email"
                type="text"
                className="form-control me-sm-2 mb-2 mb-sm-0"
              />
            </div>
           
          </div>
        </div>

        <hr className="bg-light mt-4" />
        <p className="text-center mb-0">
          &copy; Dcart store.All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
