import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../../layouts/Loader";
import ReactPaginate from "react-paginate";

const MediaList = ({ mediaData }) => {
  const [items, setItems] = useState(mediaData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setItems(mediaData);
  }, [mediaData]);

  var options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  // pagination code start

  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 6;
  const pagesVisited = pageNumber * usersPerPage;

  const displayItems = items
    .slice(pagesVisited, pagesVisited + usersPerPage)
    .map((item, i) => {
      return (
        <div
          data-aos="fade-down"
          data-aos-once="true"
          key={i}
          className="col-lg-4"
        >
          <div className="blog-box mb-40">
            <div
              className="blog-img"
              style={{
                backgroundImage: `url(${item?.featured_img})`,
              }}
            />
            <div className="blog-desc">
              <div className="blog-meta">
                <span>
                  <i className="fal fa-calendar-alt" />
                  {new Date(item?.created_at).toLocaleDateString(
                    "en-US",
                    options
                  )}
                </span>
                <span>
                  <i className="fal fa-user" />
                  By {item?.posted_by}
                </span>
              </div>
              <h4>
                <Link to={`/media/${item?.route}`}>{item?.title}</Link>
              </h4>
              <div
                dangerouslySetInnerHTML={{
                  __html: item?.short_description?.slice(0, 100),
                }}
              />
            </div>
          </div>
        </div>
      );
    });

  const pageCount = Math.ceil(items.length / usersPerPage);

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
    <section className="blog-section pt-60 pb-60">
      <div className="container">
        <div className="section-title mb-40">
          <h2>
            Media & <span>News</span>
          </h2>
        </div>
        {/* Post Start */}
        {loading === false ? (
          items?.length > 0 ? (
            <div className="row">{displayItems}</div>
          ) : (
            <p className="text-center">No Media Found!</p>
          )
        ) : (
          <Loader />
        )}
        {/* Post End */}

        {/* Pagination Start */}
        {items?.length > 0 && (
          <div className="pagination-wrap">
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

export default MediaList;
