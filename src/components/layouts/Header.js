import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import HeaderComponent from "../../helper/Navhelp";
import classNames from "classnames";
import navigationmenu from "../../data/navigation.json";
import BottomHeader from "./BottomHeader";
import { connect } from "react-redux";
import { API } from "../../http/API";
import { GetAllCategoriesEmpty, GetAllNavLink } from "../../actions";
import { QueryCache, QueryClient } from "react-query";
const queryCache = new QueryCache();
const queryClient = new QueryClient();
class Header extends HeaderComponent {
  render() {
    const breakpoint = this.state.isMobile ? "breakpoint-on" : "";
    const hideClass = this.state.isMobile ? "d-none" : "";
    const stickyHeader = this.state.isTop ? "sticky-active" : "";
    const pathname = window?.location?.pathname;
    const numberWishlist = this.props.numberWishlist;
    const navLink = this.props.navLink;
    const isAuthenticated = this.props.isAuthenticated;

    return (
      <>
        {/* {pathname == "/" && <TopHeader />} */}
        {/*====== HEADER START ======*/}
        <BottomHeader
          isAuthenticated={isAuthenticated}
          numberWishlist={numberWishlist}
        />
        <header
          className={`header-absolute sticky-header ${stickyHeader}`}
          onLoad={() => this.props.dispatch2()}
        >
          <div className="container container-custom-one">
            <div
              className={`nav-container d-flex align-items-center justify-content-between ${breakpoint}`}
            >
              {/* Site Logo */}
              <div className="site-logo">
                <Link to="/">
                  <img
                    src={process.env.PUBLIC_URL + "/assets/img/logo.png"}
                    alt="logo"
                    height={87}
                    width={150}
                    className="img-fluid"
                  />
                </Link>
              </div>
              {/* Main Menu */}
              <div
                className={classNames("nav-menu d-lg-flex align-items-center", {
                  "menu-on": this.state.navmethod,
                })}
              >
                {/* Navbar Close Icon */}
                <div className="navbar-close" onClick={this.toggleNav}>
                  {/* <div className="cross-wrap">
                    <span className="top" />
                    <span className="bottom" />
                  </div> */}
                </div>
                {/* Mneu Items */}
                <div className="menu-items">
                  <ul>
                    {navigationmenu.length > 0
                      ? navigationmenu.map((item, i) => (
                          <li
                            key={i}
                            className={`menu-item ${
                              item.child ? "menu-item-has-children" : ""
                            } `}
                            onClick={this.triggerChild}
                          >
                            {item.child ? (
                              <Link
                                className={
                                  pathname
                                    ? item.link == pathname && "active"
                                    : ""
                                }
                              >
                                <Link
                                  style={{ padding: "0", border: "none" }}
                                  to={item.link}
                                >
                                  {item.linkText}
                                </Link>
                                <hr className="btmline" />
                              </Link>
                            ) : (
                              <Link
                                to={item.link}
                                className={
                                  pathname
                                    ? item.link == pathname && "active"
                                    : ""
                                }
                              >
                                {item.linkText}
                                <hr className="btmline" />
                              </Link>
                            )}
                            {/* subChild */}
                            {item.child ? (
                              <ul className="submenu" role="menu">
                                {item.submenu.map((sub_item, i) => (
                                  <li
                                    key={i}
                                    className={`menu-item ${
                                      sub_item.child
                                        ? "menu-item-has-children"
                                        : ""
                                    } `}
                                  >
                                    {sub_item.child ? (
                                      <Link
                                        onClick={(e) => e.preventDefault()}
                                        to="/"
                                      >
                                        {sub_item.linkText}
                                      </Link>
                                    ) : (
                                      <Link
                                        to={sub_item.link}
                                        className={
                                          pathname
                                            ? sub_item.link == pathname &&
                                              "active"
                                            : ""
                                        }
                                      >
                                        {sub_item.linkText}
                                      </Link>
                                    )}
                                    {sub_item.submenu ? (
                                      <ul className="submenu">
                                        {sub_item.submenu.map(
                                          (third_item, i) => (
                                            <li className="menu-item" key={i}>
                                              <Link to={third_item.link}>
                                                {third_item.linkText}
                                              </Link>
                                            </li>
                                          )
                                        )}
                                      </ul>
                                    ) : null}
                                  </li>
                                ))}
                              </ul>
                            ) : null}
                          </li>
                        ))
                      : null}
                    {/* //location */}

                    <li
                      className={
                        "menu-item menu-item-has-children DialogWindow"
                      }
                      onClick={this.triggerChild}
                    >
                      <Link
                        onClick={(e) => e.preventDefault()}
                        className={
                          pathname ? pathname == "/locations" && "active" : ""
                        }
                      >
                        Location
                        <hr className="btmline" />
                      </Link>
                      {/* subChild */}
                      <ul
                        id="locationSubMenu"
                        className="submenu"
                        role="menu"
                        style={{
                          height: "18rem",
                          overflow: "auto",
                        }}
                      >
                        {navLink &&
                          navLink?.map((item, i) => {
                            return (
                              <li
                                key={i}
                                className={`menu-item "menu-item-has-children"  `}
                              >
                                <Link
                                  // onClick={(e) => e.preventDefault()}
                                  onClick={() => this.props.dispatch1()}
                                  to={`/properties/${item.route}`}
                                >
                                  {item.name}
                                </Link>
                              </li>
                            );
                          })}
                      </ul>
                    </li>
                  </ul>
                </div>
                {/* from pushed-item */}
                <div className="nav-pushed-item" />
              </div>
              {/* Header Info Pussed To Menu Wrap */}
              <div className={`nav-push-item ${hideClass}`}>
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
                  <span className="item-count">{numberWishlist}</span>
                </Link>
                <a
                  href="https://ownerportal.rmscloud.com/Login?clientId=15111#"
                  target={"_blank"}
                  className="header-btn btn-border"
                >
                  Owner's Login
                </a>
              </div>
              {/* Navbar Toggler */}

              <div
                className={classNames("navbar-toggler", {
                  active: this.state.navmethod,
                })}
              >
                <div className="d-flex align-items-center">
                  <a
                    href="https://ownerportal.rmscloud.com/Login?clientId=15111#"
                    target={"_blank"}
                    className="header-btn btn-border mr-3"
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
                  <div
                    style={{
                      border: "1px solid #0070bb",
                      padding: "0.3rem 0.3rem 0.5rem 0.3rem",
                    }}
                    onClick={this.toggleNav}
                  >
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/*====== HEADER PART END ======*/}
      </>
    );
  }
}

// export default Header;
const mapStateToProps = (state) => {
  return {
    numberWishlist: state?._todoProperties?.numberWishlist,
    isAuthenticated: state?._todoProperties?.isAuthenticated,
    navLink: state?._todoProperties?.NavLinks,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch1: () => {
      dispatch(GetAllCategoriesEmpty());
    },
    dispatch2: async () => {
      const list = await queryClient.fetchQuery(
        "SearchFilterLocationDropDown",
        () => {
          return API.get(`/location-drop-down`)
            .then((response) => {
              return response.data;
            })
            .catch((err) => {
              console.log(err);
            });
        },
        {
          cache: queryCache,
          keepPreviousData: true,
          staleTime: 3000000,
          cacheTime: 3000000,
        }
      );
      dispatch(GetAllNavLink(list)); // this action is normal dispatch state redux
      // dispatch(FetchNavLocationDropDown()); this action is redux thunk
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Header);
