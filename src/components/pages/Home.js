import React, { useEffect, useMemo } from "react";
import { Helmet } from "react-helmet";
import { useInView } from "react-intersection-observer";
import AOS from "aos";
import "aos/dist/aos.css";
import useHomeData from "../customHooks/useHomeData";
import Loader from "../layouts/commonLoader";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import SearchFilter from "../layouts/SearchFilter";
import Partners from "../sections/home/Partners";
import DiscoverAbout from "../sections/home/DiscoverAbout";
import Areas from "../sections/home/Areas";
import Services from "../sections/home/Services";
import WhyChoose from "../sections/home/WhyChoose";
import Testimonials from "../sections/home/Testmonials";
import WhatsappFixedIcon from "../utils/WhatsappFixedIcon";
import BannerVideo from "../sections/home/BannerVideo";

const Home = () => {
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
  });

  useEffect(() => {
    AOS.init();
  }, []);

  const { isLoading, error, data } = useHomeData();

  const metaDetails = useMemo(
    () => ({
      title: data?.page?.content?.meta_details?.title || "Carpe Diem | Home",
      description:
        data?.page?.content?.meta_details?.description || "Carpe Diem",
    }),
    [data]
  );

  if (isLoading) return <Loader />;
  if (error) return <div>Error: {error.message || "An error occurred"}</div>;

  return (
    <>
      <Helmet>
        <title>{metaDetails.title}</title>
        <meta name="description" content={metaDetails.description} />
      </Helmet>
      <Header />
      <BannerVideo />
      <Partners />
      <div className="search-filter mobile-search pt-60 pb-20">
        <div className="container">
          <SearchFilter />
        </div>
      </div>
      <DiscoverAbout />
      <div ref={ref} style={{ minHeight: "140px" }}>
        {inView && (
          <>
            <Areas categoriesData={data?.categories} isLoading={isLoading} />
            <Services />
            <WhyChoose />
            <Testimonials
              testimonialsData={data?.testimonials}
              isLoading={isLoading}
            />
          </>
        )}
      </div>
      <WhatsappFixedIcon />
      <Footer />
    </>
  );
};

export default React.memo(Home);
