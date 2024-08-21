import React, { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import dummyimg from "../../../assets/dummyimg.webp";

const Areas = ({ categoriesData, isLoading }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

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
    <section className="feature-room-section pt-60">
      <div className="container">
        <div className="row align-items-center">
          <div
            className="col-lg-12 col-md-12 col-sm-12"
            data-aos="fade-down"
            data-aos-once="true"
          >
            <div className="section-title">
              <h2 className="mb-4">
                A Luxury Experience At <span>Affordable Prices</span>
              </h2>
              <p>
                Carpe Diem Lifestyle offers an ultimate luxury experience at
                affordable prices. Our unique and innovative packages provide
                you with magnificent luxury holiday homes in the most beautiful
                locations of Dubai. Carpe Diem Lifestyle recognizes that each
                one of you has different needs, and also wants to accommodate
                each and every one of them. Our focus is to offer you
                exceptional yet affordable location options. Our homes cater to
                all budgets, whether you're looking for luxury living in Dubai
                or a more modest residence with a variety of price points
              </p>
            </div>
          </div>
        </div>
        {/* Properties Looop */}
        {isLoading ? (
          "loading..."
        ) : (
          <Slider className="row room-gird-loop mt-50" {...settings}>
            {categoriesData?.map((item, i) => (
              <div
                data-aos="fade-down"
                data-aos-once="true"
                key={i}
                className="col-lg-12"
              >
                <div className="room-box">
                  <figure>
                    <img
                      src={
                        isImageLoaded && item?.properties?.images?.[0]?.url
                          ? item?.properties?.images?.[0]?.url
                          : dummyimg
                      }
                      alt="Area image"
                      onLoad={() => setIsImageLoaded(true)}
                    />
                  </figure>
                  <div className="room-desc">
                    <h4 className="title">
                      <Link
                        to={`/properties/${item?.properties?.route}/${item?.id}`}
                      >
                        {item?.short_description}
                      </Link>
                    </h4>
                    <Link
                      to={`/properties/${item?.properties?.route}/${item?.id}`}
                      className="main-btn btn-filled mt-20"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </section>
  );
};
export default React.memo(Areas);
