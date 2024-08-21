import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const RelatedProperties = ({ relatedData }) => {
  const settings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: false,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    dots: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <section className="project-area pt-60">
      <div className="container">
        {/* Section Title */}
        <div className="section-title mb-50">
          <h2 data-aos="fade-right" data-aos-once="true">
            You May also <span>Like</span>
          </h2>
        </div>
        {/* Projects Looop */}
        <Slider className="row project-grid-loop mt-50" {...settings}>
          {relatedData?.map((item, i) => (
            <div
              data-aos="fade-down"
              data-aos-once="true"
              key={i}
              className="col-lg-12"
            >
              <div className="project-box">
                <figure>
                  <img src={item?.images[0]?.url} alt="project thumbnail" />
                </figure>
                <div className="project-desc">
                  <h4 className="title">{item?.name}</h4>
                  {/* <p className="subtitle">540 Sq.Ft.</p> */}
                  <div className="text-right">
                    <Link
                      to={`/properties/${item?.route}`}
                      className="know-more-btn mt-20"
                    >
                      Know More <i className="far fa-angle-double-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};
export default RelatedProperties;
