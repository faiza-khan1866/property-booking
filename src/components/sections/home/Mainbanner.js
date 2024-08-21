import React from "react";
import SearchFilter from "../../layouts/SearchFilter";
import { useState } from "react";
import { useEffect } from "react";

const Mainbanner = ({ bannerData }) => {
  const handleScrollToPartners = () => {
    const bottomEle = document.getElementById("partners");
    bottomEle.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  };
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [heightSet, setheightSet] = useState(650);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(window.innerWidth);
    };
    if (window.innerWidth >= 1000) return setheightSet(650);
    if (window.innerWidth <= 990 && window.innerWidth >= 765)
      return setheightSet(800);
    if (window.innerWidth <= 765) return setheightSet(450);

    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  });

  return (
    <div className="home-banner-area banner-style-two" id="bannerSlider">
      <div
        className="single-banner d-flex align-items-center justify-content-center"
        style={{ height: heightSet }}
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div
                data-aos="fade-down"
                data-aos-once="true"
                className="banner-content text-center"
              >
                <h1 className="title">DISCOVER A DIFFERENT WORLD</h1>
                <span className="promo-tag">with Carpe Diem Lifestyle</span>
                <div
                  data-aos="fade-up"
                  data-aos-once="true"
                  className="search-filter desktop-search"
                >
                  <SearchFilter />
                </div>
                <div className="our-partners">
                  <div
                    data-aos="zoom-out"
                    data-aos-once="true"
                    className="partdiv"
                    onClick={handleScrollToPartners}
                  >
                    In Collaboration with
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* banner bg */}
        <div
          className="banner-bg"
          style={{
            backgroundImage:
              "url(" +
              process.env.PUBLIC_URL +
              "/" +
              "assets/img/banner/homebanner.webp" +
              ")",
          }}
        />
        <div className="banner-overly" />
      </div>
    </div>
  );
};

export default React.memo(Mainbanner);
