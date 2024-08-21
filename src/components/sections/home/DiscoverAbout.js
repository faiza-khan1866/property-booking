import React, { useState } from "react";
import { Link } from "react-router-dom";
import dummyimg from "../../../assets/dummyimg.webp";

const DiscoverAbout = ({ aboutData }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <section className="text-block with-bg pt-60">
      <div className="container">
        <div className="row align-items-center justify-content-lg-between">
          <div className="col-lg-6 col-md-12 col-sm-12">
            <figure className="mb-small">
              <img
                src={
                  isImageLoaded &&
                  `${process.env.PUBLIC_URL}/assets/img/home/about.webp`
                    ? `${process.env.PUBLIC_URL}/assets/img/home/about.webp`
                    : dummyimg
                }
                alt="About image"
                onLoad={() => setIsImageLoaded(true)}
              />
            </figure>
          </div>
          <div
            className="col-lg-6 col-md-12 col-sm-12"
            data-aos="fade-up"
            data-aos-once="true"
          >
            <div className="block-text ">
              <div className="section-title mb-20">
                {/* <h2 dangerouslySetInnerHTML={{ __html: aboutData?.title }} /> */}
                <h2>
                  Vacation Rentals with a Personal <br /> <span>Touch.</span>
                </h2>
              </div>
              <p
                style={{ textAlign: "justify" }}
                className="general_desc_style"
                // dangerouslySetInnerHTML={{
                //   __html: aboutData?.description,
                // }}
              >
                At Carpe Diem Lifestyle, we are all about helping people achieve
                their dreams. We offer short- and long-term rental homes perfect
                for your holiday needs. We also offer management and advisory
                services for property owners and investors looking to maximize
                returns in the real estate market.
              </p>
              <p>
                The perfect combination of flawless service, top-notch amenities
                and exclusive real estate expertise has made Carpe Diem
                Lifestyle one of Dubai's premier home rental companies
              </p>
              <Link to="/about" className="main-btn btn-filled mt-40">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscoverAbout;
