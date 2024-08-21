import React, { useEffect, Fragment, useMemo } from "react";
import { Helmet } from "react-helmet";
import AOS from "aos";
import "aos/dist/aos.css";
import useInvestmentAdvisoryData from "../customHooks/useInvestmentAdvisoryData";
import Loader from "../layouts/commonLoader";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Banner from "../layouts/Banner";
import Subscribe from "../layouts/Subscribe";

// Content components
import AboutService from "../sections/investment-advisory/AboutService";
import Benefits from "../sections/investment-advisory/Benefits";
import Plans from "../sections/investment-advisory/Plans";
import SupportService from "../sections/investment-advisory/SupportService";
import Projects from "../sections/investment-advisory/Projects";
import WhatsappFixedIcon from "../utils/WhatsappFixedIcon";

const InvestmentAdvisory = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  const { isLoading, error, data } = useInvestmentAdvisoryData();

  const metaDetails = useMemo(() => data?.content?.meta_details, [data]);
  const bannerSection = useMemo(() => data?.content?.banerSection, [data]);
  const aboutSection = useMemo(() => data?.content?.aboutSection, [data]);
  const benefitsData = useMemo(() => data?.content?.benefits, [data]);
  const plansData = useMemo(() => data?.content?.plans, [data]);
  const supportData = useMemo(() => data?.content?.support, [data]);

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
      <AboutService aboutdata={aboutSection} />
      <Benefits benefitsdata={benefitsData} />
      <Plans plansdata={plansData} />
      <SupportService
        title="Support <span>Services</span>"
        supportdata={supportData}
      />
      <Projects title="Project <span>Highlights</span>" />
      <Subscribe />
      <WhatsappFixedIcon />
      <Footer />
    </>
  );
};

export default InvestmentAdvisory;
