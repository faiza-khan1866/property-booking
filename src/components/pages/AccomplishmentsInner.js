import React, { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Subscribe from "../layouts/Subscribe";
import { API } from "../../http/API";
import AOS from "aos";
import "aos/dist/aos.css";

//content components
import RelatedAccomplishments from "../sections/accomplishments-inner/RelatedAccomplishments";
import AccomplishmentsDetails from "../sections/accomplishments-inner/AccomplishmentsDetails";
import WhatsappFixedIcon from "../utils/WhatsappFixedIcon";
import Loader from "../layouts/Loader";
const pagelocation = "Location Details";

const AccomplishmentsInner = () => {
  const { loca, id } = useParams();
  const [accomplishmentData, setAccomplishmentData] = useState("");

  useEffect(() => {
    AOS.init();
  }, []);

  const getAccomplishmentPropertiesData = () => {
    API.get(`/front-accomplishment-property-detail/${id}`)
      .then((response) => {
        const data = response?.data;
        setAccomplishmentData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [relatedData, setRelatedData] = useState([]);
  const [isRelatedDataLoading, setIsRelatedDataLoading] = useState(true);

  const getRelatedAccomplishmentData = () => {
    API.get(`/front-accomplishment-locations-property/${loca}}`)
      .then((response) => {
        const data = response?.data?.property?.filter((x) => x?.route !== id);
        setRelatedData(response?.data?.property);
        setIsRelatedDataLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsRelatedDataLoading(false);
      });
  };

  useEffect(() => {
    getAccomplishmentPropertiesData();
    getRelatedAccomplishmentData();
  }, [id]);

  return (
    <>
      <Helmet>
        <title>Carpe Diem | {pagelocation}</title>
        <meta name="description" content="#" />
      </Helmet>
      <Header />
      <AccomplishmentsDetails accomplishmentData={accomplishmentData} />
      {!isRelatedDataLoading ? (
        <>
          <RelatedAccomplishments relatedData={relatedData} />
        </>
      ) : (
        <Loader />
      )}
      <Subscribe />
      <WhatsappFixedIcon />

      <Footer />
    </>
  );
};

export default AccomplishmentsInner;
