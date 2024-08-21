import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MySwalFire from "../../utils/MySwalFire";

const OurTeam = ({ teamsData }) => {
  const settings = {
    slidesToShow: 2,
    slidesToScroll: 1,
    infinite: false,
    autoplay: false,
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
      {
        breakpoint: 200,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const handleReadMorePop = (item) => {
    MySwalFire(
      {
        html:
          ` <h5 class="popDIalog_heading">${item?.name}</h5>` +
          `<br/>` +
          `<div class="text-left popDIalog_paragraph">${item.description}</div>`,
        background: "#f1f1f1",
        // background:
        //   "linear-gradient(247deg, #9fd6f9 0%, #7db4dc 35%, #0070bb 100%)",
        showConfirmButton: false,
        showCancelButton: true,
        cancelButtonColor: "#d33",
        cancelButtonText: "Close",
      },
      true
    );
  };

  return (
    <section id="ourTeam" className="team-section pt-60 pb-60">
      <div className="container">
        {/* Section Title */}
        <div className="section-title mb-40">
          <h2 data-aos="fade-right" data-aos-once="true">
            Our <span>Team</span>
          </h2>
        </div>
        <p data-aos="fade-up" data-aos-once="true" className="clientdes">
          At Carpe Diem, we have had the pleasure of working with a diverse
          range of clients, including some of the biggest names in the
          hospitality & real estate sector. We have built lasting relationships
          with our clients based on trust, reliability, and excellence in
          service. Our commitment to providing the best possible experience to
          our clients is at the heart of everything we do at Carpe Diem.
        </p>
        <div
          data-aos="zoom-in"
          data-aos-once="true"
          className="ourTeamCards mt-30"
        >
          {teamsData?.map((item, i) => (
            <div className="cardContainer" key={i * 3}>
              <div className="card">
                <div className="imgBx">
                  <img
                    src={item?.featured_img}
                    alt="img"
                    className="img-fluid"
                  />
                </div>
                <div className="cardFooter">
                  <div className="footerDetails">
                    <h4>{item?.name}</h4>
                    <p>{item?.designation}</p>
                  </div>

                  <div className="social">
                    <p
                      onClick={() => handleReadMorePop(item)}
                      className="ReadMoreStyle"
                    >
                      Read More
                    </p>
                    <ul>
                      <li>
                        <a href={`mailto:${item?.email}`}>
                          <i className="far fa-envelope"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Slider
          data-aos="zoom-in"
          data-aos-once="true"
          className="row mt-30 mobileVIew"
          {...settings}
        >
          {teamsData?.map((item, i) => (
            <div className="cardContainer col-lg-12" key={i * 3}>
              <div className="card">
                <div className="imgBx">
                  <img
                    src={item?.featured_img}
                    alt="img"
                    className="img-fluid"
                  />
                </div>
                <div className="cardFooter">
                  <div className="footerDetails">
                    <h4>{item?.name}</h4>
                    <p>{item?.designation}</p>
                  </div>

                  <div className="social">
                    <p
                      onClick={() => handleReadMorePop(item)}
                      className="ReadMoreStyle"
                    >
                      Read More
                    </p>
                    <ul>
                      <li>
                        <a href={`mailto:${item?.email}`}>
                          <i className="far fa-envelope"></i>
                        </a>
                      </li>
                    </ul>
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

export default OurTeam;
