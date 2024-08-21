import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
// import PropertAvailabilitySearch from "../../layouts/PropertAvailabilitySearch";
import { AddCart, ClearCart, DeleteCart } from "../../../actions";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  PinterestShareButton,
  PinterestIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
import { toast } from "react-toastify";
import SearchFilterInnerRoom from "../../layouts/SearchFilterInnerRoom";
import dummyimg from "../../../assets/dummyimg.webp";

function NextArrow(props) {
  const { onClick } = props;
  return (
    <button className="nextArrow_wrape" onClick={onClick}>
      <i className="far fa-angle-right" />
    </button>
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <button className="prevArrow_wrape" onClick={onClick}>
      <i className="far fa-angle-left" />
    </button>
  );
}

const settings = {
  dots: false,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 4000,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  lazyLoad: "ondemand",
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

const PropertyDetails = ({
  propertyData,
  catId,
  id,
  arrivalDate,
  departureDate,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartData = useSelector((state) => state?._todoProperties?.Carts);

  const CartPropertyID = useSelector(
    (state) => state?._todoProperties?.CartPropertyID
  );

  const CartCheckBox = (rooms) => {
    const CartCheck = cartData?.find((x) =>
      x?.id === rooms?.id ? true : false
    );
    if (!CartCheck) {
      return false;
    }
    return true;
  };

  const handleChange = (e, room, index, category, base_rate) => {
    const cartCheck = cartData?.find((x) =>
      x?.id === room?.id ? true : false
    );

    if (cartData.length && !cartCheck) {
      document.getElementById(`PropertyCHeckBook${index}`).checked = false;
      toast(
        <div style={{ textAlign: "center", padding: "0.5rem 0" }}>
          <h5
            style={{
              fontSize: "15px",
              color: "#2484c4",
              marginBottom: "1rem",
              fontWeight: "500",
            }}
          >
            There is already room in pending, continue with this booking or
            cancel it
          </h5>
          <img
            src={
              cartData?.[0]?.category?.image
                ? cartData?.[0]?.category?.image
                : dummyimg
            }
            height="100px"
            width="100px"
            alt="Product"
          />
          <p style={{ fontSize: "14px", margin: "0.5rem 0" }}>
            {cartData?.[0]?.category?.short_description}
          </p>
          <button
            style={{
              backgroundColor: "#2484c4",
              color: "#fff",
              padding: "0.3rem 1rem",
              marginRight: "10px",
              border: "0",
              fontSize: "12px",
              borderRadius: "20px",
            }}
            onClick={() => {
              navigate("/bookings");
              toast.dismiss();
            }}
          >
            Check Booking
          </button>
          <button
            style={{
              backgroundColor: "#d33",
              color: "#fff",
              padding: "0.3rem 1rem",
              border: "0",
              fontSize: "12px",
              borderRadius: "20px",
            }}
            onClick={() => {
              dispatch(ClearCart());
              toast.dismiss();
            }}
          >
            Cancel Booking
          </button>
        </div>,
        {
          theme: "light",
          icon: false,
          autoClose: false,
          closeOnClick: false,
          closeButton: false,
        }
      );
      return;
    }
    if (cartCheck) {
      dispatch(DeleteCart(room));
    } else {
      if (!CartPropertyID || CartPropertyID == room.propertyId) {
        dispatch(AddCart({ room, category, base_rate }));
      } else {
        document.getElementById(`PropertyCHeckBook${index}`).checked = false;
        toast(
          <div style={{ textAlign: "center", padding: "0.5rem 0" }}>
            <h5
              style={{
                fontSize: "15px",
                color: "#2484c4",
                marginBottom: "0.5rem",
              }}
            >
              You want to continue with this booking or cancel it
            </h5>
            <img
              src={
                cartData?.[0]?.category?.image
                  ? cartData?.[0]?.category?.image
                  : dummyimg
              }
              height="100px"
              width="100px"
              alt="Product"
            />
            <p style={{ fontSize: "14px", margin: "0.5rem 0" }}>
              {cartData?.[0]?.category?.short_description}
            </p>
            <button
              style={{
                backgroundColor: "#2484c4",
                color: "#fff",
                padding: "0.3rem 1rem",
                marginRight: "10px",
                border: "0",
                fontSize: "12px",
                borderRadius: "20px",
              }}
              onClick={() => {
                navigate("/bookings");
                toast.dismiss();
              }}
            >
              Check Booking
            </button>
            <button
              style={{
                backgroundColor: "#d33",
                color: "#fff",
                padding: "0.3rem 1rem",
                border: "0",
                fontSize: "12px",
                borderRadius: "20px",
              }}
              onClick={() => {
                dispatch(ClearCart());
                toast.dismiss();
              }}
            >
              Cancel Booking
            </button>
          </div>,
          {
            theme: "light",
            icon: false,
            autoClose: false,
            closeOnClick: false,
            closeButton: false,
          }
        );
        return;
      }
    }
  };

  const handleSearchPrice = () => {
    toast.info(
      "Enter your check-in and check-out dates in the search box on the top.",
      { icon: false }
    );
  };
  return (
    <div className="container">
      <section className="property-details mb-60">
        <div className="container">
          <div className="row">
            {/* details */}
            <div className="col-sm-12">
              <div className="deatils-box">
                <div className="section-title mb-40">
                  <div className="d-flex justify-content-between align-items-center flex-wrap">
                    <h2 className="text-left">
                      <span>{propertyData?.category?.short_description}</span>
                    </h2>
                    {propertyData?.category?.base_rate && (
                      <p className="price">
                        AED{" "}
                        {Number.parseFloat(
                          propertyData?.category?.base_rate
                        ).toFixed(2)}
                      </p>
                    )}
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6 col-md-12 col-sm-12 mb-small">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: propertyData?.category?.longDescription,
                      }}
                    />
                  </div>
                  <div className="col-lg-6 col-md-12 col-sm-12">
                    {propertyData?.category?.images?.length > 0 ? (
                      <Slider {...settings}>
                        {propertyData?.category?.images?.map((x, i) => (
                          <div
                            className="thumb mb-3"
                            key={`category_images_${i}`}
                          >
                            <img
                              src={x?.images ? x?.images : dummyimg}
                              className="w-100"
                              alt="Area Image"
                              style={{ height: "300px" }}
                            />
                          </div>
                        ))}
                      </Slider>
                    ) : (
                      <img
                        src={dummyimg}
                        className="w-100"
                        alt="Area Image"
                        style={{ height: "300px" }}
                      />
                    )}
                  </div>
                </div>
                {/* // Social media share button  */}
                <div className="shareBtnWrape">
                  <div className="shareBtn">
                    <FacebookShareButton
                      url={`https://carpediem.prismcloudhosting.com/properties/${catId}/${id}`}
                      quote={`
                      ${propertyData?.category?.name}
                      \n
                      Check out our latest Properties here:
                                \n
                                https://carpediem.prismcloudhosting.com/properties`}
                      hashtag={"#Carpe Diem"}
                    >
                      <FacebookIcon size={36} />
                    </FacebookShareButton>
                  </div>
                  <div className="shareBtn">
                    <LinkedinShareButton
                      url={`https://carpediem.prismcloudhosting.com/properties`}
                      title={"Carpe Diem"}
                      source={`https://carpediem.prismcloudhosting.com/properties/${catId}/${id}`}
                      summary={`Check out our latest Properties here:
                                \n
                                https://carpediem.prismcloudhosting.com/properties
                                `}
                    >
                      <LinkedinIcon size={36} />
                    </LinkedinShareButton>
                  </div>
                  <div className="shareBtn">
                    <PinterestShareButton
                      media={propertyData?.category?.images?.[0]?.images}
                      url={`https://carpediem.prismcloudhosting.com/properties/${catId}/${id}`}
                      description={`Check out our latest Properties here:
                              \n
                              https://carpediem.prismcloudhosting.com/properties
                              `}
                    >
                      <PinterestIcon size={36} />
                    </PinterestShareButton>
                  </div>
                  <div className="shareBtn">
                    <WhatsappShareButton
                      title={propertyData?.category?.name}
                      url={`https://carpediem.prismcloudhosting.com/properties/${catId}/${id}`}
                      description={`Check out our latest Properties here:
                              \n
                              https://carpediem.prismcloudhosting.com/properties
                              `}
                    >
                      <WhatsappIcon size={36} />
                    </WhatsappShareButton>
                  </div>
                </div>

                <div className="amenities-area clearfix">
                  {propertyData?.category?.aminity?.length > 0 && (
                    <>
                      <h3 className="subtitle">Amenities</h3>
                      <ul className="amenities-list">
                        {propertyData?.category?.aminity?.map((item, i) => (
                          <li key={i}>
                            <img
                              src={item?.icon}
                              style={{
                                height: "30px",
                                width: "30px",
                                marginRight: "10px",
                              }}
                              alt="amenities icon"
                            />
                            <span
                              style={{
                                whiteSpace: "initial",
                              }}
                            >
                              {item?.name}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>

                <hr />
                <div className="search-filter pt-60">
                  <SearchFilterInnerRoom catId={catId} id={id} />
                </div>

                {propertyData?.room?.length == 0 ? (
                  <h2 className="pt-5 rooms_unavailable_note">
                    {/* No <span>Rooms available</span> between selected dates! */}
                    <span> No rooms </span> are available for the selected
                    dates. Please try <span>alternate dates </span> or
                    locations.
                  </h2>
                ) : (
                  <div className="property-type-area clearfix">
                    <div className="row">
                      {propertyData?.room?.map((rooms, index) => (
                        <div
                          className="col-lg-6 col-md-6 col-sm-12 roomsDiv"
                          key={index}
                        >
                          <input
                            type="checkbox"
                            name="propertyAdd"
                            id={`PropertyCHeckBook${rooms?.id}`}
                            defaultChecked={cartData?.find((x) =>
                              x?.id === rooms?.id ? true : false
                            )}
                            onClick={(e) =>
                              handleChange(
                                e,
                                rooms,
                                rooms?.id,
                                propertyData?.category,
                                propertyData?.category?.base_rate
                              )
                            }
                          />

                          {/* <h3 className="subtitle">Property Type</h3> */}
                          <h3 className="title">
                            {rooms?.name}
                            {/* {rooms?.short_description} */}
                          </h3>

                          {/* <p className="price"> 60000 AED</p> */}
                          {rooms?.maxOccupants && (
                            <div className="mt-20 mb-20">
                              <p className="studio">Max. Occupants</p>
                              <p className="sqfeet mb-2">
                                {rooms?.maxOccupants}
                                <hr />
                              </p>
                            </div>
                          )}
                          <div className="property_rooms_details_inner">
                            <div className="property_rooms_meta">
                              {propertyData?.category?.numberOfBedrooms !==
                                0 && (
                                <span>
                                  <i className="far fa-bed" />
                                  {
                                    propertyData?.category?.numberOfBedrooms
                                  }{" "}
                                  Bedroom
                                </span>
                              )}
                              {propertyData?.category?.numberOfFullBaths !==
                                0 && (
                                <span>
                                  <i className="far fa-bath" />
                                  {
                                    propertyData?.category?.numberOfFullBaths
                                  }{" "}
                                  Bathroom
                                </span>
                              )}
                              {/* <span>
              <i className="far fa-home" />
              {item?.categoryClass}
            </span> */}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="text-right mt-4">
                      <a
                        href="https://wa.me/+971521956260"
                        target="_blank"
                        className="wish-btn mr-2"
                      >
                        Send Request
                      </a>
                      {arrivalDate && departureDate ? (
                        <Link to="/bookings" className="main-btn btn-filled">
                          Book Now
                        </Link>
                      ) : (
                        <button
                          className="main-btn btn-filled"
                          onClick={handleSearchPrice}
                        >
                          Book Now
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PropertyDetails;
