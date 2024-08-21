import React from "react";

const Intro = ({ title, description }) => {
  return (
    <section className="pt-60">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title">
              <h2
                className="mb-40"
                dangerouslySetInnerHTML={{ __html: title }}
              />
              <div
                className="mb-20 introdetail"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Intro;
