import React, { useEffect } from "react";
import ReactDOMServer from "react-dom/server";
import { Link } from "react-router-dom";
import MySwalFire from "../../utils/MySwalFire";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
  actFetchFinalRateRequest,
  actFetchTourismFeeRequest,
} from "../../../actions";
import PulseLoader from "react-spinners/PulseLoader";
import moment from "moment";

const BookingDetails = (props) => {
  const dispatch = useDispatch();
  const finalRate = useSelector((state) => state?._todoProperties?.finalRate);
  const tourismFee = useSelector((state) => state?._todoProperties?.tourismFee);

  // Find Tourism Dirham object
  const tourismDirham = tourismFee?.find((item) =>
    item.name.includes("Tourism Dirham")
  );
  // Extract numeric part from the name
  const tourismVal = tourismDirham ? tourismDirham?.name?.match(/\d+/) : null;

  const loader = useSelector((state) => state?._todoProperties?.loader);

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
  const rateIds = useSelector((state) => state?._todoProperties?.rateIds);

  let arrivalDate = props?.CheckingDate?.arrivalDate;
  let departureDate = props?.CheckingDate?.departureDate;

  let totalStay = "";

  if (arrivalDate && departureDate) {
    //calculate total stay
    let date1 = moment(arrivalDate);
    let date2 = moment(departureDate);
    totalStay = date2.diff(date1, "days") + 1;
  }

  // get final rates

  let categoryId = props?.cart?.filter((x) => x?.category?.id)[0]?.category?.id;
  let areaId = props?.cart?.filter((x) => x?.id)[0]?.id;
  let propertyId = props?.cart?.filter((x) => x?.propertyId)[0]?.propertyId;
  let pricePerNight = props?.cart?.[0]?.category?.rate;

  useEffect(() => {
    dispatch(actFetchTourismFeeRequest(categoryId));
    dispatch(
      actFetchFinalRateRequest(
        areaId,
        categoryId,
        departureDate,
        arrivalDate,
        propertyId,
        rateIds,
        totalStay
      )
    );
  }, []);

  return (
    <div className="cart_total_area">
      <h3>
        Booking <span>Summary</span>
      </h3>
      <div className="cart_total_inner">
        <div className="cart_subtotal">
          <p>Check-in</p>
          <p className="cart_amount">
            {arrivalDate
              ? moment(arrivalDate).format("LL")
              : "No date selected"}
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
        <div className="cart_subtotal">
          <p
            onClick={() => togglePopup(1)}
            style={{
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            <i className="far fa-info-circle"></i> AED {pricePerNight} x {totalStay}{" "}
            {totalStay > 1 ? "nights" : "night"}
          </p>
          {loader ? (
            <PulseLoader color="#2484c4" size={10} />
          ) : (
            <p>
              AED {Number.parseFloat(finalRate?.baseRate).toFixed(2)}
              {/* {new Intl.NumberFormat().format(finalRate?.baseRate)} */}
            </p>
          )}
        </div>
        <div className="cart_subtotal">
          <p>Tourism Dirham</p>
          {loader ? (
            <PulseLoader color="#2484c4" size={10} />
          ) : (
            <p>
              AED {tourismVal} x {totalStay}{" "}
              {totalStay > 1 ? "nights" : "night"}
            </p>
          )}
        </div>
        <div className="cart_subtotal">
          <p>VAT</p>
          <p>5%</p>
        </div>
        <div className="cart_subtotal">
          <p>Booking Fee</p>
          <p>5%</p>
        </div>

        <div className="cart_subtotal">
          <p
            onClick={() => togglePopup(2)}
            style={{
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            <i className="far fa-info-circle"></i> Total Fee
          </p>
          {loader ? (
            <PulseLoader color="#2484c4" size={10} />
          ) : (
            <p>
              AED {Number.parseFloat(finalRate?.baseRateTax).toFixed(2)}
              {/* {new Intl.NumberFormat().format(finalRate?.baseRateTax)} */}
            </p>
          )}
        </div>
        <div className="cart_subtotal">
          <p>Total Price</p>
          {loader ? (
            <PulseLoader color="#2484c4" size={10} />
          ) : (
            <p>
              AED{" "}
              {Number.parseFloat(
                finalRate?.baseRate + finalRate?.baseRateTax
              ).toFixed(2)}
              {/* {new Intl.NumberFormat().format(
                finalRate?.baseRate + finalRate?.baseRateTax
              )} */}
            </p>
          )}
        </div>

        <Link
          to={props.CheckGuestName ? `/checkout` : "#"}
          className="main-btn btn-filled"
          onClick={() => {
            !props.CheckGuestName &&
              toast.info("Please fill Guest First Name & Last Name.");
          }}
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default BookingDetails;
