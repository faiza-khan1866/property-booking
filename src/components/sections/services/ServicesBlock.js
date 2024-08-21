import React from "react";
import { Link } from "react-router-dom";

const ServicesBlock = ({ servicesData }) => {
  return (
    <div className="container">
      <section className="service-area">
        <div className="section-title mb-50">
          <h2 data-aos="fade-right" data-aos-once="true">
            Services We <span>Provide</span>
          </h2>
        </div>
        <div className="container">
          <div className="service-boxes-loop">
            {servicesData?.map((item, i) => (
              <div key={i} className="service-box">
                <div className="service-desc">
                  <div className="row justify-content-between">
                    <div
                      data-aos="fade-right"
                      data-aos-once="true"
                      className="col-lg-5 mb-small"
                    >
                      <img
                        src={item?.featured_image}
                        alt="img"
                        className="img-fluid"
                      />
                    </div>
                    <div
                      className={`col-lg-7 ${
                        (i + 1) % 2 === 0 && "order-lg-first"
                      }`}
                    >
                      <div className="service-text">
                        <h2
                          data-aos="fade-down"
                          data-aos-once="true"
                          className="title mb-30"
                        >
                          {item?.title}
                        </h2>
                        <div
                          data-aos="fade-up"
                          data-aos-once="true"
                          className="mb-20"
                          dangerouslySetInnerHTML={{
                            __html: item?.description,
                          }}
                        />
                        <div
                          data-aos="fade-up"
                          data-aos-once="true"
                          className="text-center"
                        >
                          <Link to={item?.link} className="main-btn btn-filled">
                            Read More
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesBlock;
