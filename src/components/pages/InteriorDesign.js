import React, {
  useState,
  useEffect,
  Fragment,
  useMemo,
  useCallback,
} from "react";
import { Helmet } from "react-helmet";
import AOS from "aos";
import "aos/dist/aos.css";
import { API } from "../../http/API";
import useInteriorDesignData from "../customHooks/useInteriorDesignData";
import Loader from "../layouts/commonLoader";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Banner from "../layouts/Banner";
import Subscribe from "../layouts/Subscribe";

// Content components
import AboutHolidayHomes from "../sections/holiday-homes/AboutHolidayHomes";
import ProudAccomplishment from "../sections/interior-design/ProudAccomplishment";
import GetQuote from "../sections/interior-design/GetQuote";
import SupportService from "../sections/investment-advisory/SupportService";
import WhatsappFixedIcon from "../utils/WhatsappFixedIcon";

const InteriorDesigning = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  const [sliderData, setSliderData] = useState([]);

  const getProudAccomplishmentData = useCallback(() => {
    API.get("/front-accomplishment-locations")
      .then((response) => {
        setSliderData(response?.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    getProudAccomplishmentData();
  }, [getProudAccomplishmentData]);

  const { isLoading, error, data } = useInteriorDesignData();

  const metaDetails = useMemo(() => data?.content?.meta_details, [data]);
  const bannerSection = useMemo(() => data?.content?.banerSection, [data]);
  const aboutSection = useMemo(() => data?.content?.aboutSection, [data]);
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
      <AboutHolidayHomes
        title={aboutSection?.title}
        detail={aboutSection?.description}
      />
      <ProudAccomplishment
        title="Our Proud <span>Accomplishments!</span>"
        sliderData={sliderData}
      />
      <GetQuote />
      <SupportService
        title="Support <span>Services</span>"
        supportdata={supportData}
      />
      <Subscribe />
      <WhatsappFixedIcon />
      <Footer />
    </>
  );
};

export default InteriorDesigning;
