import React, { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Banner from "../layouts/Banner";
import Subscribe from "../layouts/Subscribe";

import MediaSection from "../sections/blog-inner/MediaSection";
import MediaDetail from "../sections/media/MediaDetail";
import { API } from "../../http/API";
import AOS from "aos";
import "aos/dist/aos.css";
import WhatsappFixedIcon from "../utils/WhatsappFixedIcon";

const MediaInner = () => {
  const { id } = useParams();
  useEffect(() => {
    AOS.init();
  }, []);
  useEffect(() => {
    getSingleMediaData();
    getRecentMediaData();
  }, [id]);

  //media Detail page API
  const [singleMediaData, setSingleMediaData] = useState("");
  const getSingleMediaData = () => {
    API.get(`/medias/${id}`)
      .then((response) => {
        const data = response?.data;
        setSingleMediaData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //Recent Media API
  const [recentFeedData, setRecentFeedData] = useState([]);
  const [isMedediaLoading, setIsMediaLoading] = useState(true);
  const getRecentMediaData = () => {
    API.get(`/medias`)
      .then((response) => {
        const data = response?.data?.filter((x) => x?.route != id);
        setRecentFeedData(data);
        setIsMediaLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsMediaLoading(false);
      });
  };

  return (
    <>
      <Helmet>
        <title>{singleMediaData?.seo?.meta_title}</title>
        <meta
          name="description"
          content={singleMediaData?.seo?.meta_description}
        />
      </Helmet>
      <Header />
      <Banner
        breadcrumb={{
          pagename: singleMediaData?.title,
          img: singleMediaData?.banner_img,
        }}
      />
      <MediaDetail mediaDetail={singleMediaData} />
      {!isMedediaLoading && (
        <>
          <MediaSection
            title="Recent <span>Feeds</span>"
            mediaData={recentFeedData}
          />
        </>
      )}
      <Subscribe />
      <WhatsappFixedIcon />
      <Footer />
    </>
  );
};
export default MediaInner;
