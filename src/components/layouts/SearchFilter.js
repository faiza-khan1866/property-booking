import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { API } from "../../http/API";
import {
  useNavigate,
  createSearchParams,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetAllCategoriesEmpty, SetCheckDate } from "../../actions";
import { useQuery, QueryCache } from "react-query";
import moment from "moment";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import { toast } from "react-toastify";
import "./SearchFIlter.css";
const SearchFilter = ({ catId }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dateCheckInOut = useSelector(
    (state) => state?._todoProperties.CheckDate
  );
  const [UserSelectedLocation, setUserSelectedLocation] = useState(catId);
  const queryCache = new QueryCache();

  const { isLoading, data } = useQuery(
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

  const [arrivalDate, setArrivalDate] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);

  const CheckDateInput = ({ date, value, onChange }) => (
    <input
      value={value}
      style={{ padding: "0", height: "35px", width: "60px" }}
    />
  );

  const defaultState = {
    propertyId: catId ? data?.find((x) => x?.route == catId)?.id : "",
    roomStatistics: "ignore",
    availabilityFilter: "house",
    dateFrom: "",
    dateTo: "",
  };

  const [formValues, setFormValues] = useState(defaultState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (dateCheckInOut?.arrivalDate) {
      setArrivalDate(new Date(dateCheckInOut?.arrivalDate));
    }

    if (dateCheckInOut?.departureDate) {
      setDepartureDate(new Date(dateCheckInOut?.departureDate));
    } else if (searchParams.get("date_from") && searchParams.get("date_to")) {
      setArrivalDate(new Date(searchParams.get("date_from")));
      setDepartureDate(new Date(searchParams.get("date_to")));
      setFormValues((prev) => ({
        ...prev,
        propertyId: searchParams.get("property_id"),
      }));

      const DateCheckInOut = {
        arrivalDate: searchParams.get("date_from"),
        departureDate: searchParams.get("date_to"),
        LocationId: searchParams.get("property_id"),
      };
      dispatch(SetCheckDate(DateCheckInOut));
    }
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!UserSelectedLocation && !dateCheckInOut.LocationId) {
      toast.info("Enter a location to start searching.");
    } else if (!arrivalDate || !departureDate) {
      // Check if dates are not selected
      toast.info("Please select check-in and check-out dates.");
    } else {
      const DateCheckInOut = {
        arrivalDate: moment(arrivalDate).format(),
        departureDate: moment(departureDate).format(),
        LocationId: dateCheckInOut.LocationId,
      };

      dispatch(SetCheckDate(DateCheckInOut));
      let updatedData = {
        ...formValues,
        dateFrom: moment(arrivalDate).format("YYYY-MM-DD HH:mm:ss"),
        dateTo: moment(departureDate).format("YYYY-MM-DD HH:mm:ss"),
      };
      setLoading(true);

      if (
        parseInt(formValues?.propertyId) !==
        parseInt(searchParams.get("property_id"))
      ) {
        dispatch(GetAllCategoriesEmpty());
        navigate({
          pathname: `/properties/${
            data?.find((x) => x?.id == UserSelectedLocation)?.route
          }`,
          search: createSearchParams({
            date_from: `${updatedData?.dateFrom}`,
            date_to: `${updatedData?.dateTo}`,
            property_id: formValues?.propertyId,
          }).toString(),
        });
      } else {
        navigate({
          search: createSearchParams({
            date_from: `${updatedData?.dateFrom}`,
            date_to: `${updatedData?.dateTo}`,
            property_id: formValues?.propertyId,
          }).toString(),
        });
      }
      // navigate({
      //   pathname: `/properties/${
      //     data?.find((x) => x?.id == formValues?.propertyId)?.route
      //   }`,
      //   search: createSearchParams({
      //     date_from: `${updatedData?.dateFrom}`,
      //     date_to: `${updatedData?.dateTo}`,
      //     property_id: formValues?.propertyId,
      //   }).toString(),
      // });

      // setFormValues({ ...defaultState });
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setUserSelectedLocation(e.target.value);
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="search-form-inner" id="search_part">
      <form onSubmit={handleSubmit}>
        <div className="row align-items-end">
          <div className="col-lg-3 col-md-6 colBottomSpace">
            <div className="inputs-filed inputDateFields">
              <div className="icon">
                <i className="far fa-map-marker-alt" />
              </div>
              <select
                name="propertyId"
                id="propertyId"
                required
                value={formValues.propertyId}
                onChange={handleChange}
                // defaultValue={formValues?.propertyId}
              >
                <option>Select Your Location</option>
                {data?.map((x, i) => (
                  <option
                    name={x?.name}
                    value={x?.id}
                    key={i}
                    // selected={
                    //   (catId && catId == x?.route) ||
                    //   dateCheckInOut?.LocationId == x?.id
                    // }
                  >
                    {x?.name}
                  </option>
                ))}
              </select>
              <div className="inputDateFieldsChild" />
            </div>
          </div>
          <div className="col-lg-3 col-md-6 colBottomSpace">
            <div className="inputs-filed inputDateFields">
              <div className="icon">
                <i className="fal fa-calendar-alt" />
              </div>
              <DatePicker
                selected={arrivalDate}
                onChange={(date) =>
                  setArrivalDate(setHours(setMinutes(new Date(date), 0), 15))
                }
                placeholderText="Check-in Date"
                selectsStart
                startDate={arrivalDate}
                minDate={new Date()}
                //# time range
                minTime={setHours(setMinutes(new Date(), 0), 15)}
                maxTime={setHours(setMinutes(new Date(), 0), 15)}
                //! newTime
                customTimeInput={<CheckDateInput />}
                // dateFormat="yyyy-MM-dd"
                dateFormat="yyyy-MM-dd HH:mm"
                timeFormat="HH:mm"
                timeIntervals={15}
                showTimeInput
                timeInputLabel="Check-in Time:"
              />
              <div className="inputDateFieldsChild" />
            </div>
          </div>
          <div className="col-lg-1 rightArrow colBottomSpace">
            <div className="inputs-filed">
              <div
                className="icon"
                style={{ left: "-40px", fontSize: "16px", bottom: "9px" }}
              >
                <i className="far fa-arrow-alt-right"></i>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 colBottomSpace">
            <div className="inputs-filed inputDateFields">
              <div className="icon">
                <i className="fal fa-calendar-alt" />
              </div>
              <DatePicker
                selected={departureDate}
                onChange={(date) =>
                  setDepartureDate(setHours(setMinutes(new Date(date), 0), 12))
                }
                placeholderText="Check-out Date"
                selectsEnd
                startDate={arrivalDate}
                endDate={departureDate}
                minDate={
                  new Date(arrivalDate).getTime() + 1 * 24 * 60 * 60 * 1000
                }
                //# time range
                minTime={setHours(setMinutes(new Date(), 0), 12)}
                maxTime={setHours(setMinutes(new Date(), 0), 12)}
                //! new Time
                dateFormat="yyyy-MM-dd HH:mm"
                customTimeInput={<CheckDateInput />}
                timeFormat="HH:mm"
                timeIntervals={15}
                showTimeInput
                timeInputLabel="Check-out Time:"
              />
              <div className="inputDateFieldsChild" />
            </div>
          </div>

          <div className="col-lg-2 col-md-6 col-sm-12">
            <div className="inputs-filed">
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
                <button type="submit">Search</button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchFilter;
