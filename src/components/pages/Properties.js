import React, { useEffect, Fragment } from "react";
import { Helmet } from "react-helmet";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Banner from "../layouts/Banner";
import SearchFilter from "../layouts/SearchFilter";

//content components
import PropertiesList from "../sections/properties/PropertiesList";
import AOS from "aos";
import "aos/dist/aos.css";
import WhatsappFixedIcon from "../utils/WhatsappFixedIcon";

const pagelocation = "Our Properties";

const Properties = () => {
  useEffect(() => {
    AOS.init();
  }, []);

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
          img: "/assets/img/banner/Propertiesbanner.webp",
        }}
      />
      <div className="search-filter pt-60 pb-60">
        <div className="container">
          <SearchFilter />
        </div>
      </div>
      <PropertiesList />
      <WhatsappFixedIcon />
      <Footer />
    </>
  );
};

export default Properties;
