import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import Banner from "../../layouts/Banner";
import { connect } from "react-redux";

//content components
import BookingDetailArea from "../../sections/MyAccountDashboard/BookingDetail";
import WhatsappFixedIcon from "../../utils/WhatsappFixedIcon";
const pagelocation = "Booking Details";

const BookingDetail = ({ xauthtoken }) => {
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
          img: "/assets/img/banner/accountbanner.jpg",
        }}
      />
      <BookingDetailArea xauthtoken={xauthtoken} />
      <WhatsappFixedIcon />
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    xauthtoken: state?._todoProperties?.auth_token,
  };
};
export default connect(mapStateToProps, null)(BookingDetail);
