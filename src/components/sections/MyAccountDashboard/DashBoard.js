import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { API } from "../../../http/API";

const DashBoard = ({ xauthtoken }) => {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    let header = {
      headers: {
        Authorization: `Bearer ${xauthtoken}`,
      },
    };
    API.get(`/auth/me`, header)
      .then((response) => {
        localStorage.setItem("userData", JSON.stringify(response?.data));
        setUserData(response?.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="myaccount-content">
        <h4 className="title">
          Hello{" "}
          <span>
            {userData?.first_name} {userData?.last_name}.
          </span>
        </h4>
        <p>
          From your account dashboard you can view your{" "}
          <Link to="/account/bookings">recent bookings</Link>,{" "}
          <Link to="/saved">saved properties</Link>, and{" "}
          <Link to="/account/reset-password">reset your password</Link> and{" "}
          <Link to="/account/account-details">edit your account details</Link>.
        </p>
      </div>
    </>
  );
};

export default DashBoard;
