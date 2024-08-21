import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProudAccomplishment = ({ title, sliderData }) => {
  const settings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    dots: false,
    centerMode: true,
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
    <section className="property-area pt-60">
      <div className="container">
        <div className="section-title">
          <h2
            data-aos="fade-right"
            data-aos-once="true"
            dangerouslySetInnerHTML={{ __html: title }}
          ></h2>
        </div>
        <Slider className="row property-gird-loop mt-50" {...settings}>
          {sliderData?.map((item, i) => (
            <div key={i} className="col-lg-12">
              <div
                data-aos="fade-down"
                data-aos-once="true"
                className="property-box mt-30"
              >
                <div className="property-img-wrap">
                  <div
                    className="property-img"
                    style={{
                      backgroundImage: `url(${item?.featured_img})`,
                    }}
                  />
                </div>
                <div className="property-desc">
                  <h4 className="title">{item?.name}</h4>
                  <span className="location">{item?.location}</span>
                  <div className="text-right">
                    <Link
                      to={`/accomplishments/${item?.id}`}
                      className="read-btn"
                    >
                      Read More
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

export default ProudAccomplishment;
