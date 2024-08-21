import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const PropertAvailabilitySearch = () => {
  const [arrivalDate, setArrivalDate] = useState(new Date());
  const [departureDate, setDepartureDate] = useState(
    new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000)
  );

  return (
    <div className="property_availability_search">
      <form action="#">
        <div className="row align-items-center">
          <div className="col-lg-4 col-md-6 colBottomSpace">
            <div className="inputs-filed">
              <div className="icon">
                <i className="far fa-map-marker-alt" />
              </div>
              <select name="location" id="location">
                <option>Select Your Location</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={4}>4</option>
                <option value={8}>8</option>
              </select>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 colBottomSpace">
            <div className="inputs-filed">
              <div className="icon">
                <i className="fal fa-calendar-alt" />
              </div>
              <DatePicker
                selected={arrivalDate}
                onChange={(date) => setArrivalDate(date)}
                placeholderText="Arrival Date"
                selectsStart
                startDate={arrivalDate}
                minDate={arrivalDate}
              />
            </div>
          </div>
          <div className="col-lg-3 col-md-6 colBottomSpace">
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
          {/* <div className="col-12 colBottomSpace">
            <div className="inputs-filed">
              <div className="icon">
                <i className="fal fa-arrow-down" />
              </div>
              <select name="guests" id="guests">
                <option>Guests</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={4}>4</option>
                <option value={8}>8</option>
              </select>
            </div>
          </div> */}
          <div className="col-lg-2 col-md-6">
            <div className="inputs-filed text-center">
              <button type="submit">Search</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PropertAvailabilitySearch;
