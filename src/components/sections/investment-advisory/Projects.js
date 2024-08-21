import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { API } from "../../../http/API";

const Projects = ({ title }) => {
  const settings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    dots: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  useEffect(() => {
    getProjectsData();
  }, []);

  //Projects page API
  const [projectsData, setProjectsData] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const getProjectsData = () => {
    API.get(`/front-project-highlights`)
      .then((response) => {
        const data = response?.data;
        setProjectsData(data);
        setIsloading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className="project-area pt-60">
      <div className="container">
        {/* Section Title */}
        <div className="section-title mb-50">
          <h2
            data-aos="fade-right"
            data-aos-once="true"
            dangerouslySetInnerHTML={{ __html: title }}
          ></h2>
        </div>
        {/* Projects Looop */}
        {!isLoading && (
          <>
            <Slider className="row project-grid-loop mt-50" {...settings}>
              {projectsData?.map((item, i) => (
                <div
                  data-aos="fade-down"
                  data-aos-once="true"
                  key={i}
                  className="col-lg-12"
                >
                  <div className="project-box">
                    <figure>
                      <img
                        src={
                          item?.areas?.categories?.properties?.images?.[0]?.url
                        }
                        alt="project thumbnail"
                      />
                    </figure>
                    <div className="project-desc">
                      <h4 className="title">
                        {/* {item?.areas?.short_description} */}
                        {item?.areas?.categories?.properties?.name}
                      </h4>
                      <div className="text-right">
                        <Link
                          to={`/properties/${item?.areas?.categories?.properties?.route}/${item?.areas?.categoryId}`}
                          className="know-more-btn mt-20"
                        >
                          Know More{" "}
                          <i className="far fa-angle-double-right"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </>
        )}
      </div>
    </section>
  );
};
export default Projects;
