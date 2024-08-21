import React, { useEffect, Fragment, useMemo } from "react";
import { Helmet } from "react-helmet";
import AOS from "aos";
import "aos/dist/aos.css";
import useServicesData from "../customHooks/useServicesData";
import Loader from "../layouts/commonLoader";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Subscribe from "../layouts/Subscribe";
import Banner from "../layouts/Banner";

// Content components
import ServicesBlock from "../sections/services/ServicesBlock";
import WhatsappFixedIcon from "../utils/WhatsappFixedIcon";

const Services = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  const { isLoading, error, data } = useServicesData();

  const metaDetails = useMemo(() => data?.content?.meta_details, [data]);
  const bannerSection = useMemo(() => data?.content?.banerSection, [data]);
  const servicesData = useMemo(() => data?.content?.services, [data]);

  if (isLoading) return <Loader />;
  if (error) return <div>Error: {error.message || "An error occurred"}</div>;

  return (
    <>
      <Helmet>
        <title>{metaDetails?.title}</title>
        <meta name="description" content={metaDetails?.description} />
      </Helmet>
      <Header />
      {bannerSection && (
        <Banner
          breadcrumb={{
            pagename: bannerSection.title,
            img: bannerSection.background_image,
          }}
        />
      )}
      <ServicesBlock servicesData={servicesData} />
      <Subscribe />
      <WhatsappFixedIcon />
      <Footer />
    </>
  );
};

export default Services;
