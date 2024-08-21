import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReactStars from "react-rating-stars-component";

const Testmonials = ({ testimonialsData, isLoading }) => {
  const settings = {
    slidesToShow: 3,
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
    <section className="testimonial-section pt-60">
      <div className="container">
        <div className="section-title mb-40">
          <h2 data-aos="fade-right" data-aos-once="true">
            Client <span>Feedback</span>
          </h2>
        </div>
        {/* testimonials loop  */}
        {isLoading ? (
          "loading..."
        ) : (
          <Slider className="row testimonial-slider" {...settings}>
            {testimonialsData &&
              testimonialsData.map((item, i) => (
                <div
                  key={i}
                  className="col-lg-12"
                  data-aos="fade-up"
                  data-aos-once="true"
                >
                  <div className="testimonial-box">
                    <div className="client-img">
                      <img
                        src={item?.featured_img}
                        alt={item?.name}
                        className="img-fluid"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="client-title">{item?.name}</h3>
                    <div className="d-flex justify-content-center align-items-center">
                      <ReactStars
                        count={5}
                        edit={false}
                        size={24}
                        isHalf={true}
                        value={item?.rating}
                        emptyIcon={<i className="far fa-star"></i>}
                        halfIcon={<i className="fa fa-star-half-alt"></i>}
                        fullIcon={<i className="fa fa-star"></i>}
                        activeColor="#F8B101"
                        classNames="rating_bar"
                      />
                    </div>

                    <p className="date">{item?.date}</p>
                    <span className="clinet-post">{item?.designation}</span>
                    <div
                      dangerouslySetInnerHTML={{ __html: item?.description }}
                      className="comment"
                    />
                  </div>
                </div>
              ))}
          </Slider>
        )}
      </div>
    </section>
  );
};

export default React.memo(Testmonials);
