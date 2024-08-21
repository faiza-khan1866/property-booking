import React from "react";
import { Link } from "react-router-dom";

const SupportService = ({ title, supportdata }) => {
  return (
    <section className={`support-area`}>
      <div className="container">
        <div className="section-title mb-50">
          <h2
            data-aos="fade-right"
            data-aos-once="true"
            dangerouslySetInnerHTML={{ __html: title }}
          ></h2>
        </div>
        <ul className="row justify-content-center">
          {supportdata?.map((item, i) => (
            <li
              data-aos="fade-up"
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
export default SupportService;
