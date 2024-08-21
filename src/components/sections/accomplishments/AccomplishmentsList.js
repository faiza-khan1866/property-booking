import React, { useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../../layouts/Loader";
import ReactPaginate from "react-paginate";
import { useEffect } from "react";

const AccomplishmentsList = ({ propertyData, id, location }) => {
  const [items, setItems] = useState(propertyData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setItems(propertyData);
  }, [propertyData]);

  // pagination code start

  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 3;
  const pagesVisited = pageNumber * usersPerPage;

  const displayItems = items
    ?.slice(pagesVisited, pagesVisited + usersPerPage)
    ?.map((item, i) => {
      return (
        <div key={i} className="locations-box mb-30">
          <div className="row no-gutters justify-content-center">
            <div className="col-lg-5 col-md-12">
              <div className="locations-img-wrap">
                <div
                  data-aos="fade-right"
                  data-aos-once="true"
                  className="locations-img"
                  style={{
                    backgroundImage: `url(${item?.featured_img})`,
                  }}
                />
              </div>
            </div>

            <div className="col-lg-7 col-md-12">
              <div className="locations-desc">
                <div className="row align-items-center">
                  <div className="col-sm-12">
                    <h3
                      data-aos="fade-left"
                      data-aos-once="true"
                      className="title"
                    >
                      <Link to={`/accomplishments/${id}/${item?.route}`}>
                        {item?.title}
                      </Link>
                    </h3>

                    <p className="studio">
                      <i className="far fa-map-marker-alt mr-1" /> {location}
                    </p>

                    <div
                      className="mt-15 mb-20"
                      dangerouslySetInnerHTML={{
                        __html: item?.short_description?.slice(0, 150) + "...",
                      }}
                    />
                    {/* <div
                      data-aos="fade-left"
                      data-aos-once="true"
                      className="mt-20 mb-20"
                    >
                      <p className="studio">Studio Apartment</p>
                      <p className="sqfeet mb-2">
                        572 Sq.ft.
                        <hr />
                      </p>
                      <p className="studio">One Bedroom Apartment</p>
                      <p className="sqfeet">
                        1064 Sq.ft.
                        <hr />
                      </p>
                    </div> */}
                    <div>
                      <Link
                        data-aos="fade-up"
                        data-aos-once="true"
                        to={`/accomplishments/${id}/${item?.route}`}
                        className="main-btn btn-filled mt-15"
                      >
                        More Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
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
  return (
    <section className="locations-section">
      <div className="container">
        {/* Locations Start */}
        <div className="locations-list-loop">
          {displayItems}
          {/* {loading === false && items?.length > 0 ? displayItems : <Loader />} */}
        </div>
        {/* Locations End */}

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

export default AccomplishmentsList;
