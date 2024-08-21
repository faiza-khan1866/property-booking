import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import { LazyLoadImage } from "react-lazy-load-image-component";
// import PlaceholderImage from "../../../assets/placeholder2.png";

const partnersData = [
  {
    url: "assets/img/clients/logo1.png",
  },
  {
    url: "assets/img/clients/logo2.webp",
  },
  {
    url: "assets/img/clients/logo3.webp",
  },
  {
    url: "assets/img/clients/logo4.png",
  },
  {
    url: "assets/img/clients/logo5.webp",
  },
];

const Partners = () =>
  // { partnersData }
  {
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
      <div id="partners" className="our-partners mt-60">
        <div className="container">
          <h2 data-aos="fade-up" data-aos-once="true">
            In <span>Collaboration</span> with
          </h2>
          <Slider className="row" {...settings}>
            {partnersData?.map((x, i) => (
              <div
                data-aos="fade-down"
                data-aos-once="true"
                key={i}
                className="col-lg-12 text-center"
              >
                {/* <LazyLoadImage
                  alt="img"
                  src={x?.url} // use normal <img> attributes as props
                  PlaceholderSrc={PlaceholderImage}
                /> */}
                <img
                  src={x?.url}
                  alt="img"
                  className="img-fluid"
                  loading="lazy"
                  height={255}
                  width={255}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    );
  };

export default Partners;
