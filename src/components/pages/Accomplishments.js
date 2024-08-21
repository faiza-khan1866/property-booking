import React, { useEffect, useState, Fragment } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Banner from "../layouts/Banner";
import Subscribe from "../layouts/Subscribe";
import { API } from "../../http/API";
import Loader from "../layouts/Loader";

//content components
import AccomplishmentsIntro from "../sections/accomplishments/AccomplishmentsIntro";
// import LocationsFilter from "../sections/locations/LocationsFilter";
import AccomplishmentsList from "../sections/accomplishments/AccomplishmentsList";
import AOS from "aos";
import "aos/dist/aos.css";
import WhatsappFixedIcon from "../utils/WhatsappFixedIcon";

const Accomplishments = () => {
  const { id } = useParams();

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    getAccomplishmentPropertiesData();
  }, [id]);

  const [accomplishmentData, setAccomplishmentData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAccomplishmentPropertiesData = () => {
    setLoading(true);
    API.get(`/front-accomplishment-locations-property/${id}`)
      .then((response) => {
        setLoading(false);
        const data = response?.data;
        setAccomplishmentData(data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  return (
    <>
      <Helmet>
        <title>{`Carpe Diem | ${accomplishmentData?.name}`}</title>
        <meta name="description" content="#" />
      </Helmet>
      <Header />
      <Banner
        breadcrumb={{
          pagename: accomplishmentData?.name,
          img: accomplishmentData?.banner_img,
        }}
      />
      <AccomplishmentsIntro title={accomplishmentData?.name} />
      {/* <div
        data-aos="fade-left"
        data-aos-once="true"
        className="location-filter pt-60 pb-60"
      >
        <div className="container">
          <LocationsFilter />
        </div>
      </div> */}
      {accomplishmentData?.property?.length == 0 ? (
        <p
          className="text-center font-weight-bold"
          style={{ fontSize: "18px" }}
        >
          No Property Found!
        </p>
      ) : loading ? (
        <Loader />
      ) : (
        <AccomplishmentsList
          propertyData={accomplishmentData?.property}
          id={accomplishmentData?.id}
          location={accomplishmentData?.name}
        />
      )}

      <Subscribe />
      <WhatsappFixedIcon />
      <Footer />
    </>
  );
};

export default Accomplishments;
