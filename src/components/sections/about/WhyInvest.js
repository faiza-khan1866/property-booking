import React from "react";

const WhyInvest = ({ investSection }) => {
  return (
    <section className="text-block">
      <div className="container">
        <div className="row" data-aos="fade-right" data-aos-once="true">
          <div className="col-lg-7 col-md-12 col-sm-12 mb-small">
            <div className="block-text ">
              <div className="section-title mb-20 ">
                <h2
                  dangerouslySetInnerHTML={{ __html: investSection?.title }}
                />
                <p className="pt-3">{investSection?.subtitle}</p>
              </div>
              <div
                style={{ textAlign: "justify" }}
                className="general_desc_style"
                dangerouslySetInnerHTML={{
                  __html: investSection?.description,
                }}
              />
            </div>
          </div>
          <div className="col-lg-5 col-md-12 col-sm-12">
            <img
              src={investSection?.featured_image}
              alt="img"
              className="img-fluid invest-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyInvest;
