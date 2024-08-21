import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Media = ({ mediaData, isLoading }) => {
  return;
  const settings = {
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    dots: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  return (
    <section className="instagram-feed-section pt-60">
      <div className="container">
        <div className="section-title mb-40">
          <h2 data-aos="fade-right" data-aos-once="true">
            Media <span>Section</span>
          </h2>
        </div>
      </div>
      <div className="container-fluid p-0">
        {isLoading ? (
          "loading..."
        ) : (
          <Slider className="instagram-slider" {...settings}>
            {mediaData?.map((item, i) => (
              <div
                data-aos="fade-up"
                data-aos-once="true"
                key={i}
                className="image"
              >
                <Link to={`/media/${item?.route}`} className="insta-popup">
                  <img src={item?.featured_img} alt="media img" className="img-fluid" />
                </Link>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </section>
  );
};
export default React.memo(Media);
