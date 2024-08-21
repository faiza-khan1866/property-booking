import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
// import { API } from "../../http/API";

const OrderTracking = ({ xauthtoken }) => {
  const { id } = useParams();
  // const [trackingprocess, setTrackingprocess] = useState();

  // useEffect(() => {

  //   let header = {
  //     headers: {
  //       Authorization: `Bearer ${xauthtoken}`,
  //     },
  //   };
  //   API.get(`/auth/track-order/${id}`, header)
  //     .then((response) => {
  //       setTrackingprocess(response?.data?.status);
  //     })
  //     .catch((err) => console.log(err));
  // }, [id]);

  const trackingprocess = {};
  return (
    <>
      <section className="order_tracking pt-60 pb-60">
        <div className="container">
          <div className="card">
            <div className="p-4 card-header">Tracking Order No - {id}</div>
            <div className="card-body">
              {trackingprocess === "ORDERPLACED" && (
                <div className="track_order">
                  <p>Order Placed, Your Order will be updated Soon</p>
                </div>
              )}
              {trackingprocess === "ORDERCANCELLED" && (
                <div className="order_placed_note">
                  <p>No Record Found Please Try Again</p>
                </div>
              )}
              <div className="steps d-flex flex-wrap flex-sm-nowrap justify-content-between mt-3 padding-top-2x padding-bottom-1x">
                <div
                  className={`step ${
                    trackingprocess === "ORDERCONFIRMED"
                      ? "completed"
                      : trackingprocess === "ORDERDISPATCHED"
                      ? "completed"
                      : trackingprocess === "ORDERDELIVERED"
                      ? "completed"
                      : ""
                  }`}
                >
                  <div className="step-icon-wrap">
                    <div className="step-icon">
                      <i className="far fa-shopping-cart"></i>
                    </div>
                  </div>
                  <h4 className="step-title">Order Confirmed</h4>
                </div>
                <div
                  className={`step ${
                    trackingprocess === "ORDERDISPATCHED"
                      ? "completed"
                      : trackingprocess === "ORDERDELIVERED"
                      ? "completed"
                      : ""
                  }`}
                >
                  <div className="step-icon-wrap">
                    <div className="step-icon">
                      <i className="far fa-car"></i>
                    </div>
                  </div>
                  <h4 className="step-title">Product Dispatched</h4>
                </div>
                <div
                  className={`step ${
                    trackingprocess === "ORDERDELIVERED" ? "completed" : ""
                  }`}
                >
                  <div className="step-icon-wrap">
                    <div className="step-icon">
                      <i className="far fa-home"></i>
                    </div>
                  </div>
                  <h4 className="step-title">Product Delivered</h4>
                </div>
              </div>
            </div>
          </div>
          <Link className="main-btn btn-filled mt-5" to="/account">
            <i className="fa fa-arrow-left"></i> Back to your account
          </Link>
        </div>
      </section>
    </>
  );
};

export default OrderTracking;
