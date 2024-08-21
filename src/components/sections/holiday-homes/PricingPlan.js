import React from "react";
import Button from "react-bootstrap/Button";
const PricingPlan = ({ plansData }) => {
  return (
    <section className="pricing-plan-area pt-60 pb-60">
      <div className="container">
        <div className="section-title mb-40">
          <h2>
            Discover Our <span>Pricing Plan</span>
          </h2>
        </div>
        <div className="row">
          {plansData?.map((item, i) => (
            <div
              key={i}
              className="col-lg-4"
              data-aos="fade-up"
              data-aos-once="true"
            >
              <div className="pricing-box mt-30">
                <div className="pricing-desc">
                  {i == 0 && (
                    <>
                      <div className="mainimg">
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/" +
                            "assets/img/icon/meetingColor.png"
                          }
                          alt="icon"
                          className="img-fluid"
                        />
                      </div>
                      <div className="hoverimg">
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/" +
                            "assets/img/icon/meeting.png"
                          }
                          alt="icon"
                          className="img-fluid"
                        />
                      </div>
                    </>
                  )}
                  {i == 1 && (
                    <>
                      <div className="mainimg">
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/" +
                            "assets/img/icon/money-makingColor.png"
                          }
                          alt="icon"
                          className="img-fluid"
                        />
                      </div>
                      <div className="hoverimg">
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/" +
                            "assets/img/icon/money-making.png"
                          }
                          alt="icon"
                          className="img-fluid"
                        />
                      </div>
                    </>
                  )}
                  {i == 2 && (
                    <>
                      <div className="mainimg">
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/" +
                            "assets/img/icon/serviceColor.png"
                          }
                          alt="icon"
                          className="img-fluid"
                        />
                      </div>
                      <div className="hoverimg">
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/" +
                            "assets/img/icon/service.png"
                          }
                          alt="icon"
                          className="img-fluid"
                        />
                      </div>
                    </>
                  )}
                  <h4 className="title">{item?.title}</h4>
                  <p className="price">{item?.subtitle}</p>
                  <div
                    id="PriceDiscriptions"
                    dangerouslySetInnerHTML={{ __html: item?.description }}
                  />
                  <Button
                    href={`mailto:tariq@carpediemdxb.com?subject=${item?.title}&body=${item?.description}`}
                    target="_blank"
                    className="main-btn btn-border"
                  >
                    Send Request
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingPlan;
