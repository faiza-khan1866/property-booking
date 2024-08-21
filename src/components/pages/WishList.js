import React, { useEffect, Fragment } from "react";
import { Helmet } from "react-helmet";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Banner from "../layouts/Banner";
import { connect } from "react-redux";
import AOS from "aos";
import "aos/dist/aos.css";

//content components
import WishlistArea from "../sections/wishlist/WishlistArea";
import WhatsappFixedIcon from "../utils/WhatsappFixedIcon";

const pagelocation = "Saved";

const WishList = ({ xauthtoken, userId, isAuthenticated, wishlist }) => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <Helmet>
        <title>Carpe Diem | {pagelocation}</title>
        <meta name="description" content="#" />
      </Helmet>
      <Header />
      <Banner
        breadcrumb={{
          pagename: pagelocation,
          img: "/assets/img/banner/savedbanner.jpg",
        }}
      />
      <WishlistArea
        xauthtoken={xauthtoken}
        userId={userId}
        wishlist={wishlist}
        isAuthenticated={isAuthenticated}
      />
      <WhatsappFixedIcon />
      <Footer />
    </>
  );
};

// export default WishList;
const mapStateToProps = (state) => {
  return {
    userId: state?._todoProperties?.user_id,
    xauthtoken: state?._todoProperties?.auth_token,
    isAuthenticated: state?._todoProperties?.isAuthenticated,
    wishlist: state?._todoProperties?.WishList,
  };
};
export default connect(mapStateToProps, null)(WishList);
