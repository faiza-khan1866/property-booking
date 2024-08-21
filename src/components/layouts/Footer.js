import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="footer-two">
        <div className="footer-widget-area pt-60 pb-60">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 col-md-12 col-sm-12">
                {/* Site Info Widget */}
                <div className="widget site-info-widget">
                  <div className="footer-logo mb-30">
                    <img
                      src={
                        process.env.PUBLIC_URL +
                        "/" +
                        "assets/img/footer-logo.webp"
                      }
                      height={111}
                      width={195}
                      alt="logo"
                      className="img-fluid"
                      loading="lazy"
                    />
                  </div>
                  <p>
                    Carpe Diem Lifestyle is the leading vacation home operator
                    in Dubai offering a one-stop solution to investors and
                    property owners looking to maximize their returns with our
                    unique portfolio. The focus of our business is on increasing
                    the return on real estate purchases through investing in
                    quality holiday homes that are managed by our carefully
                    selected team with exceptional backgrounds and experience.
                  </p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12">
                {/* Nav Widget */}
                <div className="widget nav-widget footer_nav">
                  <div>
                    <h4 className="widget-title">Know More</h4>
                    <ul>
                      <li>
                        <Link to="/properties">Book your Stay</Link>
                      </li>
                      <li>
                        <Link to="/about">About Us</Link>
                      </li>
                      <li>
                        <Link to="/faqs">FAQ's</Link>
                      </li>
                      <li>
                        <Link to="/contact">Contact Us</Link>
                      </li>
                      <li>
                        <Link to="/blogs">Blogs</Link>
                      </li>
                      <li>
                        <Link to="/media">Media & News</Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-12">
                {/* Contact Widget */}
                <div className="widget nav-widget footer_nav">
                  <div>
                    <h4 className="widget-title">Information</h4>
                    <ul>
                      <li>
                        <Link to="/refund-policy">Refund Policy</Link>
                      </li>
                      <li>
                        <Link to="/privacy-policy">Privacy Policy</Link>
                      </li>
                      <li>
                        <Link to="/terms-and-conditions">
                          Terms & Conditions
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div className="social-links mt-20">
                    <a
                      href="https://www.facebook.com/Carpediemdxb"
                      target="_blank"
                    >
                      <i className="fab fa-facebook-f" />
                    </a>
                    <a
                      href="https://www.instagram.com/carpediemdxb/"
                      target="_blank"
                    >
                      <i className="fab fa-instagram" />
                    </a>
                    <a
                      href="https://www.linkedin.com/company/carpe-diem-lifestyle-holiday-homes-l-l-c/"
                      target="_blank"
                    >
                      <i className="fab fa-linkedin" />
                    </a>
                    <a href="https://wa.me/+971524735565" target="_blank">
                      <i className="fab fa-whatsapp" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright-area pb-10">
          <div className="container">
            <div className="copyright-text d-flex justify-content-between align-items-center">
              <div>
                © 2019 - 2020 <a href="/">Carpediem Dubai</a>
              </div>
              <div>
                Designed and Managed by{" "}
                <a href="https://www.prism-me.com/" target={"_blank"}>
                  Prism Digital
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};
export default Footer;
