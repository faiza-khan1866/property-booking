import React from "react";

const ContactIntro = ({ contactInfo }) => {
  return (
    <section className="contact-part pt-60">
      <div className="container">
        {/* Contact Info */}
        <div className="contact-info">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-sm-6 col-10">
              <div
                data-aos="fade-down"
                data-aos-once="true"
                className="info-box"
              >
                <div className="icon">
                  <i className="fa fa-home" />
                </div>
                <div className="desc">
                  <h4>Office Address</h4>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: contactInfo?.address,
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 col-10">
              <div data-aos="fade-up" data-aos-once="true" className="info-box">
                <div className="icon">
                  <i className="fa fa-phone" />
                </div>
                <div className="desc">
                  <h4>Phone Number</h4>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: contactInfo?.phone,
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-sm-6 col-10">
              <div
                data-aos="fade-down"
                data-aos-once="true"
                className="info-box"
              >
                <div className="icon">
                  <i className="fas fa-envelope" />
                </div>
                <div className="desc">
                  <h4>Email Address</h4>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: contactInfo?.email,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactIntro;
