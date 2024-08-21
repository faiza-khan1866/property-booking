import React from "react";
import { Link } from "react-router-dom";
import {
  actFetchDeleteWishlistRequest,
  actFetchClearWishlistRequest,
} from "../../../actions";

import { useDispatch } from "react-redux";

const WishlistArea = ({ xauthtoken, userId, isAuthenticated, wishlist }) => {
  const dispatch = useDispatch();

  return (
    <>
      {wishlist?.length ? (
        <section className="wishlist_area pt-60 pb-60">
          <div className="container">
            <div className="clear_wishlist">
              {wishlist?.length ? (
                <button
                  className="main-btn btn-border"
                  type="button"
                  onClick={() =>
                    dispatch(
                      actFetchClearWishlistRequest(
                        xauthtoken,
                        userId,
                        isAuthenticated
                      )
                    )
                  }
                >
                  Clear List
                </button>
              ) : null}
            </div>
            <div className="row">
              {wishlist?.map((item, index) => (
                <div className="col-lg-4 col-md-6 col-sm-12 col-12 mb-small">
                  <div className="wishlist-box mb-40" key={index}>
                    <span className="remove_icon">
                      <i
                        className="far fa-times"
                        onClick={() =>
                          dispatch(
                            actFetchDeleteWishlistRequest(
                              item?.saved,
                              xauthtoken,
                              userId,
                              isAuthenticated
                            )
                          )
                        }
                        style={{ cursor: "pointer" }}
                      />
                    </span>
                    <div
                      className="wishlist-img"
                      style={{
                        backgroundImage: `url(${item?.images[0]?.images})`,
                      }}
                    />

                    <div className="wishlist-desc">
                      {/* <div className="wishlist-meta">
                        <span className="location">
                          <i className="far fa-map-marker-alt mr-1" />{" "}
                        location
                        </span>
                        <span className="price">
                          <span>AED</span>{" "}
                          {new Intl.NumberFormat().format(item.price)}{" "}
                          <span>/ Day</span>
                        </span>
                      </div> */}
                      <p className="cattype">{item?.categoryClass}</p>
                      <h4>
                        <Link
                          to={`/properties/${item?.properties?.route}/${item?.id}`}
                        >
                          {item?.short_description}
                        </Link>
                      </h4>
                      <div className="d-flex justify-content-start align-items-center mt-10">
                        {item?.numberOfBedrooms !== 0 && (
                          <p className="studio mr-3">
                            <i className="far fa-bed" />
                            {item?.numberOfBedrooms} Bedroom
                          </p>
                        )}
                        {/* <p className="sqfeet mb-2">
                          572 Sq.ft.
                          <hr />
                        </p> */}
                        {item?.numberOfFullBaths !== 0 && (
                          <p className="studio">
                            <i className="far fa-bath" />
                            {item?.numberOfFullBaths} Bathroom
                          </p>
                        )}
                        {/* <p className="sqfeet">
                          1064 Sq.ft.
                          <hr />
                        </p> */}
                      </div>
                      <Link
                        to={`/properties/${item?.properties?.route}/${item?.id}`}
                        className="main-btn btn-filled mt-10"
                        type="button"
                      >
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section id="empaty_wishlist_area" className="pt-60 pb-60">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 offset-lg-3 col-md-6 offset-md-3 col-sm-12 col-12">
                <div className="empaty_wishlist_area">
                  <i className="far fa-heart" aria-hidden="true"></i>
                  <div className="section-title">
                    <h2>
                      Here are <span>3 simple steps</span> to get you started:
                    </h2>
                    <ol className="liststyle">
                      <li>1. Search for a place to stay</li>
                      <li>
                        2. Tap the heart icon when you find a property you like
                      </li>
                      <li>3. You'll find everything you've saved here</li>
                    </ol>
                  </div>
                  <Link to={`/properties`} className="main-btn btn-filled">
                    Start Searching
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default WishlistArea;
