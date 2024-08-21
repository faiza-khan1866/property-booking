import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { API } from "../../http/API";

const settings = {
  slidesToShow: 1,
  slidesToScroll: 1,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 4000,
  arrows: false,
  dots: true,
};

const Blogsidebar = ({ sliderImages }) => {
  useEffect(() => {
    getRecentFeedata();
  }, []);

  //Recent Feed page API
  const [recentFeedData, setRecentFeedData] = useState([]);

  const getRecentFeedata = () => {
    API.get(`/blogs`)
      .then((response) => {
        const data = response?.data?.filter(
          (x) => x?.route != window?.location?.pathname?.split("/")[2]
        );
        setRecentFeedData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  var options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return (
    <div className="sidebar">
      {/* Popular Post Widget */}
      {recentFeedData?.length > 0 && (
        <div className="widget popular-feeds mb-40">
          <h5 className="widget-title">Recent Feeds</h5>
          <div className="popular-feed-loop">
            {recentFeedData?.map((item, i) => (
              <div key={i} className="single-popular-feed">
                <div className="feed-img">
                  <img
                    src={item?.featured_img}
                    alt={item?.title}
                    className="img-fluid"
                  />
                </div>
                <div className="feed-desc">
                  <h6>
                    <Link to={`/blog/${item?.route}`}>
                      {item?.title?.slice(0, 40)}...
                    </Link>
                  </h6>
                  <span className="time">
                    <i className="far fa-calendar-alt" />{" "}
                    {new Date(item?.created_at).toLocaleDateString(
                      "en-US",
                      options
                    )}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Banner Ad Widget */}
      <Slider {...settings}>
        {sliderImages?.map((image, i) => (
          <div className="widget banner-ad-widget" key={i}>
            <img src={image} alt="banner" className="img-fluid" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Blogsidebar;
