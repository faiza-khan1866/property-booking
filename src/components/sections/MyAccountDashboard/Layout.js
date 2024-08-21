import React from "react";
import Sidebar from "./Sidebar";
const Layout = (props) => {
  return (
    <>
      <section className="my_account_area pt-60 pb-60">
        <div className="container">
          <div className="row">
            <Sidebar />
            <div className="col-sm-12 col-md-12 col-lg-9">
              <div className="tab-content dashboard_content">
                <div className="tab-pane fade show active" id="dashboard">
                  {props.children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Layout;
