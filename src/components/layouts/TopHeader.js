import React from "react";
import { Link } from "react-router-dom";

const TopHeader = () => {
  return (
    <section className="topheader-section container-fluid">
      <span>Welcome !</span>
      <Link to="#">
        <i className="fab fa-facebook-f" />
      </Link>
      <Link to="#">
        <i className="fab fa-instagram" />
      </Link>
      <Link to="#">
        <i className="fab fa-linkedin" />
      </Link>
      <Link to="#">
        <i className="fab fa-whatsapp" />
      </Link>
      <a href="tel:+3751234568" className="phone">
        <i className="fa fa-phone" /> +375 1234568
      </a>
    </section>
  );
};

export default TopHeader;
