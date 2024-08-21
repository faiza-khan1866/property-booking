import React from "react";

const WhyChoose = ({ whychooseData }) => {
  return (
    <section className="welcome-section pt-60 pb-60">
      <div className="container">
        <div className="row justify-content-center align-items-center">
          <div
            className="col-lg-12 col-md-12 col-sm-12"
            data-aos="fade-up"
            data-aos-once="true"
          >
            <div className="section-title mb-40">
              {/* <h2 dangerouslySetInnerHTML={{ __html: whychooseData?.title }} /> */}
              <h2>
                Why Choose <span>Us?</span>
              </h2>
            </div>
            {/* <p
              dangerouslySetInnerHTML={{ __html: whychooseData?.description }}
            /> */}
            <p>
              Carpe Diem Lifestyle is a Dubai-based company that offers you a
              one-stop solution for all your property-related needs. Our
              licensed holiday home provider status means you can rest assured
              that we are trustworthy, and reliable and will come through with
              all your expectations. We offer a one-stop solution for all the
              people looking to invest in Dubai real estate as we not only
              provide investment advisory services but also provide management
              solutions for your property. Our knowledge of the industry is
              backed up by our own personal experience, which allows us to give
              you advice that can help you find the perfect investment
              opportunity.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(WhyChoose);
