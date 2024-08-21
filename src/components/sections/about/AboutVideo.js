import React from "react";

const AboutVideo = ({ introData, founderData }) => {
  return (
    <section className="about-section pt-60 pb-60">
      <div className="container">
        <div
          className="about-detail pb-60 general_desc_style"
          dangerouslySetInnerHTML={{ __html: introData?.description }}
        />
        <div className="about-text-box">
          <div className="section-title mb-40">
            <h2>
              Meet Our <span>Founder</span>
            </h2>
          </div>
          <div
            className="row align-items-center"
            data-aos="fade-left"
            data-aos-once="true"
          >
            <div className="col-lg-4">
              <div>
                <img
                  src={founderData?.featured_image}
                  alt="img"
                  className="img-fluid about-img"
                />
              </div>
            </div>
            <div className="col-lg-8">
              <div className="about-text">
                <div
                  className="authordes general_desc_style wordbks"
                  dangerouslySetInnerHTML={{
                    __html: founderData?.description,
                  }}
                />
                <div className="social_media">
                  <h3>
                    Get In <span>Touch</span>
                  </h3>
                  <div className="social_link_wrape">
                    <a
                      href="https://www.facebook.com/Carpediemdxb"
                      target="_blank"
                      className="link_wrap"
                    >
                      <i className="fab fa-facebook-f" />
                    </a>
                    <a
                      href="https://www.instagram.com/carpediemdxb/"
                      target="_blank"
                      className="link_wrap"
                    >
                      <i className="fab fa-instagram" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/tariq-hussein-29a49940/"
                      target="_blank"
                      className="link_wrap"
                    >
                      <i className="fab fa-linkedin" />
                    </a>
                    <a
                      href="mailto:tariq@carpediemdxb.com"
                      target="_blank"
                      className="link_wrap"
                    >
                      <i className="fas fa-envelope" />
                    </a>
                    <a
                      href="https://wa.me/+971524735565"
                      target="_blank"
                      className="link_wrap"
                    >
                      <i className="fab fa-whatsapp" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutVideo;
