import React, { useEffect, Fragment } from "react";
import { Helmet } from "react-helmet";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import Banner from "../../layouts/Banner";
import { actFetchGetWishlistRequest } from "../../../actions";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";

//content components
import Layout from "../../sections/MyAccountDashboard/Layout";
import Dashboard from "../../sections/MyAccountDashboard/DashBoard";
import WhatsappFixedIcon from "../../utils/WhatsappFixedIcon";

const pagelocation = "Dashboard";
const MyAccounts = ({ userId, xauthtoken, isAuthenticated }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actFetchGetWishlistRequest(xauthtoken, userId, isAuthenticated));
  }, [xauthtoken, userId]);

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
        <Dashboard xauthtoken={xauthtoken} />
      </Layout>
      <WhatsappFixedIcon />
      <Footer />
    </>
  );
};

// export default MyAccounts;
const mapStateToProps = (state) => {
  return {
    userId: state?._todoProperties?.user_id,
    xauthtoken: state?._todoProperties?.auth_token,
    isAuthenticated: state?._todoProperties?.isAuthenticated,
  };
};
export default connect(mapStateToProps, null)(MyAccounts);
