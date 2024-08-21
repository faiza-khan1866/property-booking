import React, { useEffect } from "react";
import ReactDOMServer from "react-dom/server";
import { useState } from "react";
import { API } from "../../../http/API";
import MySwalFire from "../../utils/MySwalFire";
import { useSelector } from "react-redux";
import { ClearCart } from "../../../actions";
import { useDispatch } from "react-redux";
import moment from "moment";
import { toast } from "react-toastify";
import dummyimg from "../../../assets/dummyimg.webp";

const BookingSummary = ({
  xauthtoken,
  isAuthenticated,
  userId,
  billingDetails,
  isFormValid,
}) => {
  const [paymentOption, setPaymentOption] = useState();
  const [loading, setLoading] = useState(false);
  const cart = useSelector((state) => state?._todoProperties?.Carts);
  let pricePerNight = cart?.[0]?.category?.rate;
  const dispatch = useDispatch();
  const dateCheckInOut = useSelector(
    (state) => state?._todoProperties?.CheckDate
  );
  const finalRate = useSelector((state) => state?._todoProperties?.finalRate);
  //Calculate Base Rate from RMS
  const totalAmount = finalRate?.baseRate + finalRate?.baseRateTax;
  // Calculate 3% of the Base Tax
  const bankTax = totalAmount * 0.03;
  // Calculate the total amount
  const finalAmount = totalAmount + bankTax;

  const tourismFee = useSelector((state) => state?._todoProperties?.tourismFee);

  // Find Tourism Dirham object
  const tourismDirham = tourismFee?.find((item) =>
    item.name.includes("Tourism Dirham")
  );
  // Extract numeric part from the name
  const tourismVal = tourismDirham ? tourismDirham?.name?.match(/\d+/) : null;

  const rateIds = useSelector((state) => state?._todoProperties?.rateIds);

  const displayRates = finalRate?.rateBreakdown?.map((element) => (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "1rem",
      }}
    >
      <p>{moment(element?.theDate).format("LL")}</p>
      <p>
        AED {Number.parseFloat(element?.totalRate).toFixed(2)}
        {/* {new Intl.NumberFormat().format(element?.totalRate)} */}
      </p>
    </div>
  ));

  const togglePopup = (index) => {
    if (index == 1) {
      const displayRatesHtml = ReactDOMServer.renderToString(displayRates);
      MySwalFire(
        {
          title: `<p style="font-weight:bold; border-bottom: 1px solid #ccc; padding-bottom:0.5rem">Base Price Breakdown</p>`,
          html: `${displayRatesHtml}
          <div style="display:flex; justify-content:space-between; align-items:center; border-top: 1px solid #ccc; padding:1rem 0">
          <p style="font-weight:bold">Total Base Price</p><p style="font-weight:bold">AED ${Number.parseFloat(
            finalRate?.baseRate
          ).toFixed(2)}</p>
          </div>
            `,
          showCloseButton: true,
          showConfirmButton: false,
        },
        true
      );
    } else if (index == 2) {
      MySwalFire(
        {
          title:
            "<p>Taxes on accommodation such as VAT, Booking Fee & Tourism Fee.</p>",
          showCloseButton: true,
          showConfirmButton: false,
        },
        true
      );
    }
  };

  let arrivalDate = dateCheckInOut?.arrivalDate;
  let departureDate = dateCheckInOut?.departureDate;

  let totalStay = "";

  if (arrivalDate && departureDate) {
    //calculate total stay
    let date1 = moment(arrivalDate);
    let date2 = moment(departureDate);
    totalStay = date2.diff(date1, "days") + 1;
  }

  useEffect(() => {
    if (window?.location?.search?.split("status=")[1] == "success") {
      toast.success("Thank you! Your booking is confirmed.");
      dispatch(ClearCart());
    } else if (window?.location?.search?.split("status=")[1] == "failed") {
      toast.error("Please try again later! Your transaction was unsuccessful.");
    }
  }, [window?.location?.search]);

  let room = [];
  cart.map((acc) => {
    room.push({
      room_id: acc?.id,
      // rate: finalRate?.firstNightRate,
      rate: Number.parseFloat(
        finalRate?.rateBreakdown?.[0]?.baseRateAmount
      ).toFixed(2),
      guest_name: acc?.GuestName,
      last_name: acc?.GuestLastName,
      guest_mobile: acc?.GuestPhone,
      guest_email: acc?.GuestEmail,
      rate_type_id:
        totalStay && totalStay < 7
          ? rateIds?.filter((x) => x?.id)[1]?.id
          : totalStay && totalStay >= 7 && totalStay < 30
          ? rateIds?.filter((x) => x?.id)[2]?.id
          : totalStay &&
            totalStay >= 30 &&
            rateIds?.filter((x) => x?.id)[3]?.id,
      rate_name:
        totalStay && totalStay < 7
          ? rateIds?.filter((x) => x?.name)[1]?.name
          : totalStay && totalStay >= 7 && totalStay < 30
          ? rateIds?.filter((x) => x?.name)[2]?.name
          : totalStay &&
            totalStay >= 30 &&
            rateIds?.filter((x) => x?.name)[3]?.name,
    });
  });

  // const cartTotal = () => {
  //   return cart?.reduce(function (total, item) {
  //     return   total + (item.quantity || 1) * item.price;
  //   }, 0);
  // };

  const handleSubmit = async () => {
    const payload = {
      user_id: userId,
      booking_for: billingDetails?.booking_for,
      adult: cart[0]?.GuestAdults,
      children: cart[0]?.GuestChildren,
      check_in: arrivalDate
        ? moment(arrivalDate).format("YYYY-MM-DD HH:mm:ss")
        : "",
      check_out: departureDate
        ? moment(departureDate).format("YYYY-MM-DD HH:mm:ss")
        : "",
      estimated_arrival_time: billingDetails?.estimated_arrival_time,
      notes: billingDetails?.special_notes,
      amount: Number.parseFloat(finalAmount).toFixed(2),
      room,
      billing_address: {
        name: billingDetails?.name,
        email: billingDetails?.email,
        phone_number: billingDetails?.phone_number,
        address: billingDetails?.address,
        country: billingDetails?.country,
        state: billingDetails?.state,
        city: billingDetails?.city,
        zip_code: billingDetails?.zip_code,
      },
    };
    if (!isAuthenticated) {
      toast.info("Please Login to checkout.");
    } else if (!isFormValid) {
      toast.info("Please Fill the Marked * Fields.");
    } else if (!paymentOption) {
      toast.info("Please Select a Payment Option.");
    } else if (!arrivalDate && !departureDate) {
      toast.info("Please Enter Check-in & Check-out Dates.");
    } else if (isAuthenticated) {
      setLoading(true);
      await API.post("/auth/booking", payload, {
        headers: {
          Authorization: `Bearer ${xauthtoken}`,
        },
      })
        .then((response) => {
          setLoading(false);
          window.location.replace(response?.data);
        })
        .catch((err) => {
          setLoading(false);
          toast.error("Something went wrong!");
          console.log(err);
        });
    }
  };

  return (
    <div className="order_summary_area">
      <h3>
        Booking <span>Summary</span>
      </h3>
      <div className="cart_subtotal">
        <p>Check-in</p>
        <p className="cart_amount">
          {arrivalDate ? moment(arrivalDate).format("LL") : "No date selected"}
        </p>
      </div>
      <div className="cart_subtotal">
        <p>Check-out</p>
        <p className="cart_amount">
          {departureDate
            ? moment(departureDate).format("LL")
            : "No date selected"}
        </p>
      </div>
      {totalStay && (
        <div className="cart_subtotal">
          <p>Total length of stay:</p>
          <p className="cart_amount">
            {totalStay} {totalStay > 1 ? "nights" : "night"}
          </p>
        </div>
      )}
      <div className="table-responsive order_table">
        <table className="table">
          <thead>
            <tr>
              <th colSpan={2}>You Selected</th>
            </tr>
          </thead>
          <tbody>
            {cart?.map((x, i) => (
              <tr key={i}>
                <td colSpan={2}>
                  <div className="category_div">
                    <div className="row">
                      <div className="col">
                        <img
                          src={
                            x?.category?.image ? x?.category?.image : dummyimg
                          }
                          alt="image"
                          className="img-fluid"
                        />
                      </div>
                      <div className="col pl-0">
                        <p className="cat_title">
                          {x?.category?.short_description}
                        </p>
                        {x?.category?.rate && (
                          <p className="price">
                            AED{" "}
                            {Number.parseFloat(x?.category?.rate).toFixed(2)} /
                            night
                          </p>
                        )}
                        <div className="room_div">
                          <p>Room Type</p>
                          <p>{x?.title}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th
                onClick={() => togglePopup(1)}
                style={{
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                <i className="far fa-info-circle"></i> AED {pricePerNight} x{" "}
                {totalStay} {totalStay > 1 ? "nights" : "night"}
              </th>
              <td className="product-subtotal">
                AED {Number.parseFloat(finalRate?.baseRate).toFixed(2)}
                {/* {new Intl.NumberFormat().format(finalRate?.baseRate)} */}
              </td>
            </tr>
            <tr>
              <th>Tourism Dirham</th>
              <td className="product-subtotal">
                AED {tourismVal} x {totalStay}{" "}
                {totalStay > 1 ? "nights" : "night"}
              </td>
            </tr>
            <tr>
              <th>VAT</th>
              <td className="product-subtotal">5%</td>
            </tr>
            <tr>
              <th>Booking Fee</th>
              <td className="product-subtotal">5%</td>
            </tr>
            <tr>
              <th
                onClick={() => togglePopup(2)}
                style={{
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                <i className="far fa-info-circle"></i> Total Fee
              </th>
              <td className="product-subtotal">
                AED {Number.parseFloat(finalRate?.baseRateTax).toFixed(2)}
                {/* {new Intl.NumberFormat().format(finalRate?.baseRateTax)} */}
              </td>
            </tr>
            <tr>
              <th>Bank Charges</th>
              <td className="product-subtotal">3%</td>
            </tr>
            <tr>
              <th>Total Price</th>
              <td className="product-subtotal">
                AED {Number.parseFloat(finalAmount).toFixed(2)}
                {/* {new Intl.NumberFormat().format(finalAmount)} */}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      {isFormValid ? (
        <>
          <h3 style={{ fontSize: "20px" }}>
            Payment <span>Method</span>
          </h3>

          <div className="heading_payment">
            <input
              type="radio"
              name="payment"
              id="NetworkPaymentOption"
              onClick={() => setPaymentOption("NetworkPay")}
            />
            <label htmlFor="NetworkPaymentOption">
              <img
                src={process.env.PUBLIC_URL + "/" + "assets/img/icon/valid.png"}
                alt="img"
                style={{ width: "30px", marginRight: "0.3rem" }}
              />
              Network
            </label>
          </div>
        </>
      ) : (
        "Please fill the required fields"
      )}
      {loading ? (
        <div
          className="loader"
          style={{
            borderTopColor: "#00000040",
            borderRightColor: "#00000040",
            borderBottomColor: "#00000040",
            borderLeftColor: "#0070bb",
            width: "sm" ? "6em" : "md" ? "10em" : "10em",
            height: "sm" ? "6em" : "md" ? "10em" : "10em",
          }}
        />
      ) : (
        <button className="main-btn btn-filled" onClick={handleSubmit}>
          Confirm Booking
        </button>
      )}
    </div>
  );
};

export default BookingSummary;
