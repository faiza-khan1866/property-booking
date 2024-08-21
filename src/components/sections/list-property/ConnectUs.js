import React from "react";

const ConnectUs = () => {
  return (
    <section className="connect-us-area pt-60 pb-60">
      <div className="container">
        <div className="section-title mb-40">
          <h2>
            Connect with <span>Us</span>
          </h2>
        </div>
        {/* connect us Form */}
        <div className="connect-us-form">
          <form action="#">
            <div className="row">
              <div className="col-md-6">
                <div className="input-group mb-30">
                  <input type="text" required placeholder="Name" />
                </div>
                <div className="input-group mb-30">
                  <input type="email" required placeholder="Email Address" />
                </div>
                <div className="input-group mb-30">
                  <input type="text" required placeholder="Contact Number" />
                </div>
              </div>
              <div className="col-md-6">
                <div className="input-group textarea mb-30">
                  <textarea
                    type="text"
                    placeholder="Write here..."
                    style={{ resize: "none" }}
                  />
                </div>
                <div className="text-center">
                  <button type="submit" className="main-btn btn-filled">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ConnectUs;
