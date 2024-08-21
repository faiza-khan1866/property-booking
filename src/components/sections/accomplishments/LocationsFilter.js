import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";

const LocationsFilter = () => {
  const [arrivalDate, setArrivalDate] = useState(new Date());
  const [departureDate, setDepartureDate] = useState(
    new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000)
  );

  const [count, setCount] = useState(1);

  const incNum = () => {
    setCount(count + 1);
  };
  const decNum = () => {
    if (count > 1) {
      setCount(count - 1);
    } else {
      toast.info("Minimun Quantity Reached.");
      setCount(1);
    }
  };

  return (
    <div className="location-form-inner">
      <form action="#">
        <div className="row align-items-center">
          <div className="col-lg-3 col-md-6">
            <div className="inputs-filed">
              <div className="icon">
                <i className="fal fa-calendar-alt" />
              </div>
              <DatePicker
                selected={arrivalDate}
                onChange={(date) => setArrivalDate(date)}
                placeholderText="Check-in"
                selectsStart
                startDate={arrivalDate}
                minDate={arrivalDate}
              />
            </div>
          </div>
          <div className="col-lg-2 rightArrow">
            <i className="far fa-arrow-alt-right"></i>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="inputs-filed">
              <div className="icon">
                <i className="fal fa-calendar-alt" />
              </div>
              <DatePicker
                selected={departureDate}
                onChange={(date) => setDepartureDate(date)}
                placeholderText="Departure Date"
                selectsEnd
                startDate={arrivalDate}
                endDate={departureDate}
                minDate={arrivalDate}
              />
            </div>
          </div>
          <div className="col-lg-2 col-md-4">
            <div className="inputs-filed d-flex justify-content-center align-items-center guestdiv">
              <button type="button" className="incbtns" onClick={decNum}>
                <i className="fal fa-minus-circle"></i>
              </button>
              <input
                type="text"
                placeholder="Guests"
                className="guestInput"
                value={count}
                readOnly
              />
              <button type="button" className="incbtns" onClick={incNum}>
                <i className="fal fa-plus-circle"></i>
              </button>
            </div>
          </div>
          <div className="col-lg-2 col-md-12">
            <div className="inputs-filed">
              <button type="submit" className="searchBtn">
                Search
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LocationsFilter;
