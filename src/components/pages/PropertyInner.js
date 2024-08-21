import React, { useEffect, Fragment } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  actFetchSinglePropertyRequest,
  ResetSingleProperty,
} from "../../actions";
import AOS from "aos";
import "aos/dist/aos.css";
import Loader from "../layouts/Loader";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Banner from "../layouts/Banner";
import PropertyDetails from "../sections/property-details/PropertyDetails";
import WhatsappFixedIcon from "../utils/WhatsappFixedIcon";
import dummyimg from "../../assets/dummyimg.webp";

const PropertyInner = () => {
  const { cat, id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const dateCheckInOut = useSelector(
    (state) => state?._todoProperties.CheckDate
  );

  let arrivalDate = dateCheckInOut?.arrivalDate;
  let departureDate = dateCheckInOut?.departureDate;

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    dispatch(ResetSingleProperty());
    dispatch(
      actFetchSinglePropertyRequest(
        id,
        searchParams.get("date_from"),
        searchParams.get("date_to")
      )
    );
  }, [id, searchParams]);

  const propertyDetail = useSelector(
    (state) => state?._todoProperties?.singleProperty
  );
  const loader = useSelector((state) => state?._todoProperties?.loader);

  return (
    <>
      <Helmet>
        <title>{`Carpe Diem | ${propertyDetail?.category?.name}`}</title>
        <meta name="description" content="#" />
      </Helmet>
      <Header />
      {loader ? (
        <section className="pt-60 pb-60">
          <Loader />
        </section>
      ) : propertyDetail?.length == 0 ? (
        <section id="empty_cart_area" className="pt-60 pb-60">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 offset-lg-3 col-md-6 offset-md-3 col-sm-12 col-12">
                <div className="empaty_cart_area">
                  <i className="fal fa-frown" aria-hidden="true"></i>
                  <div className="section-title">
                    <h2>
                      No <span>Rooms Available</span> Between Selected Dates!
                    </h2>
                  </div>
                  <Link to={`/properties`} className="main-btn btn-filled">
                    Start Searching
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <>
          <Banner
            breadcrumb={{
              pagename: propertyDetail?.category?.short_description,
              img: propertyDetail?.category?.images?.[0]?.images
                ? propertyDetail?.category?.images?.[0]?.images
                : dummyimg,
            }}
          />
          <PropertyDetails
            propertyData={propertyDetail}
            catId={cat}
            id={id}
            arrivalDate={arrivalDate}
            departureDate={departureDate}
          />
        </>
      )}
      <WhatsappFixedIcon />
      <Footer />
    </>
  );
};

export default PropertyInner;
