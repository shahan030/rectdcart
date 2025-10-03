import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchProduct } from "../Redux/silce/productSlice";

const Header = ({ insdeHome }) => {
  const dispatch = useDispatch();

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
           <i class="fa-solid fa-cart-shopping ms-2"></i> Daily Cart
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor01"
            aria-controls="navbarColor01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item mt-1 me-2">
                <Link className="nav-link p-0" to="/">
                  <button className="btn btn-outline-light">Home</button>
                </Link>
              </li>
              <li className="nav-item mt-1">
                <Link className="nav-link p-0" to="/dashbord">
                  <button className="btn btn-outline-light">Add Cart</button>
                </Link>
              </li>
            </ul>

            {insdeHome && (
              <form className="d-flex mt-1">
                <input
                  onChange={(e) =>
                    dispatch(searchProduct(e.target.value.toLowerCase()))
                  }
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
              </form>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
