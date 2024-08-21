import React, { useEffect, Fragment, useMemo } from "react";
import { Helmet } from "react-helmet";
import AOS from "aos";
import "aos/dist/aos.css";
import useRefundPolicyData from "../customHooks/useRefundPolicyData";
import Loader from "../layouts/commonLoader";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Banner from "../layouts/Banner";
import Subscribe from "../layouts/Subscribe";

// Content components
import Intro from "../sections/privacy-policy/Intro";
import WhatsappFixedIcon from "../utils/WhatsappFixedIcon";

const RefundPolicy = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  const { isLoading, error, data } = useRefundPolicyData();

  const metaDetails = useMemo(() => data?.content?.meta_details, [data]);
  const bannerSection = useMemo(() => data?.content?.banerSection, [data]);
  const aboutSection = useMemo(() => data?.content?.aboutSection, [data]);

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
      <Intro
        title={aboutSection?.title}
        description={aboutSection?.description}
      />
      <Subscribe />
      <WhatsappFixedIcon />
      <Footer />
    </>
  );
};

export default RefundPolicy;
