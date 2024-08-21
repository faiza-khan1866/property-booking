import React, { useState } from "react";
import BookingSummary from "./BookingSummary";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  AiOutlineMail,
  AiOutlineUser,
  AiOutlinePhone,
  AiOutlineBook,
  AiOutlineGlobal,
  AiOutlineClockCircle,
  AiOutlineEdit,
} from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CheckoutForm = ({ xauthtoken, isAuthenticated, userId }) => {
  const cart = useSelector((state) => state?._todoProperties?.Carts);
  const [billingDetails, setBillingDetails] = useState();
  const [isFormValid, setIsFormValid] = useState(false);
  const billingForm = Yup.object().shape({
    name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    phone_number: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    address: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    country: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    // state: Yup.string()
    //   .min(2, "Too Short!")
    //   .max(50, "Too Long!")
    //   .required("Required"),
    city: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    zip_code: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    estimated_arrival_time: Yup.string().required("Required"),
    special_notes: Yup.string().min(2, "Too Short!").max(50, "Too Long!"),
  });
  const InititalState = {
    name: "",
    email: "",
    phone_number: "",
    address: "",
    country: "",
    state: "",
    city: "",
    zip_code: "",
    special_notes: "",
    booking_for: "",
    estimated_arrival_time: "",
  };

  const handleFormData = (values, isValid, dirty) => {
    setIsFormValid(isValid && dirty);
    if (isValid && dirty) {
      setBillingDetails(values);
    }
  };
  return (
    <>
      {cart?.length ? (
        <section className="checkout-part pt-60">
          <div className="container">
            <div className="section-title mb-40">
              <h2>
                Enter your <span>Details</span>
              </h2>
            </div>
            <div className="row">
              <div className="col-lg-8 col-md-12 col-sm-12 col-12 mb-small">
                {/* checkout Form */}
                <div className="checkout-form">
                  <Formik
                    initialValues={InititalState}
                    validationSchema={billingForm}
                    onSubmit={(values) => {
                      // same shape as initial values
                      console.log(values);
                    }}
                  >
                    {({ errors, touched, values, isValid, dirty }) => (
                      <Form>
                        {handleFormData(values, isValid, dirty)}
                        <div className="row">
                          <div className="col-lg-6 col-md-12 col-sm-12">
                            <div className="mb-4 form-group">
                              <div className="input-wrapper">
                                <Field
                                  type="text"
                                  name="name"
                                  placeholder="Your Full Name*"
                                  required
                                />
                                <AiOutlineUser className="input-icon" />
                              </div>
                              {errors.name && touched.name ? (
                                <div className="FormError">{errors.name}</div>
                              ) : null}
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-12 col-sm-12">
                            <div className="mb-4 form-group">
                              <div className="input-wrapper">
                                <Field
                                  type="email"
                                  name="email"
                                  placeholder="Enter Email Address*"
                                  required
                                />
                                <AiOutlineMail className="input-icon" />
                              </div>
                              {errors.email && touched.email ? (
                                <div className="FormError">{errors.email}</div>
                              ) : null}
                            </div>
                          </div>

                          <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="mb-4 form-group">
                              <div className="input-wrapper">
                                <Field
                                  type="text"
                                  name="phone_number"
                                  placeholder="Add Phone Number*"
                                  required
                                />
                                <AiOutlinePhone className="input-icon" />
                              </div>
                              {errors.phone_number && touched.phone_number ? (
                                <div className="FormError">
                                  {errors.phone_number}
                                </div>
                              ) : null}
                            </div>
                          </div>
                          <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="mb-4 form-group">
                              <div className="input-wrapper">
                                <Field
                                  name="address"
                                  type="text"
                                  placeholder="Address*"
                                  icon={<i className="far fa-book" />}
                                  required
                                />
                                <AiOutlineBook className="input-icon" />
                              </div>
                              {errors.address && touched.address ? (
                                <div className="FormError">
                                  {errors.address}
                                </div>
                              ) : null}
                            </div>
                          </div>

                          <div className="col-lg-6 col-md-12 col-sm-12">
                            <div className="mb-4 form-group">
                              <div className="input-wrapper">
                                <Field
                                  type="text"
                                  placeholder="Country*"
                                  name="country"
                                  required
                                />
                                <AiOutlineGlobal className="input-icon" />
                              </div>
                              {errors.country && touched.country ? (
                                <div className="FormError">
                                  {errors.country}
                                </div>
                              ) : null}
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-12 col-sm-12">
                            <div className="mb-4 form-group">
                              <div className="input-wrapper">
                                <Field
                                  type="text"
                                  placeholder="State"
                                  name="state"
                                  // required
                                />
                                <AiOutlineGlobal className="input-icon" />
                              </div>
                            </div>

                            {/* <Field
                            name="state"
                            required
                            component="select"
                            className="selectcustomarrowstyle"
                          >
                            <option>State*</option>
                            <option value="Abu Dhabi">Abu Dhabi</option>
                            <option value="Dubai">Dubai</option>
                            <option value="Sharjah">Sharjah</option>
                            <option value="Ajman">Ajman</option>
                            <option value="Umm Al Quwain">Umm Al Quwain</option>
                            <option value="Ras Al Khaimah">
                              Ras Al Khaimah
                            </option>
                            <option value="Fujairah">Fujairah</option>
                          </Field> */}
                            {/* {errors.state && touched.state ? (
                          <div className="FormError">{errors.state}</div>
                        ) : null} */}
                          </div>
                          <div className="col-lg-6 col-md-12 col-sm-12">
                            <div className="mb-4 form-group">
                              <div className="input-wrapper">
                                <Field
                                  type="text"
                                  name="city"
                                  placeholder="Town / City*"
                                  required
                                />
                                <AiOutlineGlobal className="input-icon" />
                              </div>
                              {errors.city && touched.city ? (
                                <div className="FormError">{errors.city}</div>
                              ) : null}
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-12 col-sm-12">
                            <div className="mb-4 form-group">
                              <div className="input-wrapper">
                                <Field
                                  type="text"
                                  name="zip_code"
                                  placeholder="Postcode / ZIP*"
                                  required
                                />
                                <AiOutlinePhone className="input-icon" />
                              </div>
                              {errors.zip_code && touched.zip_code ? (
                                <div className="FormError">
                                  {errors.zip_code}
                                </div>
                              ) : null}
                            </div>
                          </div>
                          <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="mb-4 form-group">
                              <div className="input-wrapper">
                                <AiOutlineClockCircle className="input-icon" />
                                <Field
                                  name="estimated_arrival_time"
                                  component="select"
                                  required
                                  className="selectcustomarrowstyle"
                                >
                                  <option>
                                    Your Estimated Arrival Time* (Standard Check
                                    in time is at 3:00pm)
                                  </option>
                                  {/* <option value="I don't know">I don't know</option> */}
                                  <option value="12:00 AM – 1:00 AM">
                                    12:00 AM – 1:00 AM
                                  </option>
                                  <option value="1:00 AM – 2:00 AM">
                                    1:00 AM – 2:00 AM
                                  </option>
                                  <option value="2:00 AM – 3:00 AM">
                                    2:00 AM – 3:00 AM
                                  </option>
                                  <option value="3:00 AM – 4:00 AM">
                                    3:00 AM – 4:00 AM
                                  </option>
                                  <option value="4:00 AM – 5:00 AM">
                                    4:00 AM – 5:00 AM
                                  </option>
                                  <option value="5:00 AM – 6:00 AM">
                                    5:00 AM – 6:00 AM
                                  </option>
                                  <option value="6:00 AM – 7:00 AM">
                                    6:00 AM – 7:00 AM
                                  </option>
                                  <option value="7:00 AM – 8:00 AM">
                                    7:00 AM – 8:00 AM
                                  </option>
                                  <option value="8:00 AM – 9:00 AM">
                                    8:00 AM – 9:00 AM
                                  </option>
                                  <option value="9:00 AM – 10:00 AM">
                                    9:00 AM – 10:00 AM
                                  </option>
                                  <option value="10:00 AM – 11:00 AM">
                                    10:00 AM – 11:00 AM
                                  </option>
                                  <option value="11:00 AM – 12:00 PM">
                                    11:00 AM – 12:00 PM
                                  </option>
                                  <option value="12:00 PM – 1:00 PM">
                                    12:00 PM – 1:00 PM
                                  </option>
                                  <option value="1:00 PM – 2:00 PM">
                                    1:00 PM – 2:00 PM
                                  </option>
                                  <option value="2:00 PM – 3:00 PM">
                                    2:00 PM – 3:00 PM
                                  </option>
                                  <option value="3:00 PM – 4:00 PM">
                                    3:00 PM – 4:00 PM
                                  </option>
                                  <option value="4:00 PM – 5:00 PM">
                                    4:00 PM – 5:00 PM
                                  </option>
                                  <option value="5:00 PM – 6:00 PM">
                                    5:00 PM – 6:00 PM
                                  </option>
                                  <option value="6:00 PM – 7:00 PM">
                                    6:00 PM – 7:00 PM
                                  </option>
                                  <option value="7:00 PM – 8:00 PM">
                                    7:00 PM – 8:00 PM
                                  </option>
                                  <option value="8:00 PM – 9:00 PM">
                                    8:00 PM – 9:00 PM
                                  </option>
                                  <option value="9:00 PM – 10:00 PM">
                                    9:00 PM – 10:00 PM
                                  </option>
                                  <option value="10:00 PM – 11:00 PM">
                                    10:00 PM – 11:00 PM
                                  </option>
                                  <option value="11:00 PM – 12:00 AM">
                                    11:00 PM – 12:00 AM
                                  </option>
                                  <option value="12:00 AM – 1:00 AM (the next day)">
                                    12:00 AM – 1:00 AM (the next day)
                                  </option>
                                  <option value="1:00 AM – 2:00 AM (the next day)">
                                    1:00 AM – 2:00 AM (the next day)
                                  </option>
                                </Field>
                              </div>
                              {errors.estimated_arrival_time &&
                              touched.estimated_arrival_time ? (
                                <div className="FormError">
                                  {errors.estimated_arrival_time}
                                </div>
                              ) : null}
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="mb-4 form-group">
                              <div className="input-wrapper">
                                <Field
                                  component={"textarea"}
                                  type="text"
                                  name="special_notes"
                                  rows={6}
                                  placeholder="Special Request (optional)"
                                />
                                <AiOutlineEdit className="input-icon" />
                              </div>
                              {errors.special_notes && touched.special_notes ? (
                                <div className="FormError">
                                  {errors.special_notes}
                                </div>
                              ) : null}
                            </div>
                          </div>
                          <div className="col-12 mb-30">
                            <label>
                              <b>Who are you booking for?</b>
                            </label>
                            <div>
                              <div>
                                <Field
                                  name="booking_for"
                                  value="0"
                                  className="mr-2 booking-for"
                                  type="radio"
                                />
                                <span className="text-sm">
                                  I'm the main guest
                                </span>
                              </div>
                              <div>
                                <Field
                                  name="booking_for"
                                  value="1"
                                  className="mr-2 booking-for"
                                  type="radio"
                                />
                                <span className="text-sm">
                                  I'm booking for someone else
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
              <div className="col-lg-4 col-md-12 col-sm-12 col-12">
                <BookingSummary
                  isFormValid={isFormValid}
                  billingDetails={billingDetails}
                  xauthtoken={xauthtoken}
                  isAuthenticated={isAuthenticated}
                  userId={userId}
                />
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section id="empty_cart_area" className="pt-60 pb-60">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 offset-lg-3 col-md-6 offset-md-3 col-sm-12 col-12">
                {window?.location?.search?.split("status=")[1] == "success" ? (
                  <div className="empaty_cart_area">
                    <i className="far fa-check-circle" aria-hidden="true"></i>
                    <div className="section-title">
                      <h2>
                        Thank <span> you!</span> Your <span>booking</span> is
                        confirmed.
                      </h2>
                      <p className="text-center">
                        Please check your email for booking details. And click
                        below button for further bookings.
                      </p>
                    </div>
                    <Link to={`/properties`} className="main-btn btn-filled">
                      Continue Booking
                    </Link>
                  </div>
                ) : (
                  <div className="empaty_cart_area">
                    <i className="far fa-shopping-cart" aria-hidden="true"></i>
                    <div className="section-title">
                      <h2>
                        No <span>Bookings</span> Found!
                      </h2>
                      <p>
                        This page shows all your bookings. If you made a booking
                        You will Find it here.
                      </p>
                    </div>
                    <Link to={`/properties`} className="main-btn btn-filled">
                      Continue Booking
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default CheckoutForm;
