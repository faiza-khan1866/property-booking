import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { API } from "../../../http/API";

const BookingDetail = ({ xauthtoken }) => {
  const { id } = useParams();

  const [singleBookingDetails, setSingleBookingDetails] = useState();

  useEffect(() => {
    API.get(`/auth/booking-detail/${id}`, {
      headers: {
        Authorization: `Bearer ${xauthtoken}`,
      },
    }).then((response) => {
      setSingleBookingDetails(response?.data);
    });
  }, [id]);

  return (
    <div className="container pt-60 pb-60">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-12 col-sm-12 col-12">
          <div className="order_view_area table-responsive">
            <h2 className="title">
              Booking <span>Details</span>
            </h2>
            <table className="user-detail">
              <tbody>
                <tr>
                  <td colSpan="2">User Name:</td>
                  <td colSpan="3">
                    <b>
                      {singleBookingDetails?.user?.first_name}{" "}
                      {singleBookingDetails?.user?.last_name}
                    </b>
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">User Email:</td>
                  <td colSpan="3">
                    <b>{singleBookingDetails?.user?.email}</b>
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">User Mobile:</td>
                  <td colSpan="3">
                    <b>{singleBookingDetails?.user?.mobile}</b>
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">Check-in Date:</td>
                  <td colSpan="3">
                    <b>
                      {new Date(
                        singleBookingDetails?.check_in
                      ).toLocaleDateString()}
                    </b>
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">Check-out Date:</td>
                  <td colSpan="3">
                    <b>
                      {new Date(
                        singleBookingDetails?.check_out
                      ).toLocaleDateString()}
                    </b>
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">Estimated Arrival Time:</td>
                  <td colSpan="3">
                    <b>{singleBookingDetails?.estimated_arrival_time}</b>
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">Booking For:</td>
                  <td colSpan="3">
                    <b>
                      {singleBookingDetails?.booking_for == 1
                        ? "I'm booking for someone else"
                        : "I'm the main guest "}
                    </b>
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">No. of Rooms:</td>
                  <td colSpan="3">
                    <b>{singleBookingDetails?.no_of_rooms}</b>
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">No. of Guests:</td>
                  <td colSpan="3">
                    <b>{singleBookingDetails?.no_of_guest}</b>
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">No. of Adults:</td>
                  <td colSpan="3">
                    <b>{singleBookingDetails?.adult}</b>
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">No. of Children:</td>
                  <td colSpan="3">
                    <b>{singleBookingDetails?.children}</b>
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">Special Notes:</td>
                  <td colSpan="3">
                    <b>{singleBookingDetails?.notes}</b>
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">Total Amount:</td>
                  <td colSpan="3">
                    <b>AED {singleBookingDetails?.amount}</b>
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">Payment Status:</td>
                  <td colSpan="3">
                    <b
                      className={
                        singleBookingDetails?.payment_status === "SUCCESS"
                          ? "text-success"
                          : singleBookingDetails?.payment_status === "PENDING"
                          ? "text-warning"
                          : "text-danger"
                      }
                    >
                      {singleBookingDetails?.payment_status === "SUCCESS"
                        ? "Payment Success"
                        : singleBookingDetails?.payment_status === "PENDING"
                        ? "Payment Pending"
                        : "Payment Canceled"}
                    </b>
                  </td>
                </tr>
              </tbody>
            </table>
            <h2 className="title">
              Billing <span>Details</span>
            </h2>
            <table className="user-detail">
              <tbody>
                <tr>
                  <td colSpan="2">Address</td>
                  <td colSpan="3">
                    <b>{singleBookingDetails?.billing_address?.address}</b>
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">Phone Number:</td>
                  <td colSpan="3">
                    <b>{singleBookingDetails?.billing_address?.phone_number}</b>
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">Country:</td>
                  <td colSpan="3">
                    <b>{singleBookingDetails?.billing_address?.country}</b>
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">State:</td>
                  <td colSpan="3">
                    <b>{singleBookingDetails?.billing_address?.state}</b>
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">Zip Code:</td>
                  <td colSpan="3">
                    <b>{singleBookingDetails?.billing_address?.zip_code}</b>
                  </td>
                </tr>
              </tbody>
            </table>
            <table className="order-detail">
              <tbody>
                <tr>
                  <th>Rate</th>
                  <th>Guests Info.</th>
                </tr>
                {singleBookingDetails?.booking_details?.map((item, index) => (
                  <tr key={index}>
                    <td>AED {item?.rate}</td>
                    <td>
                      {item?.guests?.map((x, i) => (
                        <>
                          <p>
                            {x?.first_name} {x?.last_name}
                          </p>

                          <p>{x?.email}</p>
                          <p>{x?.mobile}</p>
                        </>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Link className="main-btn btn-filled" to={"/account/bookings"}>
              <i className="fa fa-arrow-left mr-2"></i>Go Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetail;
