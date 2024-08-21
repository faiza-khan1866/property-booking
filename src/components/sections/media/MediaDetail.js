import React from "react";

const MediaDetail = ({ mediaDetail }) => {
  return (
    <section className="media-section pt-60">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 mb-small">
            <img
              data-aos="fade-right"
              data-aos-once="true"
              src={mediaDetail?.featured_img}
              alt="media"
              className="img-fluid"
            />
          </div>
          <div className="col-lg-6">
            <div
              data-aos="fade-left"
              data-aos-once="true"
              className="media-text"
            >
              <div className="section-title mb-30 text-center">
                <h2>{mediaDetail?.title}</h2>
              </div>
              <div
                className="detail"
                dangerouslySetInnerHTML={{
                  __html: mediaDetail?.description,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default MediaDetail;
