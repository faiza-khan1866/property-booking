import React from "react";
import BookingDetails from "./BookingDetails";
import { Link } from "react-router-dom";
import {
  DeleteCart,
  ClearCart,
  AddCartGuest,
  UpdateCart,
} from "../../../actions";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { FiMail, FiPhone, FiUser, FiUsers } from "react-icons/fi";
import dummyimg from "../../../assets/dummyimg.webp";

// import moment from "moment";

const ViewBooking = () => {
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state?._todoProperties?.Carts);
  const [CheckGuestName, setCheckGuestName] = useState(false);

  // const dateCheckInOut = useSelector(
  //   (state) => state?._todoProperties?.CheckDate
  // );

  // let arrivalDate = dateCheckInOut?.arrivalDate;
  // let departureDate = dateCheckInOut?.departureDate;

  // let totalStay = "";

  // if (arrivalDate && departureDate) {
  //   //calculate total stay
  //   let date1 = moment(arrivalDate);
  //   let date2 = moment(departureDate);

  //   totalStay = date2.diff(date1, "days");
  // }

  const checkEMptyCart = () => {
    const FoundItem = cartData.find((item) => {
      if (!item.GuestName && !item.GuestLastName) {
        return item;
      }
    });
    setCheckGuestName(
      cartData[0]?.GuestName && cartData[0]?.GuestLastName ? true : false
    );
  };

  const CheckingDate = useSelector(
    (state) => state?._todoProperties?.CheckDate
  );
  const [GuestUser, SetGuestUser] = useState({
    GuestName: cartData[0]?.GuestName ? cartData[0]?.GuestName : "",
    GuestLastName: cartData[0]?.GuestLastName ? cartData[0]?.GuestLastName : "",
    GuestEmail: "",
    GuestPhone: "",
    GuestAdults: 0,
    GuestChildren: 0,
  });

  // useEffect(() => {
  //   dispatch(UpdateCart(GuestUser));
  // }, []);

  useEffect(() => {
    dispatch(AddCartGuest(GuestUser));
    checkEMptyCart();
  }, [GuestUser]);
  const handleChange = (e, id) => {
    SetGuestUser({ ...GuestUser, [e.target.name]: e.target.value, id: id });
  };

  return (
    <>
      {cartData?.length ? (
        <section className="cart_area pt-60 pb-60">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-12 col-sm-12 col-12 mb-small">
                {cartData?.map((data, index) => (
                  <div className="book_room" key={index}>
                    <div className="title_icon">
                      <h2>
                        <Link to={`/properties/category/${data.id}`}>
                          {data.title}
                        </Link>
                      </h2>
                      <h2 className="remove_icon">
                        <i
                          className="fa fa-times"
                          onClick={() => dispatch(DeleteCart(data))}
                        />
                      </h2>
                    </div>
                    <ul className="amenities-list clearfix">
                      {cartData[0]?.category?.aminity?.map((item, i) => (
                        <li key={i} className="d-flex align-items-center">
                          <img
                            src={item?.icon}
                            style={{
                              height: "25px",
                              width: "25px",
                              marginRight: "10px",
                            }}
                            alt="amenities icon"
                          />
                          <div
                            style={{
                              whiteSpace: "initial",
                            }}
                          >
                            {item?.name}
                          </div>
                        </li>
                      ))}
                    </ul>
                    <p className="guest_info clearfix">
                      <strong>Guests:</strong>
                    </p>
                    <Form>
                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <Form.Group controlId="adults" className="mb-4">
                            <InputGroup>
                              <Form.Control
                                type="number"
                                name="GuestAdults"
                                min="0"
                                max="9"
                                placeholder="No. of Adults"
                                value={data?.GuestAdults}
                                onChange={(e) => handleChange(e, data.id)}
                                onInput={(e) => {
                                  const inputValue = parseInt(
                                    e.target.value,
                                    10
                                  );
                                  if (isNaN(inputValue)) {
                                    // Not a valid number, set it to the minimum value
                                    e.target.value = 0;
                                  } else if (inputValue < 0) {
                                    // Below minimum, set it to the minimum value
                                    e.target.value = 0;
                                  } else if (inputValue > 9) {
                                    // Above maximum, set it to the maximum value
                                    e.target.value = 9;
                                  }
                                }}
                              />
                              <InputGroup.Text>
                                <FiUsers fontSize="18px" />
                              </InputGroup.Text>
                            </InputGroup>
                          </Form.Group>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <Form.Group controlId="childrens" className="mb-4">
                            <InputGroup>
                              <Form.Control
                                type="number"
                                name="GuestChildren"
                                min="0"
                                max="9"
                                placeholder="No. of Children"
                                value={data?.GuestChildren}
                                onChange={(e) => handleChange(e, data.id)}
                                onInput={(e) => {
                                  const inputValue = parseInt(
                                    e.target.value,
                                    10
                                  );
                                  if (isNaN(inputValue)) {
                                    // Not a valid number, set it to the minimum value
                                    e.target.value = 0;
                                  } else if (inputValue < 0) {
                                    // Below minimum, set it to the minimum value
                                    e.target.value = 0;
                                  } else if (inputValue > 9) {
                                    // Above maximum, set it to the maximum value
                                    e.target.value = 9;
                                  }
                                }}
                              />
                              <InputGroup.Text>
                                <FiUsers fontSize="18px" />
                              </InputGroup.Text>
                            </InputGroup>
                          </Form.Group>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <Form.Group controlId="guestfname" className="mb-4">
                            <InputGroup>
                              <Form.Control
                                name="GuestName"
                                type="text"
                                placeholder="Guest First Name"
                                defaultValue={data?.GuestName}
                                onChange={(e) => handleChange(e, data.id)}
                              />
                              <InputGroup.Text>
                                <FiUser fontSize="18px" />
                              </InputGroup.Text>
                            </InputGroup>
                          </Form.Group>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <Form.Group controlId="guestlname" className="mb-4">
                            <InputGroup>
                              <Form.Control
                                name="GuestLastName"
                                type="text"
                                placeholder="Guest Last Name"
                                defaultValue={data?.GuestLastName}
                                required
                                onChange={(e) => handleChange(e, data.id)}
                              />
                              <InputGroup.Text>
                                <FiUser fontSize="18px" />
                              </InputGroup.Text>
                            </InputGroup>
                          </Form.Group>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <Form.Group controlId="email" className="mb-4">
                            <InputGroup>
                              <Form.Control
                                name="GuestEmail"
                                type="email"
                                placeholder="Guest Email"
                                defaultValue={data?.GuestEmail}
                                onChange={(e) => handleChange(e, data.id)}
                              />
                              <InputGroup.Text>
                                <FiMail fontSize="18px" />
                              </InputGroup.Text>
                            </InputGroup>
                          </Form.Group>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <Form.Group controlId="phone" className="mb-4">
                            <InputGroup>
                              <Form.Control
                                name="GuestPhone"
                                type="text"
                                placeholder="Guest Phone Number"
                                defaultValue={data?.GuestPhone}
                                required
                                onChange={(e) => handleChange(e, data.id)}
                              />
                              <InputGroup.Text>
                                <FiPhone fontSize="18px" />
                              </InputGroup.Text>
                            </InputGroup>
                          </Form.Group>
                        </div>
                      </div>
                    </Form>
                    <div className="category_part">
                      <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-12">
                          <figure>
                            <img
                              src={
                                data?.category?.image
                                  ? data?.category?.image
                                  : dummyimg
                              }
                              alt="image"
                            />
                          </figure>
                        </div>
                        <div className="col-lg col-md col-sm-12">
                          <p className="cat_class">
                            {data?.category?.categoryClass}
                          </p>
                          <h4 className="title">
                            {data?.category?.short_description}
                          </h4>
                          {data?.category?.rate && (
                            <p className="price">
                              AED{" "}
                              {Number.parseFloat(data?.category?.rate).toFixed(
                                2
                              )}{" "}
                              / night
                            </p>
                          )}
                          <div className="d-flex justify-content-start align-items-center">
                            {data?.category?.bedrooms !== 0 && (
                              <p className="amin_class mr-3">
                                <i className="far fa-bed" />
                                {data?.category?.bedrooms} Bedrooms
                              </p>
                            )}
                            {data?.category?.bathrooms !== 0 && (
                              <p className="amin_class">
                                <i className="far fa-bath" />
                                {data?.category?.bathrooms} Bathrooms
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="cart_submit">
                  {cartData?.length ? (
                    <button
                      className="main-btn btn-border"
                      type="button"
                      onClick={() => dispatch(ClearCart())}
                    >
                      Clear Bookings
                    </button>
                  ) : null}
                </div>
              </div>
              <div className="col-lg-4 col-md-12 col-sm-12 col-12">
                <BookingDetails
                  CheckingDate={CheckingDate}
                  cart={cartData}
                  CheckGuestName={CheckGuestName}
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
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
export default ViewBooking;
