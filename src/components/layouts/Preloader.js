import React, { Component } from "react";

class Preloader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchSuccess: false,
    };
  }

  componentDidMount() {
    // window.addEventListener("load", () => {
    //   this.setState({
    //     fetchSuccess: true,
    //   });
    // });

    setTimeout(() => {
      this.setState({
        fetchSuccess: true,
      });
    }, 1500);
  }
  render() {
    const preloaderhidden = this.state.fetchSuccess ? "d-none" : "";
    return (
      <div
        className={`preloader align-items-center justify-content-center ${preloaderhidden}`}
      >
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
  }
}

export default Preloader;
