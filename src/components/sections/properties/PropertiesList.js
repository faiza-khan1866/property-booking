import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../layouts/Loader";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import dummyimg from "../../../assets/dummyimg.webp";

const PropertiesList = () => {
  const items = useSelector((state) => state?._todoProperties?._properties);
  // const [items, setItems] = useState(rooms);
  const [loading, setLoading] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  // pagination code start
  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 6;
  const pagesVisited = pageNumber * usersPerPage;

  const displayItems = items
    ?.slice(pagesVisited, pagesVisited + usersPerPage)
    ?.map((item, i) => {
      return (
        <div className="col-lg-4 col-md-6 col-sm-12 mb-4" key={i}>
          <div
            className="properties-box"
            data-aos="fade-up"
            data-aos-once="true"
          >
            <figure>
              {/* <img
                src={item?.images[0]?.url ? item?.images[0]?.url : dummyimg}
                alt="property img"
              /> */}
              <img
                src={
                  isImageLoaded && item?.images[0]?.url
                    ? item?.images[0]?.url
                    : dummyimg
                }
                alt="property img"
                onLoad={() => setIsImageLoaded(true)}
              />
            </figure>
            <div className="properties-desc">
              <h3 className="title">
                <Link to={`/properties/${item?.route}`}>{item?.name}</Link>
              </h3>
              {item?.addressLine1 !== null && (
                <p className="location mb-30">
                  <i className="far fa-map-marker-alt" /> {item?.addressLine1}{" "}
                  {item?.addressLine2} {item?.addressLine3} {item?.addressLine4}{" "}
                  {item?.city}
                </p>
              )}
              <Link
                to={`/properties/${item?.route}`}
                className="main-btn btn-border"
              >
                View All Properties
              </Link>
            </div>
          </div>
        </div>
      );
    });

  const pageCount = Math.ceil(items?.length / usersPerPage);

  const changePage = ({ selected }) => {
    setLoading(true);
    setPageNumber(selected);
    setLoading(false);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pageNumber]);

  // pagination code end
  //

  return (
    <section className="properties-section mb-4 pb-60">
      <div className="container">
        {/* Properties Start */}
        <div className="properties-list-loop">
          <div className="row">
            {loading === false && items?.length > 0 ? displayItems : <Loader />}
          </div>
        </div>
        {/* Properties End */}

        {/* Pagination Start */}
        {items?.length > 0 && (
          <div className="pagination-wrap pt-20">
            <ReactPaginate
              previousLabel={<i className="far fa-arrow-left" />}
              nextLabel={<i className="far fa-arrow-right" />}
              pageCount={pageCount}
              onPageChange={changePage}
              containerClassName={"paginationBttns"}
              previousLinkClassName={"previousBttn"}
              nextLinkClassName={"nextBttn"}
              disabledClassName={"paginationDisabled"}
              activeClassName={"paginationActive"}
            />
          </div>
        )}
        {/* Pagination End */}
      </div>
    </section>
  );
};

export default PropertiesList;
