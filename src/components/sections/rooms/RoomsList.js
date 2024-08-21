import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../../layouts/Loader";
import ReactPaginate from "react-paginate";
import { actFetchWishlidtAddRequest } from "../../../actions";
import { useDispatch, useSelector } from "react-redux";
import dummyimg from "../../../assets/dummyimg.webp";

const RoomsList = ({ catId, searchParams }) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state?._todoProperties?.categories);
  const wishitems = useSelector((state) => state?._todoProperties?.WishList);
  const loader = useSelector((state) => state?._todoProperties?.loader);
  const xauthtoken = useSelector((state) => state?._todoProperties?.auth_token);
  const userId = useSelector((state) => state?._todoProperties?.user_id);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const isAuthenticated = useSelector(
    (state) => state?._todoProperties?.isAuthenticated
  );

  const handleSearchPrice = () => {
    toast.info(
      "Enter your check-in and check-out dates in the search box on the top to see the exact room prices for your stay and to be able to sort by price.",
      {
        icon: false,
      }
    );
  };

  // pagination code start
  const [pageNumber, setPageNumber] = useState(0);

  const usersPerPage = 6;
  const pagesVisited = pageNumber * usersPerPage;

  const displayItems = items
    ?.slice(pagesVisited, pagesVisited + usersPerPage)
    ?.map((item, i) => {
      return (
        <div key={i} className="col-lg-4 col-md-6 col-sm-12">
          <div className="property_rooms_box mb-40">
            <p className="wishlisticon">
              {wishitems?.find((x) => x?.id === item?.id) ? (
                <i
                  className="fas fa-heart"
                  onClick={() =>
                    dispatch(
                      actFetchWishlidtAddRequest(
                        item,
                        xauthtoken,
                        userId,
                        isAuthenticated
                      )
                    )
                  }
                  style={{ cursor: "pointer", color: "red" }}
                />
              ) : (
                <i
                  className="far fa-heart"
                  onClick={() =>
                    dispatch(
                      actFetchWishlidtAddRequest(
                        item,
                        xauthtoken,
                        userId,
                        isAuthenticated
                      )
                    )
                  }
                  style={{ cursor: "pointer" }}
                />
              )}
            </p>

            {/* <img
              src={
                item?.images?.[0]?.images ? item?.images?.[0]?.images : dummyimg
              }
              className="property_rooms_img"
              alt={"image"}
              loading
            /> */}

            <img
              src={
                isImageLoaded && item?.images?.[0]?.images
                  ? item?.images?.[0]?.images
                  : dummyimg
              }
              className="property_rooms_img"
              alt="image"
              onLoad={() => setIsImageLoaded(true)}
            />

            <div className="property_rooms_desc">
              <p className="category">{item?.categoryClass}</p>
              <h4>
                <Link
                  to={{
                    pathname: `/properties/${catId}/${item?.id}`,
                    search: `${window.location.search}`,
                  }}
                >
                  {item?.short_description}
                </Link>
              </h4>
              {item?.base_rate && (
                <p className="price">
                  AED {Number.parseFloat(item?.base_rate).toFixed(2)} / night
                </p>
              )}
              <div className="property_rooms_meta">
                {item?.numberOfBedrooms !== 0 && (
                  <span>
                    <i className="far fa-bed" />
                    {item?.numberOfBedrooms} bedroom
                  </span>
                )}
                {item?.numberOfFullBaths !== 0 && (
                  <span>
                    <i className="far fa-bath" />
                    {item?.numberOfFullBaths} bathroom
                  </span>
                )}
                {/* <span>
                  <i className="far fa-home" />
                  {item?.categoryClass}
                </span> */}
              </div>
              <Link
                to={{
                  pathname: `/properties/${catId}/${item?.id}`,
                  search: `${window.location.search}`,
                }}
                className="main-btn btn-filled"
              >
                Book Now
              </Link>
              {/* Book Now */}
              {/* </button> */}
            </div>
          </div>
        </div>
      );
    });

  const pageCount = Math.ceil(items?.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pageNumber]);

  useEffect(() => {
    setPageNumber(0); // Reset page number to 0 when searchTerm or catId changes
  }, [searchParams, catId]);

  // pagination code end

  return (
    <section className="property_rooms_section pt-60">
      <div className="container">
        {/* Post Start */}
        {loader ? (
          <Loader />
        ) : items?.length == 0 && !loader ? (
          <p className="text-center">Finding the right property for you.</p>
        ) : items?.length == 0 ? (
          <p className="text-center">No Category Found !!</p>
        ) : (
          <div className="row">{displayItems}</div>
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

export default RoomsList;
