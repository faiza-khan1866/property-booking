import React from "react";
import { Link } from "react-router-dom";

const Benefits = ({ benefitsdata }) => {
  return (
    <section className="benefits-area pt-60">
      <div className="container">
        <div className="section-title mb-50">
          <h2 data-aos="fade-right" data-aos-once="true">
            Benefits Of <span>Working With Us</span>
          </h2>
        </div>
        <ul className="row justify-content-center">
          {benefitsdata?.map((item, i) => (
            <li
              data-aos="fade-down"
              data-aos-once="true"
              className="col-lg-3 col-md-3 col-sm-4 col-6"
            >
              <Link key={i} className="nav-link">
                <img src={item?.icon} alt="icon" className="img-fluid" />
                <span
                  className="title"
                  dangerouslySetInnerHTML={{ __html: item?.title }}
                ></span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Benefits;
