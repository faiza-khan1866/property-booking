import React from "react";

const AccomplishmentsIntro = ({ title }) => {
  return (
    <section className="pt-60 pb-60">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title">
              <h2 data-aos="fade-right" data-aos-once="true">
                {title}
                {/* <span>- Palm Jumeirah</span> */}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccomplishmentsIntro;
