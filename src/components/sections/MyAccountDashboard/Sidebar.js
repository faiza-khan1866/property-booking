import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { userLogout } from "../../../actions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

// import { API } from "../../http/API";

const Sidebar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const cartData = useSelector((state) => state?._todoProperties?.Carts);

  const logout = () => {
    // API.post(`/auth/logout`, {
    //   headers: {
    //     Authorization: `Bearer ${xauthtoken}`,
    //   },
    // })
    //   .then((response) => {
    toast.success("Logout Successfully!");
    localStorage.removeItem("userData");
    dispatch(userLogout());
    navigate(`/login`);
    // })
    // .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="col-sm-12 col-md-12 col-lg-3">
        <div className="dashboard_tab_button">
          <ul role="tablist" className="nav flex-column dashboard-list">
            <li>
              <Link
                to="/account"
                className={location.pathname === "/account" ? "active" : null}
              >
                <i className="far fa-tachometer" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/account/bookings"
                className={
                  location.pathname === "/account/bookings" ? "active" : null
                }
              >
                <i className="far fa-cart-arrow-down" />
                Bookings
              </Link>
            </li>
            {cartData?.length > 0 && (
              <li>
                <Link
                  to="/bookings"
                  className={
                    location.pathname === "/bookings" ? "active" : null
                  }
                >
                  <i className="far fa-cart-arrow-down" />
                  Pending Booking
                </Link>
              </li>
            )}

            <li>
              <Link
                to="/saved"
                className={location.pathname === "/saved" ? "active" : null}
              >
                <i className="far fa-heart" />
                Saved
              </Link>
            </li>
            <li>
              <Link
                to="/account/account-details"
                className={
                  location.pathname === "/account/account-details"
                    ? "active"
                    : null
                }
              >
                <i className="far fa-user" />
                Account details
              </Link>
            </li>
            <li>
              <Link
                to="/account/reset-password"
                className={
                  location.pathname === "/account/reset-password"
                    ? "active"
                    : null
                }
              >
                <i className="far fa-cloud-download" />
                Reset Password
              </Link>
            </li>
            <li>
              <Link
                to="/#!"
                onClick={(e) => {
                  e.preventDefault();
                  logout();
                }}
              >
                <i className="far fa-sign-out" />
                logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
