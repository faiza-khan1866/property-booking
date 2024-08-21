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
import useHolidayHomesData from "../customHooks/useHolidayHomesData";
import Loader from "../layouts/commonLoader";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Banner from "../layouts/Banner";
import Subscribe from "../layouts/Subscribe";
import { API } from "../../http/API";

// Content components
import AboutHolidayHomes from "../sections/holiday-homes/AboutHolidayHomes";
import Property from "../sections/holiday-homes/Property";
import ListProperty from "../sections/holiday-homes/ListProperty";
import PricingPlan from "../sections/holiday-homes/PricingPlan";
import SupportService from "../sections/investment-advisory/SupportService";
import Projects from "../sections/investment-advisory/Projects";
import WhatsappFixedIcon from "../utils/WhatsappFixedIcon";

const HolidayHomes = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  const [sliderData, setSliderData] = useState([]);

  const getSliderHolidayHomesData = useCallback(() => {
    API.get("/find-holiday-homes")
      .then((response) => {
        setSliderData(response?.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    getSliderHolidayHomesData();
  }, [getSliderHolidayHomesData]);

  const { isLoading, error, data } = useHolidayHomesData();

  const metaDetails = useMemo(() => data?.content?.meta_details, [data]);
  const bannerSection = useMemo(() => data?.content?.banerSection, [data]);
  const aboutSection = useMemo(() => data?.content?.aboutSection, [data]);
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
      <AboutHolidayHomes
        title={aboutSection?.title}
        detail={aboutSection?.description}
      />
      <Property
        title="Find Your Perfect <span>Holiday Home</span>"
        sliderData={sliderData}
      />
      <ListProperty title="List Your <span>Property With Us!</span>" />
      <PricingPlan plansData={plansData} />
      <SupportService
        title="Why Choose <span>Us?</span>"
        supportdata={supportData}
      />
      <Projects title="Check Out Our <span>Project Highlights</span>" />
      <Subscribe />
      <WhatsappFixedIcon />
      <Footer />
    </>
  );
};

export default HolidayHomes;
