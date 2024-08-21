import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function NextArrow(props) {
  const { onClick } = props;
  return (
    <button className="nextArrow_wrape" onClick={onClick}>
      <i className="far fa-angle-right" />
    </button>
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <button className="prevArrow_wrape" onClick={onClick}>
      <i className="far fa-angle-left" />
    </button>
  );
}

const settings = {
  dots: false,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 4000,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  lazyLoad: "ondemand",
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
};

const AccomplishmentsDetails = ({ accomplishmentData }) => {
  return (
    <section className="locations-wrapper pt-60">
      <div className="container">
        <div className="locations-details">
          <div
            className={`row ${
              accomplishmentData?.slider_image?.length > 0 ? "row-cols-2" : ""
            }`}
          >
            <div className="col">
              <div className="location-text mb-small">
                <h2 className="title mb-10">{accomplishmentData?.title}</h2>
                <p className="subtitle mb-20">
                  {accomplishmentData?.sub_title}
                </p>
                <div
                  className="detail mb-20"
                  dangerouslySetInnerHTML={{
                    // __html: accomplishmentData?.description,
                    __html: accomplishmentData?.short_description,
                  }}
                />
              </div>
            </div>
            {accomplishmentData?.slider_image?.length > 0 && (
              <div className="col">
                <Slider {...settings}>
                  {accomplishmentData?.slider_image?.map((x, i) => (
                    <div className="thumb mb-3" key={i}>
                      <img
                        src={x}
                        alt={"img"}
                        style={{ height: "350px" }}
                        className="locationdetail_img w-100"
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center pt-60">
        <a href="mailto:tariq@carpediemdxb.com" className="main-btn btn-filled">
          Get In Touch
        </a>
      </div>
    </section>
  );
};

export default AccomplishmentsDetails;
