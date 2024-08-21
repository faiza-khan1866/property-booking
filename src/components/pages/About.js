import React, { useEffect, Fragment, useMemo } from "react";
import { Helmet } from "react-helmet";
import AOS from "aos";
import "aos/dist/aos.css";
import useAboutData from "../customHooks/useAboutData";
import Loader from "../layouts/commonLoader";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Banner from "../layouts/Banner";

// Content components
import AboutVideo from "../sections/about/AboutVideo";
import WhyInvest from "../sections/about/WhyInvest";
import Clients from "../sections/about/Clients";
import OurTeam from "../sections/about/OurTeam";
import WhatsappFixedIcon from "../utils/WhatsappFixedIcon";

const About = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  const { isLoading, error, data } = useAboutData();

  const metaDetails = useMemo(() => data?.about?.content?.meta_details, [data]);
  const bannerSection = useMemo(
    () => data?.about?.content?.banerSection,
    [data]
  );
  const aboutSection = useMemo(
    () => data?.about?.content?.aboutSection,
    [data]
  );
  const founderSection = useMemo(
    () => data?.about?.content?.founderSection,
    [data]
  );
  const investSection = useMemo(
    () => data?.about?.content?.investSection,
    [data]
  );
  const partnersData = useMemo(() => data?.partners, [data]);
  const teamsData = useMemo(() => data?.teams, [data]);

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
      <AboutVideo introData={aboutSection} founderData={founderSection} />
      <WhyInvest investSection={investSection} />
      <Clients partnersData={partnersData} />
      <OurTeam teamsData={teamsData} />
      <WhatsappFixedIcon />
      <Footer />
    </>
  );
};

export default About;
