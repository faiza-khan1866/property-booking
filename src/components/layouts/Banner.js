import React from "react";

const Banner = ({ breadcrumb }) => {
  return (
    <section
      className="banner-area"
      style={{
        backgroundImage: "url(" + process.env.PUBLIC_URL + breadcrumb.img + ")",
      }}
    >
      <div className="container">
        <div data-aos="fade-right" data-aos-once="true" className="banner-text">
          <h2 className="page-title">{breadcrumb.pagename}</h2>
        </div>
      </div>
    </section>
  );
};
export default Banner;
