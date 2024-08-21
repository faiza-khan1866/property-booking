import React from "react";

const About = ({ aboutdata }) => {
  return (
    <section className="about-list-property pt-60">
      <div className="container">
        <div className="section-title mb-40">
          <h2
            data-aos="fade-right"
            data-aos-once="true"
            dangerouslySetInnerHTML={{ __html: aboutdata?.title }}
          />
        </div>
        <div
          data-aos="fade-left"
          data-aos-once="true"
          dangerouslySetInnerHTML={{ __html: aboutdata?.description }}
        />
      </div>
    </section>
  );
};

export default About;
