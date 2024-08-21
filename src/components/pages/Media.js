import React, { useState, useEffect, Fragment } from "react";
import { Helmet } from "react-helmet";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Banner from "../layouts/Banner";
import { API } from "../../http/API";
import MediaList from "../sections/media/MediaList";
import AOS from "aos";
import "aos/dist/aos.css";
import WhatsappFixedIcon from "../utils/WhatsappFixedIcon";

const pagelocation = "Media & News";
const Media = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  useEffect(() => {
    getMediaData();
  }, []);

  //Media page API
  const [mediaData, setMediaData] = useState([]);
  const getMediaData = () => {
    API.get(`/medias`)
      .then((response) => {
        const data = response?.data;
        setMediaData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Helmet>
        <title>Carpe Diem | {pagelocation}</title>
        <meta name="description" content="#" />
      </Helmet>
      <Header />
      <Banner
        breadcrumb={{
          pagename: pagelocation,
          img: "/assets/img/banner/mediabanner.jpg",
        }}
      />
      <MediaList mediaData={mediaData} />
      <WhatsappFixedIcon />
      <Footer />
    </>
  );
};

export default Media;
