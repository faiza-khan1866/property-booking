import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Clients = ({ partnersData }) => {
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
    <section className="cleint-section pt-60">
      <div className="container">
        {/* Section Title */}
        <div className="section-title mb-40">
          <h2 data-aos="fade-right" data-aos-once="true">
            Our Prestigious <span>Clients</span>
          </h2>
        </div>
        <p data-aos="fade-up" data-aos-once="true" className="clientdes">
          Carpe Diem is a team of passionate professionals dedicated to
          delivering exceptional services in the field of property management
          and leasing in Dubai. Led by the founder Tariq Hussein, the team
          brings together a wealth of expertise and knowledge in the industry,
          coupled with a client-centric approach to ensure that every client's
          unique needs are met. With a focus on transparency, efficiency, and
          innovation, Carpe Diem is committed to delivering the best possible
          outcomes for their clients, and building long-lasting relationships
          based on trust and reliability.
        </p>
        <Slider className="row mt-30" {...settings}>
          {partnersData?.map((x, i) => (
            <div
              data-aos="fade-up"
              data-aos-once="true"
              key={i}
              className="col-lg-12 text-center"
            >
              <img src={x?.url} alt="img" className="img-fluid" />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Clients;
