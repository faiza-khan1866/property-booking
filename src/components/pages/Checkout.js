import React, { useEffect, Fragment } from "react";
import { Helmet } from "react-helmet";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import Banner from "../layouts/Banner";
import Subscribe from "../layouts/Subscribe";
import { connect } from "react-redux";
import AOS from "aos";
import "aos/dist/aos.css";

//content components
import CheckoutForm from "../sections/checkout/CheckoutForm";
import WhatsappFixedIcon from "../utils/WhatsappFixedIcon";
const pagelocation = "Checkout";

const Checkout = ({ userId, xauthtoken, isAuthenticated }) => {
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
          img: "/assets/img/banner/checkoutbanner.jpg",
        }}
      />
      <CheckoutForm
        xauthtoken={xauthtoken}
        isAuthenticated={isAuthenticated}
        userId={userId}
      />
      <Subscribe />
      <WhatsappFixedIcon />
      <Footer />
    </>
  );
};

// export default Checkout;

const mapStateToProps = (state) => {
  return {
    userId: state?._todoProperties?.user_id,
    xauthtoken: state?._todoProperties?.auth_token,
    isAuthenticated: state?._todoProperties?.isAuthenticated,
  };
};
export default connect(mapStateToProps, null)(Checkout);
