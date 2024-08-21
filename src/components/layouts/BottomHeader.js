import React from "react";
import { Link } from "react-router-dom";

const BottomHeader = ({ isAuthenticated, numberWishlist }) => {
  return (
    <section className="bottom-header container-fluid">
      <div className="d-flex align-items-center justify-content-between">
        <a
          href="https://ownerportal.rmscloud.com/Login?clientId=15111#"
          target={"_blank"}
          className="header-btn btn-border"
        >
          Owner's Login
        </a>
        <div className="mr-2">
          {!isAuthenticated ? (
            <Link to="#" className="userLogin">
              <i className="far fa-user" />
              <ul className="submenu">
                <li className="menu-item">
                  <Link to="/login">Login</Link>
                </li>
                <li className="menu-item">
                  <Link to="/register">Register</Link>
                </li>
              </ul>
            </Link>
          ) : (
            <Link to="/account" className="userLogin">
              <i className="far fa-user" />
              {/* <ul className="submenu">
                <li className="menu-item">
                  <Link to="/account">Account</Link>
                </li>
              </ul> */}
            </Link>
          )}
          <Link to="/saved" className="heartIcon">
            <i className="far fa-heart"></i>
            <p className="item-count">{numberWishlist}</p>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BottomHeader;
