import React from "react";

const AboutService = ({ aboutdata }) => {
  return (
    <section className="about-service pt-60">
      <div className="container">
        <div className="row">
          <div className="col-lg-7">
            <div className="about-text mb-small">
              <h2
                data-aos="fade-right"
                data-aos-once="true"
                className="title mb-40"
                dangerouslySetInnerHTML={{ __html: aboutdata?.title }}
              />
              <div
                data-aos="fade-down"
                data-aos-once="true"
                className="mb-20"
                dangerouslySetInnerHTML={{ __html: aboutdata?.description }}
              />
            </div>
          </div>
          <div className="col-lg-5">
            <img
              data-aos="fade-left"
              data-aos-once="true"
              src={aboutdata?.featured_image}
              alt="image"
              className="img-fluid"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutService;
