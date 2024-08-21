import React, { useEffect, Fragment, useMemo } from "react";
import { Helmet } from "react-helmet";
import AOS from "aos";
import "aos/dist/aos.css";
import useListPropertyData from "../customHooks/useListPropertyData";
import Loader from "../layouts/commonLoader";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Banner from "../layouts/Banner";
import Subscribe from "../layouts/Subscribe";

// Content components
import About from "../sections/list-property/About";
import PropertyCalculator from "../sections/list-property/PropertyCalculator";
import ListProperty from "../sections/holiday-homes/ListProperty";
import Projects from "../sections/investment-advisory/Projects";
import FaqSection from "../sections/list-property/FaqSection";
import WhatsappFixedIcon from "../utils/WhatsappFixedIcon";

const ListYourProperty = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  const { isLoading, error, data } = useListPropertyData();

  const metaDetails = useMemo(() => data?.content?.meta_details, [data]);
  const bannerSection = useMemo(() => data?.content?.banerSection, [data]);
  const aboutSection = useMemo(() => data?.content?.aboutSection, [data]);
  const faqData = useMemo(() => data?.content?.faq, [data]);

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
      <About aboutdata={aboutSection} />
      <PropertyCalculator />
      <ListProperty title="List Your <span>Property</span>" />
      <Projects title="Project <span>Highlights</span>" />
      <FaqSection
        plansdata={faqData}
        title="FAQ's - Frequently Asked <span>Questions</span>"
      />
      <Subscribe />
      <WhatsappFixedIcon />
      <Footer />
    </>
  );
};

export default ListYourProperty;
