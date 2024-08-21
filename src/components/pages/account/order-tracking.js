import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import Banner from "../../layouts/Banner";

//content components
import OrderTrackings from "../../sections/MyAccountDashboard/OrderTracking";
import WhatsappFixedIcon from "../../utils/WhatsappFixedIcon";
const pagelocation = "Order Tracking";

const OrderTracking = () => {
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
      <OrderTrackings />
      <WhatsappFixedIcon />
      <Footer />
    </>
  );
};

export default OrderTracking;
