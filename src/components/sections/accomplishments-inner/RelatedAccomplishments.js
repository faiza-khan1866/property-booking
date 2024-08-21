import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const RelatedAccomplishments = ({ relatedData, id }) => {
  if (relatedData.length <= 0) {
    return;
  }
  const settings = {
    slidesToShow: relatedData.length - 1,
    slidesToScroll: 1,
    infinite: true,
    autoplay: false,
    autoplaySpeed: 4000,
    speed: 4000,
    arrows: false,
    dots: false,
    cssEase: "linear",
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
          <h2>
            You May also <span>Like</span>
          </h2>
        </div>
        {/* Projects Looop */}
        <Slider className="row project-grid-loop mt-50" {...settings}>
          {relatedData?.map((item, i) => (
            <div key={i} className="col-lg-12">
              <div className="project-box">
                <figure>
                  <img src={item?.featured_img} alt="project thumbnail" />
                </figure>
                <div className="project-desc">
                  <h4 className="title">{item?.title}</h4>
                  {/* <p className="subtitle">540 Sq.Ft.</p> */}
                  <div className="text-right">
                    <Link
                      to={`/accomplishments/${id}/${item?.route}`}
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

export default RelatedAccomplishments;
