import React, { useState, useEffect } from "react";
import { API } from "../../../http/API";

const PropertyCalculator = () => {
  const [formData, setFormData] = useState([]);
  const [areasData, setAreasData] = useState([]);
  const [apartmentData, setApartmentData] = useState([]);
  const [propertySummaryData, setPropertySummaryData] = useState();
  const [loading, setLoading] = useState(false);

  const getCalCulatedValues = () => {
    API.get(`/area-apartment-combination`)
      .then((response) => {
        const data = response?.data;
        let PropertyType = [];
        data?.forEach((element) => {
          PropertyType?.push(element.apartment_type);
        });
        let uniquePropertyType = [...new Set(PropertyType)];
        setApartmentData(uniquePropertyType);
        let Areas = [];
        data?.forEach((element) => {
          Areas?.push(element.area_name);
        });
        let uniqueAreas = [...new Set(Areas)];
        setAreasData(uniqueAreas);
        setFormData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCalCulatedValues();
  }, []);

  const initialObject = {
    area: "",
    property_type: "",
  };

  const [formValues, setFormValues] = useState({ ...initialObject });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });

    // Clear error message when user starts typing again
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleCaculator = (e) => {
    e.preventDefault();
    const { area, property_type } = formValues;
    const errors = {};

    if (!area) {
      errors.area = "Please Choose Area.";
    } else if (!property_type) {
      errors.property_type = "Please Choose Property Type.";
    }

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      setLoading(false);
      return;
    }
    setLoading(true);
    const data = formData?.find((item) => {
      if (
        item.area_name == formValues?.area &&
        item.apartment_type == formValues?.property_type
      ) {
        setPropertySummaryData(item);
        setLoading(false);
      }
    });
  };

  return (
    <section className="property-calculator pt-60">
      <div className="container">
        <div
          className="section-title mb-40"
          data-aos="fade-down"
          data-aos-once="true"
        >
          <h2>
            Property <span>Calculator</span>
          </h2>
        </div>
        <div className="row justify-content-between">
          <div
            className="col-lg-6 col-md-6 col-sm-12"
            data-aos="fade-up"
            data-aos-once="true"
          >
            <div className="calculator-form mb-small">
              <form action="#">
                <div className="input-group mb-30">
                  <select
                    id="area"
                    name="area"
                    className="selectcustomarrowstyle"
                    value={formValues?.area}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Area</option>
                    {areasData?.map((area, index) => (
                      <option value={area} key={index}>
                        {area}
                      </option>
                    ))}
                  </select>
                  <p className="mt-2 text-danger form_error_msg">
                    {errors?.area}
                  </p>
                </div>
                <div className="input-group mb-50">
                  <select
                    name="property_type"
                    id="property_type"
                    className="selectcustomarrowstyle"
                    value={formValues?.property_type}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Apartment</option>
                    {apartmentData?.map((propertytype, ind) => (
                      <option value={propertytype} key={ind}>
                        {propertytype}
                      </option>
                    ))}
                  </select>
                  <p className="mt-2 text-danger form_error_msg">
                    {errors?.property_type}
                  </p>
                </div>
                <div className="text-center">
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
                    <button
                      type="button"
                      className="main-btn btn-filled"
                      onClick={handleCaculator}
                      style={{
                        borderRadius: "15px",
                      }}
                    >
                      Calculate
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
          <div
            className="col-lg-5 col-md-6 col-sm-12"
            data-aos="fade-up"
            data-aos-once="true"
          >
            <div className="property-summary">
              {propertySummaryData != null ? (
                <>
                  <h2>
                    A <span>{propertySummaryData?.apartment_type}</span>{" "}
                    Property in <span>{propertySummaryData?.area_name}</span>{" "}
                    can earn
                  </h2>
                  <p className="price">AED {propertySummaryData?.price}</p>
                  <p className="desc">
                    *estimate is based on realistic occupancies and similar
                    listings in your area
                  </p>
                </>
              ) : (
                <div className="section-title">
                  <h2 className="mb-0">
                    Count <span>how much</span> you <br />{" "}
                    <span>can earn!</span>
                  </h2>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyCalculator;
