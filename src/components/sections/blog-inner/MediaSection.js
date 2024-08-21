import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../../layouts/Loader";
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
  slidesToShow: 3,
  slidesToScroll: 1,
  cssEase: "linear",
  lazyLoad: "ondemand",
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
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

const MediaSection = ({ title, mediaData }) => {
  const [items, setItems] = useState(mediaData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setItems(mediaData);
  }, [mediaData]);

  var options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <section className="blog-section pt-60">
      <div className="container">
        <div className="section-title">
          <h2 dangerouslySetInnerHTML={{ __html: title }}></h2>
        </div>
        <Slider className="row room-gird-loop mt-50" {...settings}>
          {/* Post Start */}
          {loading === false ? (
            items?.map((item, i) => (
              <div key={i} className="col-lg-12">
                <div className="blog-box">
                  <div
                    className="blog-img"
                    style={{
                      backgroundImage: `url(${item?.featured_img})`,
                    }}
                  />
                  <div className="blog-desc">
                    <div className="blog-meta">
                      <span>
                        <i className="fal fa-calendar-alt" />
                        {new Date(item?.created_at).toLocaleDateString(
                          "en-US",
                          options
                        )}
                      </span>
                      <span>
                        <i className="fal fa-user" />
                        By {item?.posted_by}
                      </span>
                    </div>
                    <h4>
                      <Link to={`/media/${item?.route}`}>{item?.title}</Link>
                    </h4>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: item?.short_description?.slice(0, 100),
                      }}
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <Loader />
          )}
          {/* Post End */}
        </Slider>
      </div>
    </section>
  );
};

export default MediaSection;
