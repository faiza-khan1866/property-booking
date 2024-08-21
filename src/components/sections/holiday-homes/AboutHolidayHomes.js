import React from "react";

const AboutHolidayHomes = ({ title, detail }) => {
  return (
    <section className="about-holiday pt-60">
      <div className="container">
        <div className="section-title mb-40">
          <h2
            data-aos="fade-right"
            data-aos-once="true"
            dangerouslySetInnerHTML={{ __html: title }}
          />
        </div>
        <div className="row justify-content-center">
          <div className="col-lg-10 col-md-10 col-sm-12">
            <div
              data-aos="fade-left"
              data-aos-once="true"
              dangerouslySetInnerHTML={{ __html: detail }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHolidayHomes;
