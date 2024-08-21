import React from "react";
import { Link } from "react-router-dom";

const servicesData = [
  {
    id: 1,
    title: "Holiday Homes",
    link: "/holiday-homes",
    detail:
      "Carpe Diem Lifestyle prides itself on holiday home rental services. No matter what you are looking for; whether it be a romantic escape or rejuvenating family holiday, we have something unique to offer. We not only provide accommodations for rental needs but also provide management services to property owners and investors in the real estate market.",
    gridimage: "/assets/img/home/service1.webp",
  },
  {
    id: 2,
    title: "Investment Advisory",
    link: "/investment-advisory",
    detail:
      "Carpe Diem Lifestyle is here to help you make the most out of your money. We carefully define and then craft your investment strategy, leaving you with a customized, hands-on solution that meets your needs and goals. Our management services are designed to help you maximize the financial returns on your real estate investments.",
    gridimage: "/assets/img/home/service2.webp",
  },
  {
    id: 3,
    title: "Interior Designing",
    link: "/interior-design",
    detail:
      "Carpe Diem Lifestyle offers an exclusive in-house interior design service for holiday homes. Our professionals will work with you to customize the overall look of your property and ensure that it complements your listing photos. By combining our knowledge of interior design and decorating, with an unrelenting desire to improve each home, we create a property that is as beautiful on the inside as it is out.",
    gridimage: "/assets/img/home/service3.webp",
  },
];

const Services = () =>
  // { servicesData }
  {
    return (
      <section className="core-feature-section bg-white pt-60 pb-60">
        <div className="container">
          <div className="section-title mb-40">
            <h2 data-aos="fade-right" data-aos-once="true">
              Our <span>Services</span>
            </h2>
          </div>
          {/* Featre Loop */}
          <div className="row features-loop">
            {servicesData &&
              servicesData?.map((x, i) => (
                <div
                  className="col-lg-4 col-sm-6"
                  key={i}
                  data-aos="zoom-in"
                  data-aos-once="true"
                >
                  <div className="feature-box with-hover-img">
                    <span className="count">0{i + 1}</span>
                    <h3>
                      <Link to={x?.link}>{x?.title}</Link>
                    </h3>
                    {/* <p dangerouslySetInnerHTML={{ __html: x?.description }} /> */}
                    <p>{x?.detail}</p>
                    <div
                      className="hover-img"
                      // style={{
                      //   backgroundImage: `url(${x?.featured_image})`,
                      // }}
                      style={{
                        backgroundImage: `url(${
                          process.env.PUBLIC_URL + x.gridimage
                        })`,
                      }}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    );
  };

export default Services;
