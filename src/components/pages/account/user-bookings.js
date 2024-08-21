import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import Banner from "../../layouts/Banner";
import { connect } from "react-redux";

//content components
import Layout from "../../sections/MyAccountDashboard/Layout";
import BookingArea from "../../sections/MyAccountDashboard/UserBookings";
import WhatsappFixedIcon from "../../utils/WhatsappFixedIcon";

const pagelocation = "Bookings";

const UserBookings = ({ userId, xauthtoken }) => {
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
      <Layout>
        <BookingArea xauthtoken={xauthtoken} userId={userId} />
      </Layout>
      <WhatsappFixedIcon />
      <Footer />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userId: state?._todoProperties?.user_id,
    xauthtoken: state?._todoProperties?.auth_token,
  };
};
export default connect(mapStateToProps, null)(UserBookings);
