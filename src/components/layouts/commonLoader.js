import React from "react";

const commonLoader = () => {
  return (
    <div className={`preloader align-items-center justify-content-center`}>
      <div className="cssload-container">
        <div className="cssload-loading">
          <i />
          <i />
          <i />
          <i />
        </div>
      </div>
    </div>
  );
};

export default commonLoader;
